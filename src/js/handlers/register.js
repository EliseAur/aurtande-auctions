import { register } from "../api/auth/register.js";

/**
 * Sets up an event listener for the register form.
 * When the form is submitted, it prevents the default submit behavior,
 * collects the form data as an object, and sends it to the API using the register function.
 *
 * @returns {void}
 *
 * @example
 * // Add a form with the id "registerForm" to your HTML.
 * // Then call this function to set up the event listener.
 * setRegisterFormListener();
 */
export function setRegisterFormListener() {
  const form = document.querySelector("#registerForm");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;

      // Provide the form data to this constructor
      const formData = new FormData(form);

      //Collecting profile data as an object (formData.entries() would give you an array)
      const profile = Object.fromEntries(formData.entries());

      //Send it to the API
      register(profile);
    });
  }
}
