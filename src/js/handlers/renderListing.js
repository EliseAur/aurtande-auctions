import * as listingMethods from "../api/listings/index.js";
import * as handlers from "./index.js";
import * as templates from "../templates/index.js";

/**
 * Renders listings in the feed when the user is not logged in or logged in, filtering and sorting as needed,
 * and sets up search and sort functionality.
 *
 * @returns {Promise<Array<Object>>} - A promise that resolves with an array of good listings.
 *
 * @example
 * // Call 'renderListings' to render listings in the feed for index.js or listings-member/index.js:
 * await renderListings();
 */

export async function renderListings() {
  const container = document.querySelector("#listingList");
  container.innerHTML = "";

  const loadingDiv = document.createElement("div");
  loadingDiv.textContent = "Loading listings...";
  container.appendChild(loadingDiv);

  try {
    const listings = await listingMethods.getListings();
    const goodListings = listingMethods.filterBadListingsA(listings);

    if (goodListings.length === 0) {
      const noItemsDiv = document.createElement("div");
      noItemsDiv.className = "noItems container w-100 pt-3 ps-2";
      noItemsDiv.innerHTML = `<p>There are no listings to display.</p>`;
      container.appendChild(noItemsDiv);
    } else {
      templates.renderListingTemplates(goodListings, container);
      handlers.setupSearchFunctionality(goodListings);
      handlers.setupSortDropdown(goodListings);
    }

    // Remove the loading div from the container
    container.removeChild(loadingDiv);

    return goodListings;
  } catch (error) {
    console.error("Error loading listings:", error);
    container.innerHTML = `<div class="container w-100 pt-3 ps-2"><p>Error loading listings. Please try again later</p></div>`;
  }
}
