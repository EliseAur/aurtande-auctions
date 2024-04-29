import * as listingMethods from "../api/listings/index.js";
import * as handlers from "./index.js";

/**
 * Renders listings in the feed when the user is not logged in or logged in, filtering and sorting as needed,
 * and sets up search and sort functionality.
 * @returns {void}
 * @example
 * // Call 'renderListings' to render listings in the feed for index.js or listings-member/index.js:
 * await renderListings();
 */
export async function renderListings() {
  const container = document.querySelector("#listingList");
  const loadingMessage = "Loading listings...";

  // Display loading message
  handlers.renderItems([], "#listingList", "", loadingMessage);

  try {
    const listings = await listingMethods.getListings();
    const goodListings = listingMethods.filterBadListings(listings);

    // Remove the loading message and render the listings
    handlers.renderItems(
      goodListings,
      "#listingList",
      "There are no listings to display.",
    );
    handlers.setupSearchFunctionality(goodListings);
    handlers.setupSortDropdown(goodListings);
  } catch (error) {
    console.error("Error loading listings:", error);
    // Handle error: Remove loading message and display error message
    container.innerHTML = `<div class="container w-100 pt-3 ps-2"><p>Error loading listings. Please try again later</p></div>`;
  }
}
