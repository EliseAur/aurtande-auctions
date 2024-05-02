import * as templates from "../templates/index.js";
import * as postMethods from "../api/listings/index.js";
import * as handlers from "./index.js";

/**
 * Retrieves the listing ID from the URL query parameters.
 *
 * @returns {string|null} The listing ID or null if not found.
 *
 * @example
 * // Call 'getListingIdFromUrl' to get the listing ID from the URL:
 * const listingId = getListingIdFromUrl();
 * console.log("listingId:", listingId); // The listing ID or null
 */
function getListingIdFromUrl() {
  const urlParams = new URLSearchParams(location.search);
  return urlParams.get("id");
}

/**
 * Renders the details of a specific listing and sets up functionality
 * for placing a bid on the listing and for removing the listing.
 *
 * @returns {Promise<void>} - A promise that resolves when the listing details have been rendered
 *
 * @example
 * // Call 'renderListingDetails' to render details of a specific listing:
 * await renderListingDetails();
 */
export async function renderListingDetails() {
  const listingId = getListingIdFromUrl();

  if (listingId) {
    const listing = await postMethods.getListing(listingId);
    const container = document.querySelector("#listingDetailsContainer");
    templates.renderListingDetailsTemplate(listing, container, listingId);
    handlers.setCreateBidFormListener();
    handlers.beAbleToDeleteListing(listing);
  }
}
