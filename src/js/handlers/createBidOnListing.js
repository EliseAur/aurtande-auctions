import { createBidOnListing } from "../api/listings/bidOnListing.js";
import * as listingMethods from "../api/listings/index.js";

// function getListingIdFromUrl() {
//   const urlParams = new URLSearchParams(location.search);
//   return urlParams.get("id");
// }

// /**
//  * Sets up event listeners for bid forms to handle bid creation.
//  * @function
//  * @returns {void}
//  */
// export function setCreateBidFormListener() {
//   const bidForm = document.querySelector(".bidForm");
//   console.log(bidForm);

//   bidForm.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     try {
//       const listingId = getListingIdFromUrl();
//       console.log("listingId from url:", listingId);

//       const formData = new FormData(bidForm);
//       const bidData = Object.fromEntries(formData.entries());
//       console.log("BidData:", bidData);

//       bidData.amount = Number(
//         bidForm.querySelector("input[name='amount']").value,
//       );
//       console.log(bidData.amount);
//       console.log(bidData);

//       const listing = await listingMethods.getListing(listingId);
//       console.log("listing", listing);

//       const createdBid = await createBidOnListing(listingId, bidData.amount);
//       console.log("Created Bid", createdBid);
//       // listing.bids.push(createdBid);

//       updateBidsArray(listingId, createdBid);
//       console.log("updated listing", listing);
//       alert("Your bid was successfully added.");
//       bidForm.querySelector("input[name='amount']").value = "";
//       location.reload();
//     } catch (error) {
//       console.error("Error response from server:", error);
//       alert(`An error occurred while adding the comment: ${error.message}`);
//     }
//   });
// }

// /**
//  * Function to update the comments array for a specific post.
//  * @async
//  * @function
//  * @param {string} postId - The ID of the post to update.
//  * @param {Object} newComment - The new comment object to add to the post's comments array.
//  * @returns {Promise<void>}
//  */
// async function updateBidsArray(listingId, createdBid) {
//   const listing = await listingMethods.getListing();
//   console.log("listing", listing);

//   if (listing) {
//     listing.bids.push(createdBid);
//   } else {
//     console.error("Post not found for updating comments array:", listingId);
//   }
// }

function getListingIdFromUrl() {
  const urlParams = new URLSearchParams(location.search);
  return urlParams.get("id");
}

/**
 * Sets up event listeners for bid forms to handle bid creation.
 * @function
 * @returns {void}
 */
export async function setCreateBidFormListener() {
  const bidForm = document.querySelector(".bidForm");
  // console.log(bidForm);

  bidForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const listingId = getListingIdFromUrl();
      console.log("Listing ID from URL:", listingId);

      const formData = new FormData(bidForm);
      const bidData = Object.fromEntries(formData.entries());
      // console.log("Bid Data:", bidData);

      bidData.amount = Number(
        bidForm.querySelector("input[name='amount']").value,
      );
      // console.log("Bid Amount:", bidData.amount);

      const listing = await listingMethods.getListing(listingId);
      // console.log("Listing:", listing);

      const createdBid = await createBidOnListing(listingId, bidData.amount);
      // console.log("Created Bid:", createdBid);

      updateBidsArray(listing, createdBid);

      alert("Your bid was successfully added.");
      bidForm.querySelector("input[name='amount']").value = "";
      location.reload();
    } catch (error) {
      console.error("Error occurred while creating bid:", error);
      alert(`An error occurred while adding the bid: ${error.message}`);
    }
  });
}

/**
 * Function to update the bids array for a specific listing.
 * @async
 * @function
 * @param {Object} listing - The listing object to update.
 * @param {Object} newBid - The new bid object to add to the listing's bids array.
 * @returns {Promise<void>}
 */
async function updateBidsArray(listing, newBid) {
  if (listing) {
    listing.bids.push(newBid);
    // console.log("Updated Listing:", listing);
  } else {
    console.error("Listing not found for updating bids array.");
    throw new Error("Listing not found for updating bids array.");
  }
}
