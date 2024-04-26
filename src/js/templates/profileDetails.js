// import * as templates from "./index.js";
// import * as postMethods from "../api/listings/index.js";
import * as profileMethods from "../api/account/index.js";

function createProfileAvatar(profile, avatarContainer) {
  const profileAvatar = document.createElement("img");
  profileAvatar.className = "profile-avatar img-fluid";
  profileAvatar.alt = "Profile image";
  if (profile.avatar) {
    profileAvatar.src = profile.avatar;
  } else {
    profileAvatar.src = "../../images/placeholder-profile-img.jpg";
  }

  avatarContainer.appendChild(profileAvatar);
}

async function createProfileDetails(profile, profileDetailsContainer) {
  const profileUserName = document.createElement("p");
  profileUserName.className = "mb-1 fs-4 h3";
  profileUserName.textContent = `${profile.name}`;

  const profileEmail = document.createElement("p");
  profileEmail.className = "mb-1";
  profileEmail.textContent = `${profile.email}`;

  const profileTemporaryCredits = document.createElement("p");
  profileTemporaryCredits.className = "mt-3";
  profileTemporaryCredits.innerHTML = `<strong>Temporary credit:</strong> ${profile.credits}$`;

  const profileCurrentCredits = document.createElement("p");
  profileCurrentCredits.className = "mt-3";
  const currentCredit = await profileMethods.calcReservedCredits();
  console.log(currentCredit);
  profileCurrentCredits.innerHTML = `<strong>Current credit:</strong> ${currentCredit}$`;

  profileDetailsContainer.appendChild(profileUserName);
  profileDetailsContainer.appendChild(profileEmail);
  profileDetailsContainer.appendChild(profileTemporaryCredits);
  profileDetailsContainer.appendChild(profileCurrentCredits);
}

// function createMyListings(profile, myListingsContainer) {
//   const myListings = profile.listings;
//   console.log("my listings", myListings);

//   templates.renderListingTemplates(myListings, myListingsContainer);
//   console.log("hello");

// }

/**
 * Creates and renders a profile template for the profile page.
 * Sets the page title, banner, avatar, user information, followers/following counts,
 * and provides options to see followers and edit the profile.
 *
 * @param {Object} profile - The profile data to render.
 *
 * @example
 * // Example usage:
 * templateForProfile({
 *   name: "John Doe",
 *   email: "john@example.com",
 *   avatar: "path/to/avatar.jpg",
 *   banner: "path/to/banner.jpg",
 *   _count: {
 *     posts: 10,
 *     followers: 100,
 *     following: 50,
 *   },
 * });
 */
function templateForProfile(profile) {
  const avatarContainer = document.getElementById("avatarContainer");
  createProfileAvatar(profile, avatarContainer);

  const profileDetailsContainer = document.getElementById(
    "profileDetailsContainer",
  );
  createProfileDetails(profile, profileDetailsContainer);

  // const myListingsContainer = document.getElementById("myListingsContainer");
  // const myListings = profile.listings;
  // console.log("my listings", myListings);

  // templates.renderListingTemplates(myListings, myListingsContainer);
  // console.log("hello");
  // myListingsContainer.innerHTML = "";

  // createMyListings(profile, myListingsContainer);
}

/**
 * Renders the profile template for the given profile and appends it to the specified parent container.
 * If the parent container is not a valid HTML element, an error is logged, and rendering is aborted.
 *
 * @param {Object} profile - The profile data to be rendered.
 * @param {Element} parent - The parent container where the profile template will be appended.
 *
 * @returns {void}
 *
 * @example
 * // Example usage:
 * const userProfile = {
 *   name: "John Doe",
 *   email: "john@example.com",
 *   avatar: "path/to/avatar.jpg",
 *   banner: "path/to/banner.jpg",
 *   _count: {
 *     posts: 10,
 *     followers: 100,
 *     following: 50,
 *   },
 * };
 * const parentContainer = document.getElementById("profileDetailsContainer");
 * renderProfileTemplate(userProfile, parentContainer);
 */
// export function renderProfileTemplate(profile, parent) {
//   if (!parent || !(parent instanceof Element)) {
//     console.error(
//       "Invalid parent element provided for rendering profile template.",
//     );
//     return;
//   }

//   templateForProfile(profile);
// }

export function renderProfileTemplate(profile) {
  // if (!parent || !(parent instanceof Element)) {
  //   console.error(
  //     "Invalid parent element provided for rendering profile template.",
  //   );
  //   return;
  // }

  templateForProfile(profile);
}
