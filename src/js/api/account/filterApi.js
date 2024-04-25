import * as listingMethods from "../listings/index.js";
import * as profileMethods from "./index.js";

export async function filterProfileBidsLead(listings, userName) {
  const currentDateTime = new Date();

  return listings.filter((listing) => {
    const lastBidIndex = listing.bids.length - 1;
    const lastBid = listing.bids[lastBidIndex];

    // Check if the listing has bids by the user and if it hasn't finished
    return (
      lastBidIndex >= 0 &&
      lastBid.bidderName === userName &&
      new Date(listing.endsAt) > currentDateTime
    );
  });
}

export async function filterProfileBidsNoLead(listings, userName) {
  const currentDateTime = new Date();

  return listings.filter((listing) => {
    const lastBidIndex = listing.bids.length - 1;
    const lastBid = listing.bids[lastBidIndex];

    // Check if the listing has bids by the user but not the leading bid, and if it hasn't finished
    return (
      lastBidIndex >= 0 &&
      lastBid.bidderName !== userName &&
      listing.bids.some((bid) => bid.bidderName === userName) &&
      new Date(listing.endsAt) > currentDateTime
    );
  });
}

export async function filterProfileWins() {
  const listings = await listingMethods.getListings();
  const profile = await profileMethods.getProfile();
  const profileWins = profile.wins;

  const goodListings = listingMethods.filterBadListings(listings);

  return goodListings.filter((listing) => profileWins.includes(listing.id));
}
