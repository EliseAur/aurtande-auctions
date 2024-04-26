import * as profileMethods from "./index.js";
// import * as listingMethods from "../listings/index.js";

// export async function amountLeadingBids() {
//   const listings = await listingMethods.getListings();
//   const userName = JSON.parse(localStorage.getItem("userName"));

//   const profileListingsLead = await profileMethods.filterProfileBidsLead(
//     listings,
//     userName,
//   );

//   // console.log("Listings I lead", profileListingsLead);

//   let totalAmount = 0; // Initialize the total amount to zero

//   // Iterate over each listing in profileListingsLead
//   profileListingsLead.forEach((listing) => {
//     // Get the bids array for the current listing
//     const bids = listing.bids;

//     // Check if there are any bids
//     if (bids.length > 0) {
//       // Get the last bid
//       const lastBid = bids[bids.length - 1];

//       // Get the amount of the last bid
//       const lastBidAmount = lastBid.amount;

//       // Get the amount of the last bid and add it to the total
//       totalAmount += lastBidAmount;

//       // Log the amount of the last bid
//       // console.log(
//       //   `Amount of last bid for listing ${listing.id}: ${lastBidAmount}`,
//       // );
//     } else {
//       // Log a message if there are no bids for the listing
//       console.log(`No bids for listing ${listing.id}`);
//     }
//   });

// Log the total amount of the last bids
// console.log(
//   `Total amount of last bids for listings you lead: ${totalAmount}`,
// );
//   return totalAmount;
// }

export async function amountWinningBids() {
  const profileWinsListings = await profileMethods.filterProfileWins();
  let totalAmount = 0; // Initialize the total amount to zero

  // Iterate over each listing in profileListingsLead
  profileWinsListings.forEach((listing) => {
    // Get the bids array for the current listing
    const wins = listing.bids;

    // Check if there are any bids
    if (wins.length > 0) {
      // Get the last bid
      const lastBid = wins[wins.length - 1];

      // Get the amount of the last bid
      const lastBidAmount = lastBid.amount;

      // Get the amount of the last bid and add it to the total
      totalAmount += lastBidAmount;
    } else {
      // Log a message if there are no bids for the listing
      console.log(`No wins for listing ${listing.id}`);
    }
  });

  // Log the total amount of the last bids
  // console.log(`Total amount of your winning bids: ${totalAmount}`);
  return totalAmount;
}

export async function amountMyListings() {
  const profileListings = await profileMethods.getProfileListings();
  const currentDateTime = new Date();
  let totalAmount = 0;

  // Iterate over each listing in profileListings
  profileListings.forEach((listing) => {
    // Check if the listing has ended
    if (new Date(listing.endsAt) <= currentDateTime) {
      // Get the bids array for the current listing
      const bids = listing.bids;

      // Check if there are any bids
      if (bids.length > 0) {
        // Get the last bid
        const lastBid = bids[bids.length - 1];

        // Get the amount of the last bid and add it to the total
        totalAmount += lastBid.amount;
      } else {
        // Log a message if there are no bids for the finished listing
        console.log(`No wins for my finished listing ${listing.id}`);
      }
    }
  });

  // console.log(`Total amount of your finished listings: ${totalAmount}`);
  return totalAmount;
}
