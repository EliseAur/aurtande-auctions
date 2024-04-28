import { API_AUCTION_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

/**
 * Retrieves the bids made by the current user from the server.
 * @returns {Promise<object[]>} An array of bid objects made by the user.
 */
export async function getProfileBids() {
  const storedUsername = localStorage.getItem("userName");
  const trimmedUsername = storedUsername
    ? storedUsername.trim().replace(/^"(.*)"$/, "$1")
    : null;

  if (!trimmedUsername) {
    console.error("Username not found in local storage.");
  }
  const baseURL = API_AUCTION_URL;
  const action = `/profiles/${trimmedUsername}/bids`;
  const getProfileBidsURL = new URL(`${baseURL}${action}`);

  // Set query parameters for sorting
  getProfileBidsURL.searchParams.set("sort", "created");
  getProfileBidsURL.searchParams.set("_listing", true);

  const response = await authFetch(getProfileBidsURL.toString());

  return await response.json();
}
