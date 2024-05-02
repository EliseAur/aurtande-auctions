import * as profileMethods from "../api/account/index.js";

/**
 * Sets up the form listener for updating a user profile (only the avatar). Retrieves the profile details,
 * populates the form fields, and handles the form submission to update the profile (avatar).
 *
 * @returns {void}
 *
 * @example
 * setUpdateProfileFormListener();
 */
export async function setUpdateProfileFormListener() {
  const form = document.querySelector("#editProfile");
  const button = document.querySelector("#editProfile button");

  if (form && button) {
    //disable the form with the button before it is uploaded
    button.disabled = true;

    try {
      //loading the user's profile data
      const profileEdit = await profileMethods.getProfile();
      form.avatar.value = profileEdit.avatar;

      button.disabled = false;

      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        button.disabled = true;
        const formData = new FormData(form);
        const profile = Object.fromEntries(formData.entries());

        try {
          // Update the user's profile
          await profileMethods.updateProfile(profile);
          alert("Your profile was successfully updated.");
          location.href = `../index.html`;
        } catch (error) {
          console.error("Error updating profile:", error);
          alert(`Error updating profile: ${error.message} Please try again.`);
        } finally {
          button.disabled = false;
        }
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      alert(
        `Error fetching profile details: ${error.message}. Please try again.`,
      );
    }
  }
}
