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

export function createListingTags(listingData, tableBody) {
  const tableRowTags = document.createElement("tr");
  const tagsHtml =
    listingData.tags.length > 0 ? listingData.tags.join(", ") : "No tags";
  tableRowTags.innerHTML = `<th scope="row" class="p-1 ps-0">Tags:</th>
                            <td class="p-1">${tagsHtml}</td>`;
  tableBody.appendChild(tableRowTags);
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

export function createYourBid(yourBidContainer, className, nextBidAmount) {
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

  if (window.location.pathname.includes("listing-member")) {
    yourBidInput.disabled = false;
  } else {
    yourBidInput.disabled = true;
  }

  yourBid.appendChild(yourBidText);
  yourBid.appendChild(yourBidInputContainer);
  yourBidInputContainer.appendChild(yourBidDollar);
  yourBidInputContainer.appendChild(yourBidInput);
  yourBidContainer.appendChild(yourBid);
}

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
      timeLeft.innerHTML = `<strong>Last bid:</strong> ${countdownString}`;
    }
  }
  timeLeftContainer.appendChild(timeLeft);
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

export function createSubmitOrLogin(makeABidForm) {
  if (window.location.pathname.includes("listing-member")) {
    const submitBidButton = document.createElement("button");
    submitBidButton.className = "btn btn-secondary flex-fill fs-6 mb-3 w-100";
    submitBidButton.innerHTML = `<i class="bi bi-credit-card-fill"></i> Submit bid`;
    makeABidForm.appendChild(submitBidButton);
  } else {
    const loginMsg = document.createElement("p");
    loginMsg.className = "mb-0 description";
    loginMsg.textContent = "Log in or create your account to make a bid";
    const loginSectionButtons = document.createElement("div");
    loginSectionButtons.className = "mt-1 mb-3 d-flex";
    loginSectionButtons.innerHTML = `<a
                                      class="btn btn-secondary flex-fill w-100 me-1 fs-6"
                                      href="../account/login/index.html">
                                      <i class="bi bi-door-closed-fill me-1"></i>Log in
                                    </a>
                                    <a
                                      class="btn btn-primary flex-fill w-100 me-1 fs-6"
                                      href="../account/register/index.html">
                                      <i class="bi bi-person-fill-add"></i> Create account
                                    </a>`;
    makeABidForm.appendChild(loginMsg);
    makeABidForm.appendChild(loginSectionButtons);
  }
}

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

  const tableBody = document.createElement("tbody");
  createListingTags(listingData, tableBody);
  createLastBid(listingData, tableBody, "tr");
  createTimeLeft(listingData, tableBody, "tr");
  const nextBidAmount = createNextBid(listingData, tableBody, "tr");
  createYourBid(tableBody, "tr", nextBidAmount);

  detailsTable.appendChild(tableBody);
  makeABidForm.appendChild(detailsTable);
  createSubmitOrLogin(makeABidForm);

  listingDetailsContainerChild.appendChild(makeABidForm);
}

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

    // Loop through the latest bids
    for (
      let i = listingData.bids.length - 1;
      i >= 0 && i >= listingData.bids.length - 5;
      i--
    ) {
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
  listingDetailsContainerChild.appendChild(bidHistoryTable);
}

export function createSellerInfoCard(
  listingData,
  listingDetailsContainerChild,
) {
  const sellerInfoCard = document.createElement("div");
  sellerInfoCard.className = "card p-3 mb-5";

  const headingInfoCard = document.createElement("p");
  headingInfoCard.innerHTML = `<strong>Contact info seller</strong>`;

  const sellerInfo = document.createElement("div");
  sellerInfo.className = "d-flex flex-row";

  const avatarSrc = listingData.seller.avatar
    ? listingData.seller.avatar
    : "../../images/placeholder-profile-img.jpg";

  sellerInfo.innerHTML = `
                  <div class="w-25 ms-0">
                    <img src="${avatarSrc}" class="img-fluid profile__user-img rounded-circle w-100 h-100" 
                    alt="Seller profile image">
                  </div>
                  <div class="ms-4 mt-2 mt-sm-3">
                    <p class="mb-1 fs-5 h3">${listingData.seller.name}</p>
                    <p>${listingData.seller.email}</p>
                  </div>`;

  sellerInfoCard.appendChild(headingInfoCard);
  sellerInfoCard.appendChild(sellerInfo);
  listingDetailsContainerChild.appendChild(sellerInfoCard);
}
