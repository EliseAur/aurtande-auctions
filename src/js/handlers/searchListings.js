import * as templates from "../templates/index.js";
import * as handlers from "./index.js";
/**
 * Filters the listings based on the provided search query. It checks for matches
 * in listing titles, description, sellers, and tags. Returns an array of listings that match
 * the search criteria.
 *
 * @param {string} query - The search query.
 * @param {Array} listings - The array of listings to search through.
 * @returns {Array} - An array of listings that match the search criteria.
 *
 * @example
 * const searchResults = search("example", listings);
 * console.log(searchResults);
 */
export function search(query, listings) {
  return listings.filter((listing) => {
    return (
      titleMatches(query, listing) ||
      descriptionMatches(query, listing) ||
      authorMatches(query, listing) ||
      tagMatches(query, listing)
    );
  });

  function titleMatches(query, listing) {
    return listing.title.toLowerCase().includes(query.toLowerCase());
  }

  function descriptionMatches(query, listing) {
    return (
      listing.description &&
      listing.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  function authorMatches(query, listing) {
    return listing.seller.name.toLowerCase().includes(query.toLowerCase());
  }

  function tagMatches(query, listing) {
    return listing.tags
      .map((tag) => tag.toLowerCase())
      .includes(query.toLowerCase());
  }
}

/**
 * Sets up search functionality by adding event listeners to the search input and form.
 * Updates the display of search results based on user input.
 *
 * @param {Array<Object>} goodListings - An array of listings to search through.
 */
export function setupSearchFunctionality(goodListings) {
  const searchInput = document.querySelector("#search-input");
  const searchForm = document.querySelector("#search-form");
  const container = document.querySelector("#listingList");

  let currentSearchResults = goodListings;

  searchInput.addEventListener("keyup", handleSearchInput);
  searchForm.addEventListener("submit", handleSearchSubmit);

  /**
   * Handles the input event on the search input field.
   * Updates the display of search results based on the input value.
   *
   * @param {Event} event - The input event.
   */
  function handleSearchInput(event) {
    const inputValue = event.currentTarget.value.trim().toLowerCase();
    currentSearchResults = handlers.search(inputValue, goodListings); // Update current search results
    applySortingAndDisplayResults(container);
  }

  /**
   * Handles the form submit event for the search form.
   * Prevents the default form submission behavior and updates the search results based on the input value.
   *
   * @param {Event} event - The form submit event.
   */
  function handleSearchSubmit(event) {
    event.preventDefault();
    const inputValue = searchInput.value.trim().toLowerCase();
    currentSearchResults = handlers.search(inputValue, goodListings); // Update current search results
    applySortingAndDisplayResults(container);
  }

  /**
   * Applies sorting options and displays the sorted results in the specified container.
   *
   * @param {Element} container - The container element where the sorted results will be displayed.
   * @param {Array<Object>} currentSearchResults - The current search results to be sorted and displayed.
   */
  function applySortingAndDisplayResults(container) {
    // Setup sorting dropdown for search results
    handlers.setupSortDropdown(currentSearchResults);
    // Update feed with sorted search results
    handlers.updateFeedWithSearchSortResults(currentSearchResults, container);
  }
}

/**
 * Updates the listings container with the search results by rendering the listing templates.
 *
 * @param {Array} results - An array of listings that match the search criteria.
 * @param {HTMLElement} container - The container element to update with the search results.
 * @returns {void}
 *
 * @example
 * updateFeedWithSearchResults(searchResults, document.querySelector("#listingList"));
 */
export function updateFeedWithSearchSortResults(results, container) {
  container.innerHTML = "";

  if (results.length === 0) {
    container.innerHTML = `<div class="fs-4 ms-2">No result found...</div>`;
    return;
  }

  templates.renderListingTemplates(results, container);
}
