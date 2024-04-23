import { createBidOnListing } from "../api/listings/bidOnListing.js";
import * as listingMethods from "../api/listings/index.js";

function getListingIdFromUrl() {
  const urlParams = new URLSearchParams(location.search);
  return urlParams.get("id");
}

export async function setCreateBidFormListener() {
  const bidForm = document.querySelector(".bidForm");

  bidForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const listingId = getListingIdFromUrl();
      const formData = new FormData(bidForm);
      const bidData = Object.fromEntries(formData.entries());

      bidData.amount = Number(
        bidForm.querySelector("input[name='amount']").value,
      );

      const listing = await listingMethods.getListing(listingId);

      let credits = parseInt(localStorage.getItem("credits"), 10);

      // Check if the user has enough credits
      if (credits >= bidData.amount) {
        // Subtract bid amount from credits
        credits -= bidData.amount;

        // Update credits in local storage
        localStorage.setItem("credits", credits);

        // Store the listing ID in an array in local storage
        let listingIds = JSON.parse(localStorage.getItem("listingIds")) || [];
        listingIds.push(listingId);
        localStorage.setItem("listingIds", JSON.stringify(listingIds));

        const createdBid = await createBidOnListing(listingId, bidData.amount);
        updateBidsArray(listing, createdBid);

        alert(
          `Your bid was successfully added. Your balance is now: ${credits} $`,
        );
        bidForm.querySelector("input[name='amount']").value = "";
        location.reload();
      } else {
        alert("You do not have enough credits to place this bid.");
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
  } else {
    console.error("Listing not found for updating bids array.");
    throw new Error("Listing not found for updating bids array.");
  }
}
