import * as profileMethods from "./index.js";

/**
 * Calculates the total amount of winning bids for the current user's listings.
 * @returns {Promise<number>} The total amount of winning bids.
 */
export async function amountWinningBids() {
  const profileWinsListings = await profileMethods.filterProfileWins();
  let totalAmount = 0;

  profileWinsListings.forEach((listing) => {
    const wins = listing.bids;

    if (wins.length > 0) {
      const lastBid = wins[wins.length - 1];

      const lastBidAmount = lastBid.amount;

      totalAmount += lastBidAmount;
    } else {
      console.log(`No wins for listing ${listing.id}`);
    }
  });

  return totalAmount;
}

/**
 * Calculates the total amount of bids on the user's finished listings.
 * @returns {Promise<number>} The total amount of bids on finished listings.
 */
export async function amountMyListings() {
  const profileListings = await profileMethods.getProfileListings();
  const currentDateTime = new Date();
  let totalAmount = 0;

  profileListings.forEach((listing) => {
    if (new Date(listing.endsAt) <= currentDateTime) {
      const bids = listing.bids;

      if (bids.length > 0) {
        const lastBid = bids[bids.length - 1];

        totalAmount += lastBid.amount;
      } else {
        console.log(`No wins for my finished listing ${listing.id}`);
      }
    }
  });

  return totalAmount;
}
