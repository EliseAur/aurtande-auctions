import { API_AUCTION_URL } from "../constants.js";
// import { login } from "./login.js";

const action = "/auth/register";
const method = "post";

/**
 * Registers a new user by sending a request to the registration endpoint.
 * After successful registration, the user is redirected to the index page.
 *
 * @param {Object} profile - The user profile information.
 * @param {string} profile.username - The username of the user.
 * @param {string} profile.email - The email of the user.
 * @param {string} profile.password - The password of the user.
 * @throws {Error} - Throws an error if the registration fails.
 *
 * @example
 * // Example registration with a user profile.
 * const userProfile = {
 *   username: "exampleUser",
 *   email: "example@noroff.no",
 *   password: "examplePassword"
 * };
 *
 * try {
 *   await register(userProfile);
 *   console.log("User registered successfully!");
 * } catch (error) {
 *   console.error("Registration failed:", error.message);
 * }
 */
export async function register(profile) {
  const registerURL = API_AUCTION_URL + action;

  const body = JSON.stringify(profile);

  const response = await fetch(registerURL, {
    headers: {
      "Content-type": "application/json",
    },
    method,
    body,
  });

  const result = await response.json();
  console.log("register result:", result);

  alert("Your registration was a success! Login to explore listings.");
  // window.location.href = "../../listings-member/index.html";
  window.location.href = "../login/index.html";
}
