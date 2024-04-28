import { API_AUCTION_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

/**
 * Retrieves a list of listings with additional information about the seller and bids.
 *
 * @returns {Promise<Object[]>} - A promise that resolves to an array of post objects.
 */
export async function getListings() {
  const baseURL = API_AUCTION_URL;
  const action = "/listings";
  const getListingURL = new URL(`${baseURL}${action}`);

  // Set query parameters for sorting
  getListingURL.searchParams.set("sort", "created");
  getListingURL.searchParams.set("_seller", true);
  getListingURL.searchParams.set("_bids", true);

  getListingURL.searchParams.set(
    "_active",
    window.location.pathname.includes("/account/") ? false : true,
  );

  const response = await authFetch(getListingURL.toString());

  return await response.json();
}

/**
 * Retrieves a specific listing by its ID with additional information about the seller, bids and count.
 *
 * @param {string} id - The ID of the listing to retrieve.
 * @throws {Error} - Throws an error if the listing ID is not provided.
 * @returns {Promise<Object>} - A promise that resolves to the requested listing object.
 */
export async function getListing(id) {
  if (!id) {
    throw new Error("Get requires a listingID");
  }

  const baseURL = API_AUCTION_URL;
  const action = "/listings";
  const getListingURL = new URL(`${baseURL}${action}/${id}`);
  getListingURL.searchParams.set("_seller", true);
  getListingURL.searchParams.set("_bids", true);
  getListingURL.searchParams.set("_count", true);

  const response = await authFetch(getListingURL.toString());

  return await response.json();
}
