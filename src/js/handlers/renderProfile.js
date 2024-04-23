import * as templates from "../templates/index.js";
import { getProfile } from "../api/auth/profile.js";

/**
 * Renders the profile details in the specified container on the profile page.
 * If the profile exists, the profile template is added to the container.
 * If the profile data is not found, an error message is logged.
 *
 * @returns {void}
 *
 * @example
 * // Call 'renderProfileDetails' to render the profile details:
 * await renderProfileDetails();
 */
// export async function renderProfileDetails() {
//   const profile = await getProfile();

//   if (profile) {
//     const container = document.querySelector("#profileDetailsContainer");
//     templates.renderProfileTemplate(profile, container);
//   } else {
//     console.error("Profile data not found");
//   }
// }

export async function renderProfileDetails() {
  const profile = await getProfile();

  if (profile) {
    // const container = document.querySelector("#profileDetailsContainer");
    templates.renderProfileTemplate(profile);
  } else {
    console.error("Profile data not found");
  }
}
