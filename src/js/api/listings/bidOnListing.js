import { API_AUCTION_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

const action = "/listings";
const method = "post";

export async function createBidOnListing(listingId, amount) {
  const bidOnListingURL = `${API_AUCTION_URL}${action}/${listingId}/bids`;
  // console.log("Bid on listing url:", bidOnListingURL);

  try {
    const createdBid = await authFetch(bidOnListingURL, {
      method,
      body: JSON.stringify({
        // body: bidData.body,
        // replyToId: bidData.replyToId || null,
        // body: bidData.body,
        amount: amount,
        // bidderName: bidData.bidderName,
        // created: bidData.created,
        // id: bidData.id,
      }),
    });
    console.log("Created bid try:", createdBid);
    return await createdBid.json();
  } catch (error) {
    console.error("Error response from server:", error.response);
    throw new Error("Failed to make a bid in the listing");
  }
}
