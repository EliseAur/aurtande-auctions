import { API_AUCTION_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

/**
 * Removes a post by sending a DELETE request to the server.
 *
 * @param {string} id - The ID of the post to be deleted.
 * @throws {Error} - Throws an error if the deletion fails or if the post ID is not provided.
 *
 * @example
 * // Example usage: Deleting a post by its ID.
 * const postIdToDelete = "123456"; // Replace with the actual post ID
 *
 * try {
 *   const deletedPost = await removePost(postIdToDelete);
 *   console.log("Post deleted successfully:", deletedPost);
 * } catch (error) {
 *   console.error("Post deletion failed:", error.message);
 * }
 *
 * @returns {Promise<Object>} - A promise that resolves to the deleted post data.
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
