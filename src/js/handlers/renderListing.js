import * as templates from "../templates/index.js";
import * as postMethods from "../api/listings/index.js";
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

export async function renderListingsNotLoggedIn() {
  const listings = await postMethods.getListings(100, 100);
  const container = document.querySelector("#listingList");
  container.innerHTML = "";

  // // Reverse the array of listings to display the newest listings first
  // const reversedListings = listings.reverse();

  templates.renderListingTemplates(listings, container);
  console.log(listings);
}
