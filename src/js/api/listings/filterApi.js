/**
 * Checks if the title of a listing is considered good based on a minimum length criterion.
 *
 * @param {Object} listing - The post object to be checked.
 * @param {string} listing.title - The title of the post.
 * @returns {boolean} - Returns true if the post title meets the criteria, otherwise false.
 */
function isListingTitleGood(listing) {
  return listing.title.length > 3;
}

function doesListingHaveImage(listing) {
  if (listing.media.length > 0) {
    return listing.media;
  }
}

// /**
//  * Checks if the provided listing is created by the current user.
//  *
//  * @param {Object} listing - The listing object to be checked.
//  * @param {string} listing.author.name - The name of the listing author.
//  * @returns {string|null} - Returns the listing author's name if it matches the current user, otherwise null.
//  */
// function isListingCreatedByCurrentUser(listing) {
//   const user = localStorage.getItem("userName");

//   const profileUserName = user ? user.trim().replace(/^"(.*)"$/, "$1") : null;
//   const authorName = listing.author.name.trim();

//   if (profileUserName === authorName) {
//     return listing.author.name;
//   }
// }

/**
 * Checks if a listing meets certain criteria.
 *
 * @param {Object} listing - The listing object to be checked.
 * @returns {boolean} - Returns true if the listing meets the criteria, otherwise false.
 */
function doesListingMeetCriterias(listing) {
  return isListingTitleGood(listing) && doesListingHaveImage(listing);
}

/**
 * Filters out listings that do not meet general criteria.
 *
 * @param {Object[]} listings - An array of listings objects to be filtered.
 * @returns {Object[]} - An array of listings that meet the general criteria.
 */
export function filterBadListings(listings) {
  return listings.filter(doesListingMeetCriterias);
}
