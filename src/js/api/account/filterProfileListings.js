import * as listingMethods from "../listings/index.js";
import * as profileMethods from "./index.js";

async function getAllGoodListings() {
  try {
    const listings = await listingMethods.getListings();
    const goodListings = listingMethods.filterBadListingsA(listings);
    return goodListings;
  } catch (error) {
    console.error("error loading listings", error);
  }
}

function getUserName() {
  const userName = JSON.parse(localStorage.getItem("userName"));
  return userName;
}

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

export async function filterProfileWins() {
  const listings = await listingMethods.getListings();
  const profile = await profileMethods.getProfile();
  const profileWins = profile.wins;

  const goodListings = listingMethods.filterBadListingsA(listings);

  return goodListings.filter((listing) => profileWins.includes(listing.id));
}
