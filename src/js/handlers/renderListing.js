// import * as templates from "../templates/index.js";
import * as listingMethods from "../api/listings/index.js";
// import * as profileMethods from "../api/account/index.js";
import * as handlers from "./index.js";

// import { getProfile } from "../api/account/profile.js";
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
//   const listings = await listingMethods.getPosts();
//   const container = document.querySelector("#postList");
//   container.innerHTML = "";

//   if (
//     window.location.pathname.includes("account/index.html") ||
//     window.location.pathname.includes("account/")
//   ) {
//     const profilePosts = listingMethods.filterlistingDataForProfile(listings);
//     templates.renderPostTemplates(profilePosts, container);
//     setupSearchFunctionality(profilePosts);
//     handlers.setCreateCommentFormListener();
//   } else {
//     const goodPosts = listingMethods.filterBadlistingData(listings);
//     templates.renderPostTemplates(goodPosts, container);
//     setupSearchFunctionality(goodPosts);
//     setupSortDropdown(goodPosts);

//     handlers.setCreateCommentFormListener();
//   }
// }

//--------------------------------------------------------

export async function renderListings() {
  const container = document.querySelector("#listingList");
  const loadingMessage = "Loading listings...";

  // Display loading message
  handlers.renderItems([], "#listingList", "", loadingMessage);

  try {
    const listings = await listingMethods.getListings();
    const goodListings = listingMethods.filterBadListings(listings);

    // Remove the loading message and render the listings
    handlers.renderItems(
      goodListings,
      "#listingList",
      "There are no listings to display.",
    );
  } catch (error) {
    console.error("Error loading listings:", error);
    // Handle error
    // Remove loading message and display error message
    container.innerHTML = `<div class="container w-100 pt-3 ps-2"><p>Error loading listings. Please try again later</p></div>`;
  }
}
