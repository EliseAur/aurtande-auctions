import { API_AUCTION_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

/**
 * Updates the user's profile with the provided profile data.
 * The profile data object should contain the necessary fields to update the user's profile.
 * This function sends a PUT request to the API endpoint to update the profile.
 *
 * @param {Object} profileData The profile data object containing the fields to update.
 * @returns {Promise<Object>} A Promise that resolves with the updated profile data returned by the API.
 * @throws {Error} If profileData is not provided.
 */
export async function updateProfile(profileData) {
  if (!profileData) {
    throw new Error("Profile data not found");
  }

  const storedUsername = localStorage.getItem("userName");
  const trimmedUsername = storedUsername
    ? storedUsername.trim().replace(/^"(.*)"$/, "$1")
    : null;

  if (!trimmedUsername) {
    console.error("Username not found in local storage.");
  }

  const action = `/profiles/${trimmedUsername}/media`;
  const method = "PUT";

  const updateProfileURL = `${API_AUCTION_URL}${action}`;

  const response = await authFetch(updateProfileURL, {
    method,
    body: JSON.stringify(profileData),
  });

  const jsonResponse = await response.json();
  return jsonResponse;
}
