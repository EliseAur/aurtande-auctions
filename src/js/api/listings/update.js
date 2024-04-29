import { API_AUCTION_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

/**
 * Updates a listing with the provided data.
 * @param {Object} listingData - The data of the listing to update.
 * @param {string} listingData.id - The ID of the listing to update.
 * @param {string} [listingData.title] - The title of the listing. Optional.
 * @param {string} [listingData.description] - The description of the listing. Optional.
 * @param {string[]} [listingData.tags] - An array of tags associated with the listing. Optional.
 * @param {string[]} [listingData.media] - An array of media URLs associated with the listing. Optional.
 * @returns {Promise<Object>} A promise that resolves to the updated listing data.
 * @throws {Error} If the provided listingData object does not contain an 'id'.
 * @example
 * const listingData = {
 *   id: '123456',
 *   title: 'New Title',
 *   description: 'Updated Description',
 *   tags: ['tag1', 'tag2'],
 *   media: ['https://url.com/image1.jpg', 'https://url.com/image2.jpg']
 * };
 * try {
 *   const updatedListing = await updateListing(listingData);
 *   console.log(updatedListing); // Updated listing object
 * } catch (error) {
 *   console.error(error); // Handle error
 * }
 */
export async function updateListing(listingData) {
  const action = "/listings";
  const method = "put";

  if (!listingData.id) {
    throw new Error("Update requires a postID");
  }
  const updateListingURL = `${API_AUCTION_URL}${action}/${listingData.id}`;

  const response = await authFetch(updateListingURL, {
    method,
    body: JSON.stringify(listingData),
  });

  return await response.json();
}
