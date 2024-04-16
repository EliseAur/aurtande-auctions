import * as listingUtils from "./listingUtils.js";

export function listingDetailsTemplate(listingData) {
  const listingDetailsContainerChild = document.createElement("div");

  listingUtils.createListingTitle(
    listingData,
    listingDetailsContainerChild,
    "h1",
  );

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

  listingUtils.createListingDescription(
    listingData,
    listingDetailsContainerChild,
  );

  const detailsTable = document.createElement("table");
  detailsTable.className = "table table-borderless table-dark mb-3 w-auto";

  const tableBody = document.createElement("tbody");
  listingUtils.createListingTags(listingData, tableBody);
  listingUtils.createLastBid(listingData, tableBody, "tr");
  listingUtils.createTimeLeft(listingData, tableBody, "tr");

  detailsTable.appendChild(tableBody);

  listingDetailsContainerChild.appendChild(detailsTable);
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
