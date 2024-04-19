import { API_AUCTION_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

const action = "/listings";
const method = "post";

/**
 * Creates a new listing by sending a POST request to the server.
 *
 * @param {Object} listingData - The data for the new listing.
 * @param {string} listingData.title - The title of the post.
 * @param {string} listingData.body - The content/body of the listing.
 * @param {string} [listingData.media] - Optional media URL for the post (e.g., image or video).
 * @throws {Error} - Throws an error if the listing creation fails.
 *
 * @example
 * // Example usage: Creating a new Listing.
 * const newListingData = {
 *   title: "Exciting Title",
 *   description: "This is the description of the post. It can be quite long.",
 *   media: "https://example.com/image.jpg" // Optional
 * };
 *
 * try {
 *   const createdListing = await createListing(newPostData);
 *   console.log("Listing created successfully:", createdListing);
 * } catch (error) {
 *   console.error("Listing creation failed:", error.message);
 * }
 *
 * @returns {Promise<Object>} - A promise that resolves to the created listing data.
 */
export async function createListing(listingData) {
  const createListingURL = API_AUCTION_URL + action;

  const response = await authFetch(createListingURL, {
    method,
    body: JSON.stringify(listingData),
  });
  console.log("createListing listingData:", listingData);
  return await response.json();
}
