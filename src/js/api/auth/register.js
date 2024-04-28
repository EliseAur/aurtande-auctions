import { API_AUCTION_URL } from "../constants.js";

/**
 * Registers a new user profile.
 * @param {Object} profile - The profile data to register.
 * @param {string} profile.name - The username.
 * @param {string} profile.email - The email address.
 * @param {string} profile.password - The password.
 * @returns {Promise<void>} A Promise that resolves once the registration is successful.
 */
export async function register(profile) {
  const action = "/auth/register";
  const method = "post";
  const registerURL = API_AUCTION_URL + action;

  const body = JSON.stringify(profile);

  const response = await fetch(registerURL, {
    headers: {
      "Content-type": "application/json",
    },
    method,
    body,
  });

  // Intentionally unused variable
  // eslint-disable-next-line no-unused-vars
  const _ = await response.json();

  alert("Your registration was a success! Login to explore listings.");
  window.location.href = "../login/index.html";
}
