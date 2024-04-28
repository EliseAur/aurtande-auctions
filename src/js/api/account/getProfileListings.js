import { API_AUCTION_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

/**
 * Retrieves the listings created by the current user from the server.
 * @returns {Promise<object[]>} An array of listing objects created by the user.
 */
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

  // Set query parameters for sorting
  getProfileListingsURL.searchParams.set("sort", "created");
  getProfileListingsURL.searchParams.set("_seller", true);
  getProfileListingsURL.searchParams.set("_bids", true);

  const response = await authFetch(getProfileListingsURL.toString());

  return await response.json();
}
