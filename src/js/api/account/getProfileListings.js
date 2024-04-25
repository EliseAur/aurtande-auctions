import { API_AUCTION_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

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
