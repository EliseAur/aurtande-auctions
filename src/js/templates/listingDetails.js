import * as listingUtils from "./listingUtils.js";

export function listingDetailsTemplate(listingData, listingId) {
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

  listingUtils.createListingDetails(
    listingData,
    listingDetailsContainerChild,
    listingId,
  );

  // Latest bids on the listing
  listingUtils.createLatestBidTable(listingData, listingDetailsContainerChild);

  // Contact info about the seller
  listingUtils.createSellerInfoCard(listingData, listingDetailsContainerChild);

  return listingDetailsContainerChild;
}

export function renderListingDetailsTemplate(listingData, parent, listingId) {
  if (!parent || !(parent instanceof Element)) {
    console.error(
      "Invalid parent element provided for rendering listing template.",
    );
    return;
  }

  parent.append(listingDetailsTemplate(listingData, listingId));
}
