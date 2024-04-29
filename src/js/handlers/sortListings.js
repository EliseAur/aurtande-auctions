import * as handlers from "./index.js";

export function sortListingsByLatest(listings) {
  return listings.slice().sort((a, b) => {
    // Compare the dates in descending order
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
}

export function sortListingsByPopularity(listings) {
  return listings.slice().sort((a, b) => {
    // Compare the number of bids in descending order
    return b._count.bids - a._count.bids;
  });
}

export function sortListingsByEndingSoon(listings) {
  return listings.slice().sort((a, b) => {
    // Compare the ending dates in ascending order
    return new Date(a.endsAt) - new Date(b.endsAt);
  });
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
      case "default":
      default:
        sortedListings = listings;
    }

    handlers.updateFeedWithSearchSortResults(sortedListings, container);
  }
}
