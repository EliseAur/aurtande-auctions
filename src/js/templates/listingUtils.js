export function createListingImage(listingData, cardImage) {
  // Listing image
  const listingImage = document.createElement("img");
  listingImage.title = "Listing image";
  listingImage.className = "listingImage card-img-top";
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
  cardImage.appendChild(listingImage);
}

export function createListingTitle(listingData, titleListing) {
  const title = document.createElement("h5");
  title.className = "title card-title h6";
  title.textContent = listingData.title;
  titleListing.appendChild(title);
}

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
export function createVieWMoreButton(listingData, buttonListing) {
  const viewMoreButton = document.createElement("a");
  viewMoreButton.href = `./pages/listing/index.html?id=${listingData.id}`;
  viewMoreButton.className = "viewMoreButton btn btn-sm btn-primary w-100";
  viewMoreButton.textContent = "View more";
  buttonListing.appendChild(viewMoreButton);
}

export function createLastBidText(listingData, detailsListing) {
  const lastBid = listingData.bids[listingData.bids.length - 1];
  const textLastBid = document.createElement("p");
  textLastBid.className = "card-text mb-1";
  if (lastBid) {
    textLastBid.innerHTML = `<strong>Last bid:</strong> ${lastBid.amount} $`;
  } else {
    textLastBid.innerHTML = `<strong>Last bid:</strong> No bids`;
  }
  detailsListing.appendChild(textLastBid);
}

export function createTimeLeftText(listingData, detailsListing) {
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
    const countdownString = `${remainingDays} days, ${remainingHours} hours, ${remainingMinutes} min`;

    textTimeLeft.innerHTML = `<strong>Time left:</strong> ${countdownString}`;

    detailsListing.appendChild(textTimeLeft);
  }
}
