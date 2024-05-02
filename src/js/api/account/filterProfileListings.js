import * as listingMethods from "../listings/index.js";
import * as profileMethods from "./index.js";

/**
 * Retrieves all listings and filters out bad listings.
 * @returns {Promise<Array>} A promise that resolves to an array of good listings.
 */
async function getAllGoodListings() {
  try {
    const listings = await listingMethods.getListings();
    const goodListings = listingMethods.filterBadListingsA(listings);
    return goodListings;
  } catch (error) {
    console.error("error loading listings", error);
  }
}

/**
 * Retrieves the username from local storage.
 * @returns {string} The username retrieved from local storage.
 */
function getUserName() {
  const userName = JSON.parse(localStorage.getItem("userName"));
  return userName;
}

/**
 * Filters listings where the user has placed the leading bid.
 * @returns {Promise<Array>} A promise that resolves to an array of listings where the user has placed the leading bid.
 */
export async function filterProfileBidsLead() {
  const goodListings = await getAllGoodListings();
  const userName = getUserName();
  const currentDateTime = new Date();

  const filteredListingsLead = goodListings.filter((listing) => {
    const lastBidIndex = listing.bids.length - 1;
    const lastBid = listing.bids[lastBidIndex];

    // Check if the listing has bids by the user and if it hasn't finished
    return (
      lastBidIndex >= 0 &&
      lastBid.bidderName === userName &&
      new Date(listing.endsAt) > currentDateTime
    );
  });

  return filteredListingsLead;
}

/**
 * Filters listings where the user has placed bids but not the leading bid.
 * @param {Array} listings - The array of listings to filter.
 * @param {string} userName - The username of the user.
 * @returns {Array} An array of listings where the user has placed bids but not the leading bid.
 */
export async function filterProfileBidsNoLead(listings, userName) {
  const currentDateTime = new Date();

  const filteredListings = listings.filter((listing) => {
    const lastBidIndex = listing.bids.length - 1;
    const lastBid = lastBidIndex >= 0 ? listing.bids[lastBidIndex] : null;

    // Check if the listing has bids by the user but not the leading bid, and if it hasn't finished
    const hasUserBid = listing.bids.some((bid) => bid.bidderName === userName);
    const userIsNotLeadingBid = lastBid && lastBid.bidderName !== userName;

    // Check if the listing has bids by the user but not the leading bid, and if it hasn't finished
    return (
      lastBidIndex >= 0 &&
      userIsNotLeadingBid &&
      hasUserBid &&
      new Date(listing.endsAt) > currentDateTime
    );
  });

  return filteredListings;
}

/**
 * Filters listings where the user has won.
 * @returns {Promise<Array>} A promise that resolves to an array of listings that the user has won.
 */
export async function filterProfileWins() {
  const listings = await listingMethods.getListings();
  const profile = await profileMethods.getProfile();
  const profileWins = profile.wins;

  const goodListings = listingMethods.filterBadListingsA(listings);

  return goodListings.filter((listing) => profileWins.includes(listing.id));
}
