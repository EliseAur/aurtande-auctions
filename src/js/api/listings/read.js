import { API_AUCTION_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

// const method = "get";

/**
 * Retrieves a list of posts with additional information about the author, comments, and reactions.
 *
 * @returns {Promise<Object[]>} - A promise that resolves to an array of post objects.
 */
export async function getListings() {
  const baseURL = API_AUCTION_URL;
  const action = "/listings";
  const getListingURL = new URL(`${baseURL}${action}`);
  // Set query parameters for pagination
  // getListingURL.searchParams.set("limit", limit);
  // getListingURL.searchParams.set("offset", offset);

  // Set query parameters for sorting
  getListingURL.searchParams.set("sort", "created");
  // getListingURL.searchParams.set("sortOrder", "desc");
  // limit = 100, offset = 0

  getListingURL.searchParams.set("_seller", true);
  getListingURL.searchParams.set("_bids", true);
  // getListingURL.searchParams.set("_tag", true);
  // getListingURL.searchParams.set("_active", true);

  console.log("Constructed URL:", getListingURL.toString());

  const response = await authFetch(getListingURL.toString());

  return await response.json();
}

/**
 * Retrieves a specific listing by its ID with additional information about....
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
