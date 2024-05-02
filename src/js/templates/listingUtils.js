/**
 * Creates a listing image element and appends it to the specified container.
 * If the listing data contains media, it sets the image source and alt attributes
 * accordingly. If no media is available, it sets a default image source.
 * If the image fails to load, it sets an error image source.
 * @param {Object} listingData - The listing data object containing media information.
 * @param {HTMLElement} cardImage - The container element to which the image will be appended.
 */
export function createListingImage(listingData, cardImage) {
  // Listing image
  const listingImage = document.createElement("img");
  listingImage.title = "Listing image";
  listingImage.className = "listingImage card-img-top";
  listingImage.width = "100%";

  listingImage.onerror = function () {
    console.error("Error loading image:", this.src);
    if (window.location.pathname.includes("/listings-member/")) {
      this.src = "../../images/error-loading-image.jpeg";
    } else if (window.location.pathname.includes("/account/")) {
      this.src = "../../images/error-loading-image.jpeg";
    } else {
      this.src = "./images/error-loading-image.jpeg";
    }
  };

  if (listingData.media && listingData.media.length > 0) {
    listingImage.src = listingData.media[0];
    listingImage.alt = `${listingData.title}`;
  } else {
    if (window.location.pathname.includes("/listings-member/")) {
      listingImage.src = "../../images/no-image-available.jpeg";
      listingImage.alt = "Image not available";
    } else if (window.location.pathname.includes("/account/")) {
      listingImage.src = "../../images/no-image-available.jpeg";
      listingImage.alt = "Image not available";
    } else {
      listingImage.src = "./images/no-image-available.jpeg";
      listingImage.alt = "Image not available";
    }
  }
  cardImage.appendChild(listingImage);
}

/**
 * Creates a listing title element with the specified class name and appends it to the given container.
 * Sets the title text content to the title of the listing data.
 * If the current page is a listing page or a listing member page, it sets a specific class for styling.
 * @param {Object} listingData - The listing data object containing the title information.
 * @param {HTMLElement} titleContainer - The container element to which the title will be appended.
 * @param {string} className - The class name to be applied to the title element.
 */
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

/**
 * Creates a listing description container with the description text content and appends it to the given container.
 * @param {Object} listingData - The listing data object containing the description information.
 * @param {HTMLElement} listingDetailsContainerChild - The container element to which the description container will be appended.
 */
export function createListingDescription(
  listingData,
  listingDetailsContainerChild,
) {
  const descriptionContainer = document.createElement("div");
  descriptionContainer.className = "descriptionContainer";

  if (listingData.description) {
    descriptionContainer.innerHTML = `
  <p class="mb-0 mt-2"><strong>Description:</strong></p>
  <p class="description">${listingData.description}</p>`;
  } else {
    descriptionContainer.innerHTML = `
  <p class="mb-0 mt-2"><strong>Description:</strong></p>
  <p class="description">No description provided.</p>`;
  }

  listingDetailsContainerChild.appendChild(descriptionContainer);
}

/**
 * Creates a listing tags table row element with the tags information and appends it to the given table body.
 * If the listing has tags, it joins them into a string separated by commas; otherwise, it displays "No tags".
 * @param {Object} listingData - The listing data object containing the tags information.
 * @param {HTMLElement} tableBody - The table body element to which the tags row will be appended.
 */
export function createListingTags(listingData, tableBody) {
  const tableRowTags = document.createElement("tr");
  const tagsHtml =
    listingData.tags.length > 0 ? listingData.tags.join(", ") : "No tags";
  tableRowTags.innerHTML = `<th scope="row" class="p-1 ps-0">Tags:</th>
                            <td class="p-1">${tagsHtml}</td>`;
  tableBody.appendChild(tableRowTags);
}

/**
 * Creates a "View more" button element for a listing with the appropriate link based on the current page.
 * Appends the button to the specified container element.
 * @param {Object} listingData - The listing data object containing the ID information.
 * @param {HTMLElement} buttonListing - The container element to which the button will be appended.
 */
export function createVieWMoreButton(listingData, buttonListing) {
  const viewMoreButton = document.createElement("a");

  if (window.location.pathname.includes("/listings-member/")) {
    viewMoreButton.href = `../listing-member/index.html?id=${listingData.id}`;
  } else if (window.location.pathname.includes("/account/")) {
    viewMoreButton.href = `../listing-member/index.html?id=${listingData.id}`;
  } else {
    viewMoreButton.href = `./pages/listing/index.html?id=${listingData.id}`;
  }
  viewMoreButton.className = "viewMoreButton btn btn-sm btn-primary w-100";
  viewMoreButton.textContent = "View more";
  buttonListing.appendChild(viewMoreButton);
}

/**
 * Creates a container element for displaying the last bid information of a listing.
 * Appends the container to the specified parent element.
 * @param {Object} listingData - The listing data object containing the bids information.
 * @param {HTMLElement} lastBidContainer - The parent element to which the last bid container will be appended.
 * @param {string} className - The class name to be applied to the last bid element.
 */
export function createLastBid(listingData, lastBidContainer, className) {
  const lastBid = document.createElement(className);
  const lastBidIndex = listingData.bids[listingData.bids.length - 1];
  const lastBidAmount = lastBidIndex ? lastBidIndex.amount : null;
  if (lastBidIndex) {
    if (
      window.location.pathname.includes("listing/") ||
      window.location.pathname.includes("listing-member")
    ) {
      lastBid.innerHTML = `<th scope="row" class="p-1 ps-0">Last bid:</th>
                            <td class="p-1">${lastBidAmount} $</td>`;
    } else {
      lastBid.className = "card-text mb-1";
      lastBid.innerHTML = `<strong>Last bid:</strong> ${lastBidAmount} $`;
    }
  } else {
    if (
      window.location.pathname.includes("listing/") ||
      window.location.pathname.includes("listing-member")
    ) {
      lastBid.innerHTML = `<th scope="row" class="p-1 ps-0">Last bid:</th>
                            <td class="p-1">No bids yet</td>`;
    } else {
      lastBid.className = "card-text mb-1";
      lastBid.innerHTML = `<strong>Last bid:</strong> No bids`;
    }
  }

  lastBidContainer.appendChild(lastBid);
}

/**
 * Creates a container element for displaying the minimum next bid amount of a listing.
 * Appends the container to the specified parent element.
 * @param {Object} listingData - The listing data object containing the bids information.
 * @param {HTMLElement} nextBidContainer - The parent element to which the next bid container will be appended.
 * @param {string} className - The class name to be applied to the next bid element.
 * @returns {number} - The minimum next bid amount.
 */
export function createNextBid(listingData, nextBidContainer, className) {
  const nextBid = document.createElement(className);
  const latestBidIndex = listingData.bids[listingData.bids.length - 1];
  const latestBidAmount = latestBidIndex ? latestBidIndex.amount : null;
  const nextBidAmount = latestBidAmount + 1;
  nextBid.innerHTML = `<th scope="row" class="p-1 ps-0">Next bid min:</th>
                            <td class="p-1">${nextBidAmount} $</td>`;

  nextBidContainer.appendChild(nextBid);

  return nextBidAmount;
}

/**
 * Creates a container element for displaying the user's bid input field.
 * Appends the container to the specified parent element.
 * @param {HTMLElement} yourBidContainer - The parent element to which the user's bid container will be appended.
 * @param {string} className - The class name to be applied to the user's bid element.
 * @param {number} nextBidAmount - The minimum next bid amount.
 * @param {Object} listingData - The listing data object containing the seller information.
 */
export function createYourBid(
  yourBidContainer,
  className,
  nextBidAmount,
  listingData,
) {
  const userName = JSON.parse(localStorage.getItem("userName"));
  const yourBid = document.createElement(className);
  const yourBidText = document.createElement("th");
  yourBidText.scope = "row";
  yourBidText.className = "p-1 ps-0";
  yourBidText.textContent = "Your bid:";

  const yourBidInputContainer = document.createElement("td");
  yourBidInputContainer.className = "p-1";

  const yourBidDollar = document.createElement("span");
  yourBidDollar.className = "position-absolute ps-2 pt-1 fs-6";
  yourBidDollar.textContent = "$";

  const yourBidInput = document.createElement("input");
  yourBidInput.setAttribute("class", "form-control w-50 ps-4 p-1 fs-6");
  yourBidInput.setAttribute("id", "bidPrice");
  yourBidInput.setAttribute("name", "amount");
  yourBidInput.setAttribute("type", "number");
  yourBidInput.setAttribute("min", nextBidAmount);
  yourBidInput.setAttribute("placeholder", nextBidAmount);
  yourBidInput.setAttribute("required", "");
  yourBidInput.setAttribute("max", "1000");

  if (
    window.location.pathname.includes("listing-member") &&
    listingData.seller.name !== userName
  ) {
    yourBidInput.disabled = false;
  } else if (
    window.location.pathname.includes("listing-member") &&
    listingData.seller.name === userName
  ) {
    yourBidInput.disabled = true;
  } else {
    yourBidInput.disabled = true;
  }

  yourBid.appendChild(yourBidText);
  yourBid.appendChild(yourBidInputContainer);
  yourBidInputContainer.appendChild(yourBidDollar);
  yourBidInputContainer.appendChild(yourBidInput);
  yourBidContainer.appendChild(yourBid);
}

/**
 * Creates a container element for displaying the time left until the end of the listing.
 * Appends the container to the specified parent element.
 * @param {Object} listingData - The listing data object containing the end date information.
 * @param {HTMLElement} timeLeftContainer - The parent element to which the time left container will be appended.
 * @param {string} className - The class name to be applied to the time left element.
 */
export function createTimeLeft(listingData, timeLeftContainer, className) {
  const timeLeft = document.createElement(className);
  const endDate = new Date(listingData.endsAt);
  const currentDate = new Date();
  // Calculate the time difference in milliseconds
  const timeDifference = endDate.getTime() - currentDate.getTime();

  //check if the listing has finished
  if (timeDifference <= 0) {
    if (
      window.location.pathname.includes("listing/") ||
      window.location.pathname.includes("listing-member")
    ) {
      timeLeft.innerHTML = `<th scope="row" class="p-1 ps-0">Time left:</th>
                            <td class="p-1">Listing finished</td>`;
    } else {
      timeLeft.className = "textTimeLeft card-text";
      timeLeft.innerHTML = `<strong>Time left:</strong> Listing finished`;
    }
  } else {
    const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const remainingHours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const remainingMinutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
    );

    const countdownString = `${remainingDays} days, ${remainingHours} hours, ${remainingMinutes} min`;

    if (
      window.location.pathname.includes("listing/") ||
      window.location.pathname.includes("listing-member")
    ) {
      timeLeft.innerHTML = `<th scope="row" class="p-1 ps-0">Time left:</th>
                            <td class="p-1">${countdownString}</td>`;
    } else {
      timeLeft.className = "textTimeLeft card-text";
      timeLeft.innerHTML = `<strong>Time left:</strong> ${countdownString}`;
    }
  }
  timeLeftContainer.appendChild(timeLeft);
}

/**
 * Creates a media gallery with images from the provided listing data.
 * If there are no images available, it will display a placeholder image.
 * If an image fails to load, it will display an error image.
 * @param {Object} listingData - The data of the listing containing media information.
 * @param {HTMLElement} listingImagesContainer - The container element where the media gallery will be appended.
 */
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
  const errorImageUrl = "../../images/error-loading-image.jpeg";

  const image1 = document.createElement("img");
  image1.className = "gallery-image-1 img-fluid p-1";
  image1.src = listingData.media[0] || placeholderImageUrl;
  image1.alt = `${listingData.title}`;
  image1.dataset.bsToggle = "modal";
  image1.dataset.bsTarget = "#image-1";
  image1.onerror = function () {
    this.src = errorImageUrl;
  };

  const image2 = document.createElement("img");
  image2.className = "gallery-image img-fluid";
  image2.src = listingData.media[1] || placeholderImageUrl;
  image2.alt = `${listingData.title}`;
  image2.dataset.bsToggle = "modal";
  image2.dataset.bsTarget = "#image-2";
  image2.onerror = function () {
    this.src = errorImageUrl;
  };

  const image3 = document.createElement("img");
  image3.className = "gallery-image img-fluid";
  image3.src = listingData.media[2] || placeholderImageUrl;
  image3.alt = `${listingData.title}`;
  image3.dataset.bsToggle = "modal";
  image3.dataset.bsTarget = "#image-3";
  image3.onerror = function () {
    this.src = errorImageUrl;
  };

  const image4 = document.createElement("img");
  image4.className = "gallery-image img-fluid";
  image4.src = listingData.media[3] || placeholderImageUrl;
  image4.alt = `${listingData.title}`;
  image4.dataset.bsToggle = "modal";
  image4.dataset.bsTarget = "#image-4";
  image4.onerror = function () {
    this.src = errorImageUrl;
  };

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

/**
 * Creates a modal for displaying a gallery image.
 * @param {Object} listingData - The data of the listing containing media information.
 * @param {HTMLElement} listingDetailsContainerChild - The container element where the modal will be appended.
 * @param {number} index - The index of the image in the media array.
 */
export function createModalForGallery(
  listingData,
  listingDetailsContainerChild,
  index,
) {
  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.id = `image-${index + 1}`;
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

/**
 * Creates either a bid submission button or login/register buttons based on user authentication status.
 * @param {HTMLElement} makeABidForm - The form element where the button(s) will be appended.
 * @param {string} listingSellerName - The name of the seller of the listing.
 * @param {Object} listingData - The data of the listing.
 */
export function createSubmitOrLogin(
  makeABidForm,
  listingSellerName,
  listingData,
) {
  const userName = JSON.parse(localStorage.getItem("userName"));

  if (window.location.pathname.includes("listing-member")) {
    const submitBidButton = document.createElement("button");
    submitBidButton.className = "btn btn-secondary flex-fill fs-6 mb-3 w-100";

    if (listingSellerName === userName) {
      // If the user is the seller, create a delete button
      const updateSectionButtons = document.createElement("div");
      updateSectionButtons.className = "mt-1 mb-3 d-flex";

      const updateButton = document.createElement("a");
      updateButton.id = "updateButton";
      updateButton.href = `./edit/index.html?id=${listingData.id}`;
      updateButton.className = "btn btn-secondary flex-fill w-100 me-1 fs-6";
      updateButton.innerHTML =
        '<i class="bi bi-pencil-square"></i>Update listing';

      const deleteButton = document.createElement("button");
      deleteButton.id = "deleteButton";
      deleteButton.className = "btn btn-primary flex-fill w-100 me-1 fs-6";
      deleteButton.innerHTML =
        '<i class="bi bi-trash-fill"></i> Delete listing';

      updateSectionButtons.appendChild(updateButton);
      updateSectionButtons.appendChild(deleteButton);
      makeABidForm.appendChild(updateSectionButtons);
    } else {
      submitBidButton.innerHTML = `<i class="bi bi-credit-card-fill"></i> Submit bid`;
      makeABidForm.appendChild(submitBidButton);
    }
  } else {
    const loginMsg = document.createElement("p");
    loginMsg.className = "mb-0 description";
    loginMsg.textContent = "Log in or create your account to make a bid";
    const loginSectionButtons = document.createElement("div");
    loginSectionButtons.className = "mt-1 mb-3 d-flex";
    loginSectionButtons.innerHTML = `<a
                                      class="btn btn-secondary flex-fill w-100 me-1 fs-6"
                                      href="../account/login/index.html">
                                      <i class="bi bi-door-closed-fill me-1"></i> Sign in
                                    </a>
                                    <a
                                      class="btn btn-primary flex-fill w-100 me-1 fs-6"
                                      href="../account/register/index.html">
                                      <i class="bi bi-person-fill-add"></i> Register
                                    </a>`;
    makeABidForm.appendChild(loginMsg);
    makeABidForm.appendChild(loginSectionButtons);
  }
}

/**
 * Creates and appends the listing details, including bid details and bid submission form.
 * @param {Object} listingData - The data of the listing.
 * @param {HTMLElement} listingDetailsContainerChild - The container element where the listing details will be appended.
 * @param {string} listingId - The ID of the listing.
 */
export function createListingDetails(
  listingData,
  listingDetailsContainerChild,
  listingId,
) {
  // Bid details and input to make a bid on the listing
  const makeABidForm = document.createElement("form");
  makeABidForm.className = "bidForm";
  makeABidForm.id = `bidForm-${listingId}`;
  makeABidForm.classList.add("bidForm");
  const detailsTable = document.createElement("table");
  detailsTable.className = "table table-borderless table-dark mb-3 w-auto";
  const sellerName = listingData.seller.name;

  const tableBody = document.createElement("tbody");
  createListingTags(listingData, tableBody);
  createLastBid(listingData, tableBody, "tr");
  createTimeLeft(listingData, tableBody, "tr");
  const nextBidAmount = createNextBid(listingData, tableBody, "tr");
  createYourBid(tableBody, "tr", nextBidAmount, listingData);

  detailsTable.appendChild(tableBody);
  makeABidForm.appendChild(detailsTable);
  createSubmitOrLogin(makeABidForm, sellerName, listingData);

  listingDetailsContainerChild.appendChild(makeABidForm);
}

/**
 * Creates and appends the latest bid table.
 * @param {Object} listingData - The data of the listing.
 * @param {HTMLElement} listingDetailsContainerChild - The container element where the latest bid table will be appended.
 */
export function createLatestBidTable(
  listingData,
  listingDetailsContainerChild,
) {
  const bidHistoryTable = document.createElement("div");
  bidHistoryTable.className = "card p-3 mb-3";
  const bidHistoryTitle = document.createElement("p");
  bidHistoryTitle.innerHTML = `<strong>Latest Bids</strong>`;
  bidHistoryTable.appendChild(bidHistoryTitle);

  // Check if there are no bids
  if (listingData.bids.length === 0) {
    const noBidsMessage = document.createElement("p");
    noBidsMessage.textContent = "No bids yet";
    bidHistoryTable.appendChild(noBidsMessage);
  } else {
    // Create table element
    const table = document.createElement("table");
    table.className = "bidHistoryTable table table-borderless table-light mb-0";

    const tbody = document.createElement("tbody");

    let counter = 1;

    for (let i = listingData.bids.length - 1; i >= 0; i--) {
      const bid = listingData.bids[i];
      const createdDate = new Date(bid.created);
      const formattedDate = `${createdDate.getDate()}.${createdDate.getMonth() + 1}.${createdDate.getFullYear()}`;

      const tr = document.createElement("tr");

      const thNumber = document.createElement("th");
      thNumber.setAttribute("scope", "row");
      thNumber.innerHTML = `<i class="bi bi-${counter++}-circle-fill"></i>`;

      const tdBidderName = document.createElement("td");
      tdBidderName.textContent = bid.bidderName;
      const tdAmount = document.createElement("td");
      tdAmount.textContent = `${bid.amount} $`;
      const tdDate = document.createElement("td");
      tdDate.textContent = formattedDate;

      tr.appendChild(thNumber);
      tr.appendChild(tdBidderName);
      tr.appendChild(tdAmount);
      tr.appendChild(tdDate);

      tbody.appendChild(tr);
    }

    table.appendChild(tbody);

    bidHistoryTable.appendChild(table);
  }

  if (window.location.pathname.includes("/listing-member/")) {
    listingDetailsContainerChild.appendChild(bidHistoryTable);
  }
}

/**
 * Creates and appends the seller information card.
 * @param {Object} listingData - The data of the listing.
 * @param {HTMLElement} listingDetailsContainerChild - The container element where the seller information card will be appended.
 */
export function createSellerInfoCard(
  listingData,
  listingDetailsContainerChild,
) {
  const sellerInfoCard = document.createElement("div");
  sellerInfoCard.className = "card p-3 mb-5";

  const headingInfoCard = document.createElement("p");
  headingInfoCard.className = "mx-auto ms-2 mx-sm-0";
  headingInfoCard.innerHTML = `<strong>Contact info seller</strong>`;

  const sellerInfo = document.createElement("div");
  sellerInfo.className = "d-flex flex-column flex-sm-row";

  const avatarSrc = listingData.seller.avatar
    ? listingData.seller.avatar
    : "../../images/placeholder-profile-img.jpg";

  sellerInfo.innerHTML = `
                  <div class="mx-auto ms-2 ms-sm-0">
                    <img src="${avatarSrc}" class="profile-avatar me-auto ms-2 mx-sm-0" 
                    alt="Seller profile image">
                  </div>
                  <div class="mx-auto ms-2 ms-sm-0 mt-2 mt-sm-3">
                    <p class="mb-1 fs-5 h3">${listingData.seller.name}</p>
                    <p>${listingData.seller.email}</p>
                  </div>`;

  sellerInfoCard.appendChild(headingInfoCard);
  sellerInfoCard.appendChild(sellerInfo);
  listingDetailsContainerChild.appendChild(sellerInfoCard);
}
