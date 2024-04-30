import * as handlers from "./index.js";
import * as listingMethods from "../api/listings/index.js";

function getNonFinishedListings(listings) {
  const currentDate = new Date();
  return listings.filter((listing) => new Date(listing.endsAt) > currentDate);
}

export function sortListingsByLatest(listings) {
  const filteredListings = getNonFinishedListings(listings);
  return filteredListings.slice().sort((a, b) => {
    // Compare the dates in descending order
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
}

export function sortListingsByPopularity(listings) {
  const filteredListings = getNonFinishedListings(listings);
  return filteredListings.slice().sort((a, b) => {
    // Compare the number of bids in descending order
    return b._count.bids - a._count.bids;
  });
}

export function sortListingsByEndingSoon(listings) {
  const filteredListings = getNonFinishedListings(listings);
  return filteredListings.slice().sort((a, b) => {
    // Compare the ending dates in ascending order
    return new Date(a.endsAt) - new Date(b.endsAt);
  });
}

export function sortListingsByFinished(listings) {
  const finishedListings = listingMethods.filterOnlyFinishedListings(listings);
  return finishedListings;
}

export function setupSortDropdown(listings) {
  const container = document.querySelector("#listingList");
  const sortDropdown = document.querySelector("#sort-listings");

  if (sortDropdown) {
    sortDropdown.value = "default";
    sortDropdown.addEventListener("change", handleSortChange);
  }

  function handleSortChange() {
    const selectedOption = sortDropdown.value;
    let sortedListings;

    switch (selectedOption) {
      case "popular":
        sortedListings = sortListingsByPopularity(listings);
        break;
      case "ending":
        sortedListings = sortListingsByEndingSoon(listings);
        break;
      case "finished":
        sortedListings = sortListingsByFinished(listings);
        break;
      case "latest":
        sortedListings = sortListingsByLatest(listings);
        break;
      case "default":
      default:
        sortedListings = listings;
    }
    handlers.updateFeedWithSearchSortResults(sortedListings, container);
  }
}
