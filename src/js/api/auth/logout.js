import * as storage from "../../storage/index.js";

/**
 * Logs out the user by clearing their data from local storage.
 * Displays an alert notifying the user that they are logged out and redirects them to the index page.
 *
 * @example
 * // Call the logout function when the user clicks a "Logout" button.
 * try {
 *   logout();
 *   console.log("User logged out successfully!");
 * } catch (error) {
 *   console.error("Logout failed:", error.message);
 * }
 */

/**
 * Logs out the user by removing authentication-related data from storage.
 * Displays an alert notifying the user that they are logged out and redirects them to the index page.
 * @returns {void}
 */
export function logout() {
  storage.remove("token");
  storage.remove("profile");
  storage.remove("userName");
  storage.remove("currentCredits");

  alert("You are now logged out");

  // Check if the site is running locally or on GitHub Pages
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    // Redirect to the local index page
    window.location.href = "/index.html";
  } else {
    // Redirect to GitHub Pages index page
    window.location.href =
      "https://eliseaur.github.io/aurtande-auctions/index.html";
  }
}
