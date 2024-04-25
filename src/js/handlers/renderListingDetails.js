import * as templates from "../templates/index.js";
import * as postMethods from "../api/listings/index.js";
import * as handlers from "./index.js";

/**
 * Retrieves the listing ID from the URL query parameters.
 *
 * @returns {string|null} The listing ID or null if not found.
 *
 * @example
 * // Call 'getPostIdFromUrl' to get the post ID from the URL:
 * const postId = getPostIdFromUrl();
 * console.log(postId); // The post ID or null
 */
function getListingIdFromUrl() {
  const urlParams = new URLSearchParams(location.search);
  return urlParams.get("id");
}

/**
 * Renders the details of a specific post and sets up functionality
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
  console.log("Listing id:", listingId); // does not log correct

  if (listingId) {
    const listing = await postMethods.getListing(listingId);
    console.log("Listing object:", listing); // Logs correct
    const container = document.querySelector("#listingDetailsContainer");
    templates.renderListingDetailsTemplate(listing, container, listingId);
    handlers.setCreateBidFormListener();
    //   handlers.beAbleToRemovePost(listing);
  }
  // else {
  //   templates.afterDeleteTemplateError();
  // }

  // if (window.location.pathname.includes("listing-member")) {
  //   handlers.setCreateBidFormListener();
  // }
}
