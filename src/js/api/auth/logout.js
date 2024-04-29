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
  window.location.href =
    "https://eliseaur.github.io/aurtande-auctions/index.html";

  // const currentPath = window.location.pathname;

  // // Split the pathname into an array of directories
  // const pathParts = currentPath.split("/");

  // // Determine the index page's relative path
  // let indexPagePath = "";
  // if (pathParts.includes("pages")) {
  //   // If the current page is located inside the 'pages' directory
  //   const pagesIndex = pathParts.indexOf("pages");
  //   indexPagePath = "../".repeat(pathParts.length - pagesIndex) + "index.html";
  // } else {
  //   // If the current page is located directly in the root directory
  //   indexPagePath = "index.html";
  // }

  // // Redirect the user to the index page
  // window.location.href = indexPagePath;
}
