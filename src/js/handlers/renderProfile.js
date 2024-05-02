import * as templates from "../templates/index.js";
import { getProfile } from "../api/account/profile.js";

/**
 * Renders the profile details for the current user.
 *
 * @returns {Promise<void>} - A promise that resolves when the profile details have been rendered.
 */
export async function renderProfileDetails() {
  try {
    const profile = await getProfile();

    if (profile) {
      templates.renderProfileTemplate(profile);
    } else {
      console.error("Profile data not found");
    }
  } catch (error) {
    console.error("Error rendering profile details:", error);
  }
}
