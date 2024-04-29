// import { createBidOnListing } from "../api/listings/bidOnListing.js";
import * as listingMethods from "../api/listings/index.js";
import * as profileMethods from "../api/account/index.js";

/**
 * Retrieves the listing ID from the URL parameters.
 * @returns {string} The listing ID.
 */
function getListingIdFromUrl() {
  const urlParams = new URLSearchParams(location.search);
  return urlParams.get("id");
}

/**
 * Sets up a form listener for creating a bid on a listing.
 * This function adds an event listener to the bid form. When the form is submitted, it prevents the default behavior,
 * collects the bid data from the form inputs, validates the bid, updates the user's credits, creates a bid on the listing,
 * updates the bids array for the listing, and displays appropriate alerts for success or failure.
 * @throws {Error} Throws an error if there is an issue with creating the bid or updating the bids array.
 */
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
      const userName = JSON.parse(localStorage.getItem("userName"));
      let credits = bidderProfile.credits;

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

        const createdBid = await listingMethods.createBidOnListing(
          listingId,
          bidData.amount,
        );

        updateBidsArray(listing, createdBid);

        alert(
          `Your bid was successfully added. Your temporary balance is now: ${credits} $`,
        );

        // Clear the bid form input and reload the page
        bidForm.querySelector("input[name='amount']").value = "";
        location.reload();
      }
    } catch (error) {
      console.error("Error occurred while creating bid:", error);
      alert(`An error occurred while adding the bid: ${error.message}`);
    }
  });
}

/**
 * Updates the bids array for a listing with a new bid.
 * @param {Object} listing - The listing object.
 * @param {Object} newBid - The new bid object.
 * @throws {Error} Throws an error if the listing is not found.
 */
async function updateBidsArray(listing, newBid) {
  if (listing) {
    listing.bids.push(newBid);
  } else {
    console.error("Listing not found for updating bids array.");
    throw new Error("Listing not found for updating bids array.");
  }
}
