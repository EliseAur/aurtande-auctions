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
 * for removing the post if the current user is the author.
 *
 * @returns {void}
 *
 * @example
 * // Call 'renderPostDetails' to render details of a specific post:
 * await renderPostDetails();
 */
export async function renderListingDetails() {
  const listingId = getListingIdFromUrl();
  const userName = JSON.parse(localStorage.getItem("userName"));

  if (listingId) {
    const listing = await postMethods.getListing(listingId);
    const container = document.querySelector("#listingDetailsContainer");
    templates.renderListingDetailsTemplate(listing, container, listingId);
    handlers.setCreateBidFormListener();
    if (userName === listing.seller.name) {
      handlers.beAbleToDeleteListing(listing);
    }
  }
}
