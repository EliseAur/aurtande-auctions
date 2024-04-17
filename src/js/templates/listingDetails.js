import * as listingUtils from "./listingUtils.js";

export function listingDetailsTemplate(listingData) {
  const listingDetailsContainerChild = document.createElement("div");
  // Title of listing
  listingUtils.createListingTitle(
    listingData,
    listingDetailsContainerChild,
    "h1",
  );

  // Image gallery for listing
  const listingImagesContainer = document.createElement("div");
  listingImagesContainer.className = "listing-images";
  listingUtils.createMediaGallery(listingData, listingImagesContainer);
  for (let i = 0; i < 4; i++) {
    listingUtils.createModalForGallery(
      listingData,
      listingDetailsContainerChild,
      i,
    );
  }

  listingDetailsContainerChild.appendChild(listingImagesContainer);

  // Listing description
  listingUtils.createListingDescription(
    listingData,
    listingDetailsContainerChild,
  );

  // Bid details and input to make a bid on the listing
  const makeABidForm = document.createElement("form");
  const detailsTable = document.createElement("table");
  detailsTable.className = "table table-borderless table-dark mb-3 w-auto";

  const tableBody = document.createElement("tbody");
  listingUtils.createListingTags(listingData, tableBody);
  listingUtils.createLastBid(listingData, tableBody, "tr");
  listingUtils.createTimeLeft(listingData, tableBody, "tr");
  const nextBidAmount = listingUtils.createNextBid(
    listingData,
    tableBody,
    "tr",
  );
  listingUtils.createYourBid(tableBody, "tr", nextBidAmount);

  detailsTable.appendChild(tableBody);
  makeABidForm.appendChild(detailsTable);
  listingUtils.createSubmitOrLogin(makeABidForm);

  listingDetailsContainerChild.appendChild(makeABidForm);

  // Latest bids on the listing
  listingUtils.createLatestBidTable(listingData, listingDetailsContainerChild);

  // Contact info about the seller
  listingUtils.createSellerInfoCard(listingData, listingDetailsContainerChild);

  return listingDetailsContainerChild;
}

export function renderListingDetailsTemplate(listingData, parent) {
  if (!parent || !(parent instanceof Element)) {
    console.error(
      "Invalid parent element provided for rendering listing template.",
    );
    return;
  }

  parent.append(listingDetailsTemplate(listingData));
}
