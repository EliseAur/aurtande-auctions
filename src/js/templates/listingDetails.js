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

  const tableRowTags = document.createElement("tr");
  const tagsHtml =
    listingData.tags.length > 0 ? listingData.tags.join(", ") : "No tags";
  tableRowTags.innerHTML = `<th scope="row" class="p-1 ps-0">Tags:</th>
                            <td class="p-1">${tagsHtml}</td>`;

  const tableRowLastBid = document.createElement("tr");
  const lastBidDetails = listingData.bids[listingData.bids.length - 1];
  if (listingData.bids.length > 0) {
    tableRowLastBid.innerHTML = `<th scope="row" class="p-1 ps-0">Last bid:</th>
                                  <td class="p-1">${lastBidDetails.amount} $</td>`;
  } else {
    tableRowLastBid.innerHTML = `<th scope="row" class="p-1 ps-0">Last bid:</th>
    <td class="p-1">No bids yet</td>`;
  }

  detailsTable.appendChild(tableBody);
  tableBody.appendChild(tableRowTags);
  tableBody.appendChild(tableRowLastBid);

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
