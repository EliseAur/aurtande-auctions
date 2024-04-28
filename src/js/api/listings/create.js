import { API_AUCTION_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

/**
 * Creates a new listing.
 * @param {Object} listingData - The data of the listing to be created.
 * @returns {Promise<Object>} A Promise that resolves with the created listing object.
 * @throws {Error} If the creation of the listing fails.
 */
export async function createListing(listingData) {
  const action = "/listings";
  const method = "post";
  const createListingURL = API_AUCTION_URL + action;

  try {
    const response = await authFetch(createListingURL, {
      method,
      body: JSON.stringify(listingData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating listing:", error);
    throw error;
  }
}
