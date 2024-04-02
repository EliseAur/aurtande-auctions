import { login } from "../api/auth/login.js";

/**
 * Sets up an event listener for the login form.
 * When the form is submitted, it prevents the default form submission,
 * collects the user's profile information from the form,
 * and then calls the login function with the profile data.
 *
 * @returns {void}
 *
 * @example
 * // Add the login form to your HTML with the id "loginForm".
 * // Then call this function to set up the event listener.
 * setLoginFormListener();
 */
export function setLoginFormListener() {
  const form = document.querySelector("#loginForm");
  console.log(form);

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);

      const profile = Object.fromEntries(formData.entries());

      login(profile);
    });
  }
}
