import { API_AUCTION_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

/**
 * Retrieves the profile information of the current user from the server.
 * @returns {Promise<object>} A promise that resolves to an object containing the profile information.
 * @throws {Error} If there is an error fetching the profile information.
 */
export async function getProfile() {
  // Retrieve the username from local storage
  const storedUsername = localStorage.getItem("userName");
  const trimmedUsername = storedUsername
    ? storedUsername.trim().replace(/^"(.*)"$/, "$1")
    : null;

  if (!trimmedUsername) {
    console.error("Username not found in local storage.");
  }

  const action = `/profiles/${trimmedUsername}`;
  const baseURL = API_AUCTION_URL;
  const getProfileURL = new URL(`${baseURL}${action}`);
  getProfileURL.searchParams.set("_listings", true);

  try {
    const response = await authFetch(getProfileURL.toString());
    const profile = await response.json();
    return profile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}
