import * as handlers from "./index.js";
import * as listingMethods from "../api/listings/index.js";

/**
 * Filters and returns non-finished listings from the provided list of listings based on the current date.
 * @param {Array<Object>} listings - The list of listings to filter.
 * @returns {Array<Object>} - The filtered list of non-finished listings.
 */
function getNonFinishedListings(listings) {
  const currentDate = new Date();
  return listings.filter((listing) => new Date(listing.endsAt) > currentDate);
}

/**
 * Sorts the provided list of listings by the latest creation date.
 * @param {Array<Object>} listings - The list of listings to sort.
 * @returns {Array<Object>} - The sorted list of listings.
 */
export function sortListingsByLatest(listings) {
  const filteredListings = getNonFinishedListings(listings);
  return filteredListings.slice().sort((a, b) => {
    // Compare the dates in descending order
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
}

/**
 * Sorts the provided list of listings by popularity, based on the number of bids.
 * @param {Array<Object>} listings - The list of listings to sort.
 * @returns {Array<Object>} - The sorted list of listings.
 */
export function sortListingsByPopularity(listings) {
  const filteredListings = getNonFinishedListings(listings);
  return filteredListings.slice().sort((a, b) => {
    // Compare the number of bids in descending order
    return b._count.bids - a._count.bids;
  });
}

/**
 * Sorts the provided list of listings by the ending date, from the soonest to the latest.
 * @param {Array<Object>} listings - The list of listings to sort.
 * @returns {Array<Object>} - The sorted list of listings.
 */
export function sortListingsByEndingSoon(listings) {
  const filteredListings = getNonFinishedListings(listings);
  return filteredListings.slice().sort((a, b) => {
    // Compare the ending dates in ascending order
    return new Date(a.endsAt) - new Date(b.endsAt);
  });
}

/**
 * Filters and returns finished listings from the provided list of listings.
 * @param {Array<Object>} listings - The list of listings to filter.
 * @returns {Array<Object>} - The filtered list of finished listings.
 */
export function sortListingsByFinished(listings) {
  const finishedListings = listingMethods.filterOnlyFinishedListings(listings);
  return finishedListings;
}

/**
 * Handles the change event of the sorting dropdown menu.
 * @param {Event} event - The change event object.
 * @param {Array<Object>} listings - The list of listings to sort.
 * @param {Element} container - The container element to update with sorted listings.
 */
export function handleSortChange(event, listings, container) {
  const selectedOption = event.target.value;
  let sortedListings;

  switch (selectedOption) {
    case "popular":
      sortedListings = sortListingsByPopularity(listings);
      break;
    case "ending":
      sortedListings = sortListingsByEndingSoon(listings);
      break;
    case "finished":
      sortedListings = sortListingsByFinished(listings);
      break;
    case "latest":
      sortedListings = sortListingsByLatest(listings);
      break;
    case "default":
    default:
      sortedListings = listings;
  }

  handlers.updateFeedWithSearchSortResults(sortedListings, container);
}

/**
 * Sets up the functionality for the sorting dropdown menu for listings.
 * @param {Array<Object>} listings - The list of listings to sort.
 */
export function setupSortDropdown(listings) {
  const container = document.querySelector("#listingList");
  const sortDropdown = document.querySelector("#sort-listings");

  if (sortDropdown) {
    sortDropdown.value = "default";
    sortDropdown.addEventListener("change", (event) =>
      handleSortChange(event, listings, container),
    );
  }
}
