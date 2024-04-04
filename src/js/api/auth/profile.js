// import { API_SOCIAL_URL } from "../constants.js";
// import { authFetch } from "../authFetch.js";

// /**
//  * Fetches the user profile information including followers and following details, post count and all posts created by the user logged in.
//  *
//  * @throws {Error} Throws an error if there is an issue fetching the profile.
//  *
//  * @returns {Promise<Object>} A promise that resolves to the user profile object.
//  *
//  * @example
//  * // Call the getProfile function to fetch the user profile.
//  * try {
//  *   const userProfile = await getProfile();
//  *   console.log("User profile:", userProfile);
//  * } catch (error) {
//  *   console.error("Error fetching profile:", error.message);
//  * }
//  */
// export async function getProfile() {
//   // Retrieve the username from local storage
//   const storedUsername = localStorage.getItem("userName");
//   const trimmedUsername = storedUsername
//     ? storedUsername.trim().replace(/^"(.*)"$/, "$1")
//     : null;

//   if (!trimmedUsername) {
//     console.error("Username not found in local storage.");
//   }

//   const action = `/profiles/${trimmedUsername}`;
//   const method = "get";
//   const baseURL = API_SOCIAL_URL;
//   const getProfileURL = new URL(`${baseURL}${action}`);
//   getProfileURL.searchParams.set("_listings", true);
//   getProfileURL.searchParams.set("_wins", true);

//   try {
//     const response = await authFetch(getProfileURL.toString());
//     const profile = await response.json();
//     return profile;
//   } catch (error) {
//     console.error("Error fetching profile:", error);
//     throw error;
//   }
// }
