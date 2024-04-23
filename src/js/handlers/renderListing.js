import * as templates from "../templates/index.js";
import * as postMethods from "../api/listings/index.js";
import { getProfile } from "../api/auth/profile.js";
// import * as handlers from "./index.js";

/**
 * Renders listings in the feed when the user is not logged in, filtering and sorting as needed,
 * and sets up search and sort functionality.
 *
 * @returns {void}
 *
 * @example
 * // Call 'renderListingsNotLoggedIn' to render listings in the feed for index.js:
 * await renderListingsNotLoggedIn();
 */
// export async function renderListingsNotLoggedIn() {
//   const listings = await postMethods.getPosts();
//   const container = document.querySelector("#postList");
//   container.innerHTML = "";

//   if (
//     window.location.pathname.includes("account/index.html") ||
//     window.location.pathname.includes("account/")
//   ) {
//     const profilePosts = postMethods.filterlistingDataForProfile(listings);
//     templates.renderPostTemplates(profilePosts, container);
//     setupSearchFunctionality(profilePosts);
//     handlers.setCreateCommentFormListener();
//   } else {
//     const goodPosts = postMethods.filterBadlistingData(listings);
//     templates.renderPostTemplates(goodPosts, container);
//     setupSearchFunctionality(goodPosts);
//     setupSortDropdown(goodPosts);

//     handlers.setCreateCommentFormListener();
//   }
// }

export async function renderListings() {
  const listings = await postMethods.getListings();
  const container = document.querySelector("#listingList");
  container.innerHTML = "";

  const goodListings = postMethods.filterBadListings(listings);
  templates.renderListingTemplates(goodListings, container);
  console.log(goodListings);
}

export async function renderProfileListings() {
  const listings = await postMethods.getProfileListings();
  // console.log(listings);
  const container = document.querySelector("#myListingsContainer");
  container.innerHTML = "";

  const goodListings = postMethods.filterBadListings(listings);
  templates.renderListingTemplates(goodListings, container);
  // console.log(goodListings);
}

export async function renderProfileBids() {
  const listings = await postMethods.getListings();
  const listingIds = JSON.parse(localStorage.getItem("listingIds")) || [];
  // console.log("all listings:", listings);
  // console.log("listing Ids:", listingIds);
  const container = document.querySelector("#myBidsContainer");
  container.innerHTML = "";

  const goodListings = postMethods.filterBadListings(listings);
  // console.log("Good listings", goodListings);

  // Filter listings from goodListings that have matching listingIds in profileBids
  const profileBids = goodListings.filter((listing) => {
    const hasBidsByProfile = listingIds.includes(listing.id);
    return hasBidsByProfile;
  });

  // console.log("ProfileBids:", profileBids);

  // Render the filtered listings
  templates.renderListingTemplates(profileBids, container);
}

export async function renderProfileWins() {
  const listings = await postMethods.getListings();
  const profile = await getProfile();
  const profileWins = profile.wins;
  // console.log("wins", profileWins);
  // console.log("listings", listings);
  const container = document.querySelector("#myWinsContainer");
  container.innerHTML = "";

  const goodListings = postMethods.filterBadListings(listings);
  // console.log("good listings to pick wins from", goodListings);
  // Filter listings based on profile.wins
  const listingsWithWins = goodListings.filter((listing) => {
    const hasWinsByProfile = profileWins.includes(listing.id);
    return hasWinsByProfile;
  });

  // console.log("listingsWithWins", listingsWithWins);

  // Render the filtered listings
  templates.renderListingTemplates(listingsWithWins, container);
}
