/**
 * Checks if the title of a listing is considered good based on a minimum length criterion.
 *
 * @param {Object} listing - The listing object to be checked.
 * @param {string} listing.title - The title of the listing.
 * @returns {boolean} - Returns true if the listing title meets the criteria, otherwise false.
 */
function isListingTitleGood(listing) {
  return listing.title.length > 3;
}

function isListingNotFinished(listing) {
  const currentDate = new Date();
  return new Date(listing.endsAt) > currentDate;
}

function isListingFinished(listing) {
  const currentDate = new Date();
  return new Date(listing.endsAt) <= currentDate;
}

// function doesListingHaveImage(listing) {
//   if (listing.media.length > 0) {
//     return listing.media;
//   }
// }

/**
 * Checks if a listing meets certain criteria.
 *
 * @param {Object} listing - The listing object to be checked.
 * @returns {boolean} - Returns true if the listing meets the criteria, otherwise false.
 */
function doesListingMeetCriteriasA(listing) {
  return isListingTitleGood(listing);
}

function doesListingMeetCriteriasB(listing) {
  return isListingTitleGood(listing) && isListingNotFinished(listing);
}

function doesListingMeetCriteriasC(listing) {
  return isListingTitleGood(listing) && isListingFinished(listing);
}

/**
 * Filters out listings that do not meet general criteria.
 *
 * @param {Object[]} listings - An array of listings objects to be filtered.
 * @returns {Object[]} - An array of listings that meet the general criteria.
 */
export function filterBadListingsA(listings) {
  return listings.filter(doesListingMeetCriteriasA);
}

export function filterBadListingsB(listings) {
  return listings.filter(doesListingMeetCriteriasB);
}

export function filterOnlyFinishedListings(listings) {
  const filteredListings = listings.filter(doesListingMeetCriteriasC);
  return filteredListings;
}
