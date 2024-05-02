import { API_AUCTION_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

/**
 * Deletes a listing with the specified ID.
 *
 * @param {string} id - The ID of the listing to be deleted.
 * @returns {Promise<void|Object>} - A promise that resolves with no value if the deletion is successful,
 *                                   or an object containing error information if the deletion fails.
 *
 * @throws {Error} Throws an error if the ID is not provided.
 *
 * @example
 * // Call 'deleteListing' to delete a listing with the specified ID:
 * await deleteListing("listing_id");
 */
export async function deleteListing(id) {
  const action = "/listings";
  const method = "delete";
  if (!id) {
    throw new Error("Delete requires a postID");
  }
  const deleteListingURL = `${API_AUCTION_URL}${action}/${id}`;

  const response = await authFetch(deleteListingURL, {
    method,
  });

  // Check if the response status is 204
  if (response.status === 204) {
    return;
  }

  return await response.json();
}
