import * as profileMethods from "./index.js";

// export async function getBidsILeadAmount() {
//   // Call amountLeadingBids and wait for it to complete
//   const totalAmount = await profileMethods.amountLeadingBids();

//   console.log("getBidsILeadAmount", totalAmount);
//   return totalAmount;
// }

export async function getBidsIWinAmount() {
  // Call amountWinningBids and wait for it to complete
  const totalAmount = await profileMethods.amountWinningBids();
  return totalAmount;
}

export async function getMySellingAmount() {
  // Call amountMyListings and wait for it to complete
  const totalAmount = await profileMethods.amountMyListings();
  return totalAmount;
}

export async function getProfileCredits() {
  const profile = await profileMethods.getProfile();
  const profileCredits = profile.credits;
  return profileCredits;
}

export function setReservedCredits(reservedCredits) {
  localStorage.setItem("reservedCredits", reservedCredits);
}

export async function calcReservedCredits() {
  // Get user's current credits
  let currentCredits = 1000;
  console.log("Current Credits:", currentCredits);

  // Subtract the amount of winning bids
  const winAmount = await getBidsIWinAmount();
  currentCredits -= winAmount;
  console.log("Subtracted Win Amount:", winAmount);

  // Add the amount of sales
  const sellingAmount = await getMySellingAmount();
  currentCredits += sellingAmount;
  console.log("Added Selling Amount:", sellingAmount);

  console.log("Current Credits:", currentCredits);

  // Set the reserved credits in local storage
  setReservedCredits(currentCredits);

  return currentCredits;
}
