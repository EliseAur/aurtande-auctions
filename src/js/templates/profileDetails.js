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
  profileTemporaryCredits.className = "mt-3 mb-1";
  profileTemporaryCredits.innerHTML = `<strong>Temporary credit:</strong> ${profile.credits}$`;

  const profileCurrentCredits = document.createElement("p");
  profileCurrentCredits.className = "mt-1";
  const currentCredit = await profileMethods.calcCurrentCredits();
  profileCurrentCredits.innerHTML = `<strong>Current credit:</strong> ${currentCredit}$`;

  profileDetailsContainer.appendChild(profileUserName);
  profileDetailsContainer.appendChild(profileEmail);
  profileDetailsContainer.appendChild(profileTemporaryCredits);
  profileDetailsContainer.appendChild(profileCurrentCredits);
}

function templateForProfile(profile) {
  const avatarContainer = document.getElementById("avatarContainer");
  createProfileAvatar(profile, avatarContainer);

  const profileDetailsContainer = document.getElementById(
    "profileDetailsContainer",
  );
  createProfileDetails(profile, profileDetailsContainer);
}

export function renderProfileTemplate(profile) {
  templateForProfile(profile);
}
