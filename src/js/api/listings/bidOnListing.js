import { API_AUCTION_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

/**
 * Creates a bid on a specific listing.
 * @param {string} listingId - The ID of the listing to bid on.
 * @param {number} amount - The amount of the bid.
 * @returns {Promise<Object>} A Promise that resolves with the created bid object.
 * @throws {Error} If the bid creation fails.
 */
export async function createBidOnListing(listingId, amount) {
  const action = "/listings";
  const method = "post";
  const bidOnListingURL = `${API_AUCTION_URL}${action}/${listingId}/bids`;

  try {
    const createdBid = await authFetch(bidOnListingURL, {
      method,
      body: JSON.stringify({
        amount: amount,
      }),
    });
    console.log("Created bid try:", createdBid);
    return await createdBid.json();
  } catch (error) {
    console.error("Error response from server:", error.response);
    throw new Error("Failed to make a bid in the listing");
  }
}
