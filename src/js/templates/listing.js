import * as listingUtils from "./listingUtils.js";

/**
 * Creates a template for displaying listings on the home page when the user is not logged in/logged in, account, and listing details page.
 *
 * @param {Object} listingData - The data of the listing.
 * @returns {HTMLDivElement} - The created listing template as a HTMLDivElement.
 *
 * @example
 * // Example usage:
 * const listing = listingTemplate({
 *   author: {
 *     name: "John Doe",
 *     avatar: "path/to/avatar.jpg",
 *   },
 *   title: "Post Title",
 *   body: "Post content...",
 *   media: "path/to/media.jpg",
 *   comments: [...],
 *   reactions: [...],
 *   created: "2023-12-01T12:34:56.789Z",
 * });
 * document.body.appendChild(post);
 */
export function listingTemplate(listingData) {
  const listing = document.createElement("div");
  listing.className = "listing col card-col";

  const card = document.createElement("div");
  card.className = "card";

  const cardImage = document.createElement("div");
  // cardImage.className = "cardImage card-img-top";
  cardImage.className = "img-container";
  listingUtils.createListingImage(listingData, cardImage);

  const cardTextList = document.createElement("ul");
  cardTextList.className = "cardTextList list-group list-group-flush";

  const titleListing = document.createElement("li");
  titleListing.className = "titleListing list-group-item list-group-item-1";
  // listingUtils.createListingTitle(listingData, titleListing);
  listingUtils.createListingTitle(listingData, titleListing, "h5");

  const detailsListing = document.createElement("li");
  detailsListing.className = "detailsListing list-group-item list-group-item-2";
  listingUtils.createLastBidText(listingData, detailsListing);
  listingUtils.createTimeLeftText(listingData, detailsListing);

  const buttonListing = document.createElement("li");
  buttonListing.className = "buttonListing list-group-item list-group-item-3";
  if (
    window.location.pathname.includes("/") ||
    window.location.pathname.includes("/listings-member/")
  ) {
    listingUtils.createVieWMoreButton(listingData, buttonListing);
  }

  // Append child
  listing.appendChild(card);
  card.appendChild(cardImage);
  card.appendChild(cardTextList);
  cardTextList.appendChild(titleListing);
  cardTextList.appendChild(detailsListing);
  cardTextList.appendChild(buttonListing);

  return listing;
}

/**
 * Renders multiple listing templates for a list of listing data and appends them to the specified parent element.
 *
 * @param {Array<Object>} listingDataList - The list of listing data to render.
 * @param {Element} parent - The parent element to which the post templates will be appended.
 *
 */
export function renderListingTemplates(listingDataList, parent) {
  const listingElements = listingDataList.map((listingData) => {
    const listingElement = listingTemplate(listingData);
    return listingElement;
  });

  parent.append(...listingElements);
}
