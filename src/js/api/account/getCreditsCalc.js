import * as profileMethods from "./index.js";

export async function getBidsILeadAmount() {
  // Call amountLeadingBids and wait for it to complete
  const totalAmount = await profileMethods.amountLeadingBids();

  console.log("getBidsILeadAmount", totalAmount);
  return totalAmount;
}

export async function getBidsIWinAmount() {
  // Call amountWinningBids and wait for it to complete
  const totalAmount = await profileMethods.amountWinningBids();

  // console.log("getBidsIWinAmount", totalAmount);
  return totalAmount;
}

export async function getMySellingAmount() {
  // Call amountMyListings and wait for it to complete
  const totalAmount = await profileMethods.amountMyListings();

  // console.log("getMySellingAmount", totalAmount);
  return totalAmount;
}

export async function getProfileCredits() {
  const profile = await profileMethods.getProfile();

  const profileCredits = profile.credits;
  // console.log("profileCredits", profileCredits);

  return profileCredits;
}

export async function calcReservedCredits() {
  // Get user's current credits
  let reservedCredits = await getProfileCredits();
  console.log("Current Credits:", reservedCredits);

  // Subtract the amount of leading bids and winning bids
  const leadAmount = await getBidsILeadAmount();
  const winAmount = await getBidsIWinAmount();
  reservedCredits -= leadAmount;
  reservedCredits -= winAmount;
  console.log("Subtracted Lead Amount:", leadAmount);
  console.log("Subtracted Win Amount:", winAmount);

  // Add the amount of sales
  const sellingAmount = await getMySellingAmount();
  reservedCredits += sellingAmount;
  console.log("Added Selling Amount:", sellingAmount);

  console.log("Reserved Credits:", reservedCredits);
  return reservedCredits;
}

// export async function calcReservedCredits() {
//   // Get user's current credits
//   let reservedCredits = await getProfileCredits();
//   console.log

//   // Subtract the amount of leading bids and winning bids
//   reservedCredits -= await getBidsILeadAmount();
//   reservedCredits -= await getBidsIWinAmount();

//   // Add the amount of sales
//   reservedCredits += await getMySellingAmount();

//   console.log("Reserved Credits:", reservedCredits);
//   return reservedCredits;
// }
