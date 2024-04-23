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

  getListingURL.searchParams.set(
    "_active",
    window.location.pathname.includes("/account/") ? false : true,
  );

  // console.log("Constructed URL:", getListingURL.toString());

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

// GET/auction/profiles/<name>/listings

export async function getProfileListings() {
  const storedUsername = localStorage.getItem("userName");
  const trimmedUsername = storedUsername
    ? storedUsername.trim().replace(/^"(.*)"$/, "$1")
    : null;

  if (!trimmedUsername) {
    console.error("Username not found in local storage.");
  }
  const baseURL = API_AUCTION_URL;
  const action = `/profiles/${trimmedUsername}/listings/`;
  const getProfileListingsURL = new URL(`${baseURL}${action}`);
  // Set query parameters for pagination
  // getListingURL.searchParams.set("limit", limit);
  // getListingURL.searchParams.set("offset", offset);

  // Set query parameters for sorting
  getProfileListingsURL.searchParams.set("sort", "created");
  // getListingURL.searchParams.set("sortOrder", "desc");
  // limit = 100, offset = 0

  getProfileListingsURL.searchParams.set("_seller", true);
  getProfileListingsURL.searchParams.set("_bids", true);
  // getListingURL.searchParams.set("_tag", true);
  // getListingURL.searchParams.set("_active", true);

  // console.log("Constructed URL:", getProfileListingsURL.toString());

  const response = await authFetch(getProfileListingsURL.toString());

  return await response.json();
}

// GET/auction/profiles/<name>/bids

export async function getProfileBids() {
  const storedUsername = localStorage.getItem("userName");
  const trimmedUsername = storedUsername
    ? storedUsername.trim().replace(/^"(.*)"$/, "$1")
    : null;

  if (!trimmedUsername) {
    console.error("Username not found in local storage.");
  }
  const baseURL = API_AUCTION_URL;
  const action = `/profiles/${trimmedUsername}/bids/`;
  const getProfileBidsURL = new URL(`${baseURL}${action}`);

  // Set query parameters for sorting
  getProfileBidsURL.searchParams.set("sort", "created");
  getProfileBidsURL.searchParams.set("_listing", true);

  console.log("Constructed URL:", getProfileBidsURL.toString());

  const response = await authFetch(getProfileBidsURL.toString());
  console.log(response);

  return await response.json();
}
