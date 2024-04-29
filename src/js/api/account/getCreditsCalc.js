import * as profileMethods from "./index.js";

/**
 * Retrieves the total amount of winning bids for the current user's listings.
 * @returns {Promise<number>} The total amount of winning bids.
 */
export async function getBidsIWinAmount() {
  // Call amountWinningBids and wait for it to complete
  const totalAmount = await profileMethods.amountWinningBids();
  return totalAmount;
}

/**
 * Retrieves the total amount of bids on the user's finished listings.
 * @returns {Promise<number>} The total amount of bids on finished listings.
 */
export async function getMySellingAmount() {
  // Call amountMyListings and wait for it to complete
  const totalAmount = await profileMethods.amountMyListings();
  return totalAmount;
}

/**
 * Retrieves the current credits from the user's profile.
 * @returns {Promise<number>} The current credits of the user.
 */
export async function getProfileCredits() {
  const profile = await profileMethods.getProfile();
  const profileCredits = profile.credits;
  return profileCredits;
}

/**
 * Sets the current credits in local storage.
 * @param {number} currentCredits The current credits to be set in local storage.
 */
export function setCurrentCredits(currentCredits) {
  localStorage.setItem("currentCredits", currentCredits);
}

/**
 * Calculates the current credits for the user based on their winning bids and sales.
 * @returns {Promise<number>} The current credits for the user.
 */
export async function calcCurrentCredits() {
  // Get user's current credits
  let currentCredits = 1000;

  // Subtract the amount of winning bids
  const winAmount = await getBidsIWinAmount();
  currentCredits -= winAmount;

  // Add the amount of sales
  const sellingAmount = await getMySellingAmount();
  currentCredits += sellingAmount;

  // Set the reserved credits in local storage
  setCurrentCredits(currentCredits);

  return currentCredits;
}
