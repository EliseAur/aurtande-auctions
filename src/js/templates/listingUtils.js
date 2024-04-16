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
      this.src = "../../images/error-loading-image.jpeg";
    } else {
      // this.src = "./images/placeholder-image-not-found.jpg";
      this.src = "../../images/error-loading-image.jpeg";
    }
  };

  //Checks if listingData.media exists and contains at least one element. If listingData.media is not empty, it sets the image source (src) of the image element to the URL of the first element in listingData.media. If listingData.media is undefined or empty, it also sets the image source to a placeholder image based on the current page's URL.
  if (listingData.media && listingData.media.length > 0) {
    listingImage.src = listingData.media[0];
    listingImage.alt = `${listingData.title}`;
  } else {
    if (window.location.href.includes("listings-member")) {
      console.log("media array is undefined or empty");
      listingImage.src = "https://placehold.co/600x150?text=No+image+available";
      listingImage.alt = "Image not found";
    } else {
      console.log("media array is undefined or empty");
      // listingImage.src = "./images/placeholder-image-not-found.jpg";
      listingImage.src = "https://placehold.co/600x400?text=Hello\nWorld";

      listingImage.alt = "Image not found";
    }
  }
  cardImage.appendChild(listingImage);
}

export function createListingTitle(listingData, titleContainer, className) {
  const title = document.createElement(className);
  title.textContent = listingData.title;

  if (
    window.location.pathname.includes("listing/") ||
    window.location.pathname.includes("listing-member")
  ) {
    title.className = "h2 mb-2";
  } else {
    title.className = "title card-title";
  }
  titleContainer.appendChild(title);
}

export function createListingDescription(
  listingData,
  listingDetailsContainerChild,
) {
  const descriptionContainer = document.createElement("div");
  descriptionContainer.className = "descriptionContainer";
  descriptionContainer.innerHTML = `
  <p class="mb-0 mt-2"><strong>Description:</strong></p>
  <p class="description">${listingData.description}</p>`;
  listingDetailsContainerChild.appendChild(descriptionContainer);
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

  if (window.location.pathname.includes("/listings-member/")) {
    viewMoreButton.href = `../listing-member/index.html?id=${listingData.id}`;
  } else {
    viewMoreButton.href = `./pages/listing/index.html?id=${listingData.id}`;
  }

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
  textTimeLeft.className = "textTimeLeft card-text";

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
  }
  detailsListing.appendChild(textTimeLeft);
}

export function createMediaGallery(listingData, listingImagesContainer) {
  const firstImageRow = document.createElement("div");
  firstImageRow.className = "row";

  const secondImageRow = document.createElement("div");
  secondImageRow.className = "row";

  const imgContainer2 = document.createElement("div");
  imgContainer2.className = "imageContainer p-1 col-4 ";
  const imgContainer3 = document.createElement("div");
  imgContainer3.className = "imageContainer p-1 col-4 ";
  const imgContainer4 = document.createElement("div");
  imgContainer4.className = "imageContainer p-1 col-4 ";

  const placeholderImageUrl = "../../images/no-image-available.jpeg";

  const image1 = document.createElement("img");
  image1.className = "gallery-image-1 img-fluid p-1";
  image1.src = listingData.media[0] || placeholderImageUrl;
  image1.alt = `${listingData.title}`;
  image1.dataset.bsToggle = "modal";
  image1.dataset.bsTarget = "#image-1";

  const image2 = document.createElement("img");
  image2.className = "gallery-image img-fluid";
  image2.src = listingData.media[1] || placeholderImageUrl;
  image2.alt = `${listingData.title}`;
  image2.dataset.bsToggle = "modal";
  image2.dataset.bsTarget = "#image-2";

  const image3 = document.createElement("img");
  image3.className = "gallery-image img-fluid";
  image3.src = listingData.media[2] || placeholderImageUrl;
  image3.alt = `${listingData.title}`;
  image3.dataset.bsToggle = "modal";
  image3.dataset.bsTarget = "#image-3";

  const image4 = document.createElement("img");
  image4.className = "gallery-image img-fluid";
  image4.src = listingData.media[3] || placeholderImageUrl;
  image4.alt = `${listingData.title}`;
  image4.dataset.bsToggle = "modal";
  image4.dataset.bsTarget = "#image-4";

  firstImageRow.appendChild(image1);
  secondImageRow.appendChild(imgContainer2);
  secondImageRow.appendChild(imgContainer3);
  secondImageRow.appendChild(imgContainer4);
  imgContainer2.appendChild(image2);
  imgContainer3.appendChild(image3);
  imgContainer4.appendChild(image4);

  listingImagesContainer.appendChild(firstImageRow);
  listingImagesContainer.appendChild(secondImageRow);
}

export function createModalForGallery(
  listingData,
  listingDetailsContainerChild,
  index,
) {
  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.id = `image-${index + 1}`; // Index is zero-based, so we add 1
  modal.tabIndex = "-1";
  modal.ariaLabel = `image-${index + 1}`;
  modal.ariaHidden = "true";

  const modalDialog = document.createElement("div");
  modalDialog.className = "modal-dialog";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const modalBody = document.createElement("div");
  modalBody.className = "modal-body";
  modalBody.innerHTML = `<img
                         src="${listingData.media[index] || "../../images/no-image-available.jpeg"}"
                         class="img-fluid p-1 w-100 h-100"
                         alt="${listingData.title}"
                        />`;

  const modalFooter = document.createElement("div");
  modalFooter.className = "modal-footer";
  modalFooter.innerHTML = `<button
                           type="button"
                           class="btn btn-secondary mt-0 me-2 mb-2 py-1"
                           data-bs-dismiss="modal"
                           >
                           Close
                         </button>`;

  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);
  modalDialog.appendChild(modalContent);
  modal.appendChild(modalDialog);
  listingDetailsContainerChild.appendChild(modal);
}
