/**
 * Creates a "View more" button element for a listing on the homepage.
 * The button links to the detailed view of the post.
 *
 * @param {Object} listingData - The data of the listing.
 * @param {HTMLElement} buttonListing - The container to which the button is appended.
 *
 * @returns {void}
 *
 * @example
 * createVieWMoreButton(listingData, buttonDiv);
 */
function createVieWMoreButton(listingData, buttonListing) {
  const viewMoreButton = document.createElement("a");
  viewMoreButton.href = `./pages/listing/index.html?id=${listingData.id}`;
  viewMoreButton.className = "viewMoreButton btn btn-sm btn-primary w-100";
  viewMoreButton.textContent = "View more";
  buttonListing.appendChild(viewMoreButton);
}

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
  listing.className = "col card-col";

  const card = document.createElement("div");
  card.className = "card";

  const cardImage = document.createElement("div");
  cardImage.className = "card-img-top";

  const cardTextList = document.createElement("ul");
  cardTextList.className = "list-group list-group-flush";

  const titleListing = document.createElement("li");
  titleListing.className = "list-group-item list-group-item-1";

  const detailsListing = document.createElement("li");
  detailsListing.className = "list-group-item list-group-item-2";

  const buttonListing = document.createElement("li");
  buttonListing.className = "list-group-item list-group-item-3";

  const title = document.createElement("h5");
  title.className = "card-title h6";
  title.textContent = listingData.title;

  const lastBid = listingData.bids[listingData.bids.length - 1];
  const textLastBid = document.createElement("p");
  textLastBid.className = "card-text mb-1";
  if (lastBid) {
    textLastBid.innerHTML = `<strong>Last bid:</strong> ${lastBid.amount} $`;
  } else {
    textLastBid.innerHTML = `<strong>Last bid:</strong> No bids yet`;
  }

  //------------------------------------------
  // Time left
  const textTimeLeft = document.createElement("p");
  textTimeLeft.className = "card-text";

  const endDate = new Date(listingData.endsAt);
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = endDate.getTime() - currentDate.getTime();

  //check if the listing has finished
  if (timeDifference <= 0) {
    textTimeLeft.innerHTML = `<strong>Time left:</strong> Listing finished`;
  } else {
    const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const remainingHours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const remainingMinutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
    );

    // Create the countdown string
    const countdownString = `${remainingDays} days, ${remainingHours} hours, ${remainingMinutes} minutes`;

    textTimeLeft.innerHTML = `<strong>Time left:</strong> ${countdownString}`;
  }

  //-------------------------------------------
  // View more - button

  if (
    window.location.pathname.includes("/") ||
    window.location.pathname.includes("/listings-member/")
  ) {
    createVieWMoreButton(listingData, buttonListing);
  }
  // } else if (window.location.pathname.includes("/account/")) {
  //   createUpdateButton(postData, buttonDiv);
  //   createRemoveButton(buttonDiv);
  // }

  //-------------------------------------------------------
  // Listing image
  const listingImage = document.createElement("img");
  listingImage.title = "Listing image";
  listingImage.className = "listingImage  card-img-top ";
  listingImage.width = "100%";

  //Dynamically sets the image source (src) of the image element to a placeholder image if the original image fails to load due to an error.
  listingImage.onerror = function () {
    console.error("Error loading image:", this.src);
    if (window.location.href.includes("listings-member")) {
      this.src = "../../images/placeholder-image-not-found.jpg";
    } else {
      this.src = "./images/placeholder-image-not-found.jpg";
    }
  };

  //Checks if listingData.media exists and contains at least one element. If listingData.media is not empty, it sets the image source (src) of the image element to the URL of the first element in listingData.media. If listingData.media is undefined or empty, it also sets the image source to a placeholder image based on the current page's URL.
  if (listingData.media && listingData.media.length > 0) {
    listingImage.src = listingData.media[0];
    listingImage.alt = `Main image in listing with title: ${listingData.title}`;
  } else {
    if (window.location.href.includes("listings-member")) {
      console.log("media array is undefined or empty");
      listingImage.src = "../../images/placeholder-image-not-found.jpg";
      listingImage.alt = "Image not found";
    } else {
      console.log("media array is undefined or empty");
      listingImage.src = "./images/placeholder-image-not-found.jpg";
      listingImage.alt = "Image not found";
    }
  }

  //---------------------------------------------
  // Append child
  titleListing.appendChild(title);
  detailsListing.appendChild(textLastBid);
  detailsListing.appendChild(textTimeLeft);
  cardImage.appendChild(listingImage);

  cardTextList.appendChild(titleListing);
  cardTextList.appendChild(detailsListing);
  cardTextList.appendChild(buttonListing);

  card.appendChild(cardImage);
  card.appendChild(cardTextList);

  listing.appendChild(card);

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
