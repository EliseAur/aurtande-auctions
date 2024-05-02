import { API_AUCTION_URL } from "../constants.js";
import * as storage from "../../storage/index.js";

/**
 * Logs in the user with the provided profile information.
 * @param {object} profile - The profile object containing the user's credentials (e.g., email and password).
 * @returns {Promise<void>} A promise that resolves once the login process is complete.
 * @throws {Error} If there is an error during the login process.
 */

/**
 * Logs in the user with the provided profile data, authenticating against the server.
 * Saves authentication token and user profile data to local storage upon successful login.
 * Redirects to the member listings page upon successful login.
 *
 * @param {Object} profile - The user profile data including email and password for login.
 * @returns {Promise<void>} A promise that resolves once the login process is complete.
 * @throws {Error} If there is an error during the login process.
 *
 * @example
 * // Define the profile data:
 * const profile = {
 *   email: "example@stud.noroff.no",
 *   password: "password123"
 * };
 *
 * // Call 'login' to authenticate the user with the provided profile:
 * login(profile);
 */
export async function login(profile) {
  const action = "/auth/login";
  const method = "post";

  const loginURL = API_AUCTION_URL + action;
  const body = JSON.stringify(profile);

  const response = await fetch(loginURL, {
    headers: {
      "Content-type": "application/json",
    },
    method,
    body,
  });

  if (response.ok) {
    const { accessToken, ...user } = await response.json();
    storage.save("token", accessToken);
    storage.save("profile", user);
    storage.save("userName", user.name);

    alert("You are now logged in");
    window.location.href = "../../listings-member/index.html";
  } else {
    if (response.status === 401) {
      alert(
        "Invalid credentials or you are not registered. Please check your email and password or register before logging in.",
      );
    } else {
      // Handle other error cases
      console.error("Error logging in:", response.statusText);
      alert("An error occurred while logging in. Please try again later.");
    }
  }
}
