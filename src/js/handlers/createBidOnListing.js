import { createBidOnListing } from "../api/listings/bidOnListing.js";
import * as listingMethods from "../api/listings/index.js";
import * as profileMethods from "../api/account/index.js";

function getListingIdFromUrl() {
  const urlParams = new URLSearchParams(location.search);
  return urlParams.get("id");
}

// export async function setCreateBidFormListener() {
//   const bidForm = document.querySelector(".bidForm");
//   const listingId = getListingIdFromUrl();
//   // console.log("listingId:", listingId);

//   // const getProfileBids = await profileMethods.getProfileBids();
//   // console.log("getProfileBids:", getProfileBids);

//   const bidderProfile = await profileMethods.getProfile();
//   // console.log("Bidders Profile", bidderProfile);
//   // This array is an array of bids made by the user. Every time the bidform.eventlistener run I create a new object in the array. The newest object is always [0]. I want to place the listingId into that object.

//   bidForm.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     try {
//       const formData = new FormData(bidForm);
//       const bidData = Object.fromEntries(formData.entries());
//       console.log("biddata:", bidData);

//       // bidData.listingId = listingId;

//       bidData.amount = Number(
//         bidForm.querySelector("input[name='amount']").value,
//       );
//       // console.log("biddata.amount", bidData.amount); // log ok

//       const listing = await listingMethods.getListing(listingId);
//       // console.log("I bid on this listing", listing); // log ok

//       const indexLastBid = listing.bids.length - 1;
//       // const lastBidInListing = listing.bids[indexLastBid];
//       let lastBidInListing;

//       if (listing.bids.length === 0) {
//         // Set a default value when there are no bids
//         lastBidInListing = { bidderName: "No bids yet" };
//         // console.log("LastBidInListing", lastBidInListing); // log ok
//       } else {
//         lastBidInListing = listing.bids[indexLastBid];
//         // console.log("LastBidInListing", lastBidInListing.bidderName); // log ok
//       }

//       const seller = listing.seller.name;
//       // console.log("listing.seller.name:", seller); // log ok

//       // const userName = localStorage.getItem("userName");
//       const userName = JSON.parse(localStorage.getItem("userName"));
//       // console.log("userName:", userName); // log ok

//       // let credits = parseInt(localStorage.getItem("credits"), 10);
//       let credits = bidderProfile.credits;
//       // console.log("profile credits", credits);

//       // Check if the user has enough credits and that the user is not on top of the list
//       if (credits < bidData.amount) {
//         alert(
//           "Sorry, you can not place this bid. You don't have enough credits.",
//         );
//       } else if (
//         lastBidInListing.bidderName &&
//         lastBidInListing.bidderName === userName
//       ) {
//         alert(
//           "Sorry, you can not place this bid. You are on top of the bidding list.",
//         );
//       } else if (seller === userName) {
//         alert("Sorry, you can not place bids on listings you created.");
//       } else {
//         // Subtract bid amount from credits
//         credits -= bidData.amount;

//         // Update credits in local storage
//         // localStorage.setItem("credits", credits);

//         // Store the listing ID in an array in local storage
//         // let listingIds = JSON.parse(localStorage.getItem("listingIds")) || [];
//         // listingIds.push(listingId);
//         // localStorage.setItem("listingIds", JSON.stringify(listingIds));

//         const createdBid = await createBidOnListing(listingId, bidData.amount);
//         // console.log("createdBid", createdBid);

//         // Push the bid object into the array
//         // getProfileBids.unshift(createdBid);

//         // console.log("createdBid amount", createdBid.amount);
//         updateBidsArray(listing, createdBid);
//         // console.log(updateBidsArray(listing, createdBid));

//         alert(
//           `Your bid was successfully added. Your balance is now: ${credits} $`,
//         );
//         bidForm.querySelector("input[name='amount']").value = "";
//         location.reload();
//       }
//     } catch (error) {
//       console.error("Error occurred while creating bid:", error);
//       alert(`An error occurred while adding the bid: ${error.message}`);
//     }
//   });
// }

// async function updateBidsArray(listing, newBid) {
//   if (listing) {
//     listing.bids.push(newBid);
//     // console.log("newBid", newBid);
//     // console.log("newListing", listing);
//   } else {
//     console.error("Listing not found for updating bids array.");
//     throw new Error("Listing not found for updating bids array.");
//   }
// }

// -----------------
export async function setCreateBidFormListener() {
  const bidForm = document.querySelector(".bidForm");
  const listingId = getListingIdFromUrl();

  const bidderProfile = await profileMethods.getProfile();

  bidForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(bidForm);
      const bidData = Object.fromEntries(formData.entries());
      console.log("biddata:", bidData);

      bidData.amount = Number(
        bidForm.querySelector("input[name='amount']").value,
      );

      const listing = await listingMethods.getListing(listingId);

      const indexLastBid = listing.bids.length - 1;
      let lastBidInListing;

      if (listing.bids.length === 0) {
        // Set a default value when there are no bids
        lastBidInListing = { bidderName: "No bids yet" };
      } else {
        lastBidInListing = listing.bids[indexLastBid];
      }

      const seller = listing.seller.name;

      // const userName = localStorage.getItem("userName");
      const userName = JSON.parse(localStorage.getItem("userName"));

      let credits = bidderProfile.credits;

      // Check if the user has enough credits and that the user is not on top of the list
      if (credits < bidData.amount) {
        alert(
          "Sorry, you can not place this bid. You don't have enough credits.",
        );
      } else if (
        lastBidInListing.bidderName &&
        lastBidInListing.bidderName === userName
      ) {
        alert(
          "Sorry, you can not place this bid. You are on top of the bidding list.",
        );
      } else if (seller === userName) {
        alert("Sorry, you can not place bids on listings you created.");
      } else {
        // Subtract bid amount from credits
        credits -= bidData.amount;

        const createdBid = await createBidOnListing(listingId, bidData.amount);

        updateBidsArray(listing, createdBid);

        alert(
          `Your bid was successfully added. Your balance is now: ${credits} $`,
        );
        bidForm.querySelector("input[name='amount']").value = "";
        location.reload();
      }
    } catch (error) {
      console.error("Error occurred while creating bid:", error);
      alert(`An error occurred while adding the bid: ${error.message}`);
    }
  });
}

async function updateBidsArray(listing, newBid) {
  if (listing) {
    listing.bids.push(newBid);
    // console.log("newListing", listing);
    // console.log("listing.bids", listing.bids);
  } else {
    console.error("Listing not found for updating bids array.");
    throw new Error("Listing not found for updating bids array.");
  }
}
