import * as listingUtils from "./listingUtils.js";

/**
 * Creates a template for displaying the details of a listing.
 * @param {Object} listingData - The data of the listing.
 * @param {string} listingId - The ID of the listing.
 * @returns {HTMLElement} - The container element containing the listing details template.
 */
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

  // Listing details
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
