import { logout } from "../api/auth/logout.js";

/**
 * Sets up an event listener for the "sign out" button.
 * When the button is clicked, it prevents the default click behavior
 * and calls the logout function to clear the user's data from local storage
 * and log them out.
 *
 * @returns {void}
 *
 * @example
 * // Add a button with the id "signOutButton" to your HTML.
 * // Then call this function to set up the event listener.
 * setLogoutFormListener();
 */
export function setLogoutFormListener() {
  const signOutButton = document.querySelector("#signOutButton");

  if (signOutButton) {
    signOutButton.addEventListener("click", (event) => {
      event.preventDefault();
      logout();
    });
  }
}
