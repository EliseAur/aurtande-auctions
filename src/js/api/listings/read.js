import { API_AUCTION_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";

// const method = "get";

/**
 * Retrieves a list of posts with additional information about the author, comments, and reactions.
 *
 * @returns {Promise<Object[]>} - A promise that resolves to an array of post objects.
 */
export async function getListings(limit = 100, offset = 0) {
  const baseURL = API_AUCTION_URL;
  const action = "/listings";
  const getListingURL = new URL(`${baseURL}${action}`);
  // Set query parameters for pagination
  getListingURL.searchParams.set("limit", limit);
  getListingURL.searchParams.set("offset", offset);

  // Set query parameters for sorting
  getListingURL.searchParams.set("sort", "created");
  getListingURL.searchParams.set("sortOrder", "desc");

  getListingURL.searchParams.set("_seller", true);
  getListingURL.searchParams.set("_bids", true);
  // getListingURL.searchParams.set("_tag", true);
  // getListingURL.searchParams.set("_active", true);

  console.log("Constructed URL:", getListingURL.toString());

  const response = await authFetch(getListingURL.toString());

  return await response.json();
}

// /**
//  * Retrieves a specific post by its ID with additional information about the author, comments, and reactions.
//  *
//  * @param {string} id - The ID of the post to retrieve.
//  * @throws {Error} - Throws an error if the post ID is not provided.
//  * @returns {Promise<Object>} - A promise that resolves to the requested post object.
//  */
// export async function getPost(id) {
//   if (!id) {
//     throw new Error("Get requires a postID");
//   }

//   const baseURL = API_SOCIAL_URL;
//   const getPostURL = new URL(`${baseURL}${action}/${id}`);
//   getPostURL.searchParams.set("_author", true);
//   getPostURL.searchParams.set("_comments", true);
//   getPostURL.searchParams.set("_reactions", true);

//   const response = await authFetch(getPostURL.toString());

//   return await response.json();
// }
