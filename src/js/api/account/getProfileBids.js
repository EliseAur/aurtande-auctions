import { API_AUCTION_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

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
  const action = `/profiles/${trimmedUsername}/bids`;
  const getProfileBidsURL = new URL(`${baseURL}${action}`);

  // Set query parameters for sorting
  getProfileBidsURL.searchParams.set("sort", "created");
  getProfileBidsURL.searchParams.set("_listing", true);

  console.log("Constructed URL:", getProfileBidsURL.toString());

  const response = await authFetch(getProfileBidsURL.toString());
  console.log("getProfileBids from read.js", response);

  return await response.json();
}
