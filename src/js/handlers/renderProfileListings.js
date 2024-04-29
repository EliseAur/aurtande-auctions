import * as listingMethods from "../api/listings/index.js";
import * as profileMethods from "../api/account/index.js";
import * as handlers from "./index.js";

export async function renderProfileListings() {
  const container = document.querySelector("#myListingsContainer");
  const loadingMessage = "Loading your listings...";

  // Display loading message
  handlers.renderItems([], "#myListingsContainer", "", loadingMessage);

  try {
    const profileListings = await profileMethods.getProfileListings();
    const goodListings = listingMethods.filterBadListings(profileListings);

    // Remove the loading message and render the listings
    handlers.renderItems(
      goodListings,
      "#myListingsContainer",
      "You have no listings yet.",
    );
  } catch (error) {
    console.error("Error loading your listings:", error);
    // Handle error
    // Remove loading message and display error message
    container.innerHTML = `<div class="container w-100 pt-3 ps-2"><p>Error loading your listings. Please try again later.</p></div>`;
  }
}

export async function renderProfileBidsLead() {
  const container = document.querySelector("#myBidsContainer");
  const loadingMessage = "Loading profile bids...";

  // Display loading message
  handlers.renderItems([], "#myBidsContainer", "", loadingMessage);
  try {
    const listings = await listingMethods.getListings();
    const userName = JSON.parse(localStorage.getItem("userName"));

    const profileBidsLead = await profileMethods.filterProfileBidsLead(
      listings,
      userName,
    );

    // Remove the loading message and render profile bids
    handlers.renderItems(
      profileBidsLead,
      "#myBidsContainer",
      "You have no bids in the lead. Take action and start bidding",
    );
  } catch (error) {
    console.error("Error loading profile bids:", error);
    // Handle error
    // Remove loading message and display error message
    container.innerHTML = `<div class="container w-100 pt-3 ps-2"><p>Error loading profile bids. Please try again later.</p></div>`;
  }
}

export async function renderProfileBidsNoLead() {
  const container = document.querySelector("#myBidsContainer");
  const loadingMessage = "Loading profile bids...";

  // Display loading message
  handlers.renderItems([], "#myBidsContainerNoLead", "", loadingMessage);
  try {
    const listings = await listingMethods.getListings();
    const userName = JSON.parse(localStorage.getItem("userName"));

    const profileBidsNoLead = await profileMethods.filterProfileBidsNoLead(
      listings,
      userName,
    );

    // Remove the loading message and render profile bids
    handlers.renderItems(
      profileBidsNoLead,
      "#myBidsContainerNoLead",
      "There are no bids here. Either you're leading all the bids you've placed, or you need to start bidding.",
    );
  } catch (error) {
    console.error("Error loading profile bids:", error);
    // Handle error
    // Remove loading message and display error message
    container.innerHTML = `<div class="container w-100 pt-3 ps-2"><p>Error loading profile bids. Please try again later.</p></div>`;
  }
}

export async function renderProfileWins() {
  const container = document.querySelector("#myWinsContainer");
  const loadingMessage = "Loading your wins...";

  // Display loading message
  handlers.renderItems([], "#myWinsContainer", "", loadingMessage);

  try {
    const profileWins = await profileMethods.filterProfileWins();

    // Remove the loading message and render the wins
    handlers.renderItems(
      profileWins,
      "#myWinsContainer",
      "You have no wins yet.",
    );
  } catch (error) {
    console.error("Error loading your wins:", error);
    // Handle error
    // Remove loading message and display error message
    container.innerHTML = `<div class="container w-100 pt-3 ps-2"><p>Error loading your wins. Please try again later.</p></div>`;
  }
}

export async function renderAllProfileListings() {
  renderProfileListings();
  renderProfileBidsLead();
  renderProfileBidsNoLead();
  renderProfileWins();
  profileMethods.calcCurrentCredits();
}
