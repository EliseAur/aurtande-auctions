function createMediaGallery(listingData, listingImagesContainer) {
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

function createModalForGallery(
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

export function listingDetailsTemplate(listingData) {
  const listingDetailsContainerChild = document.createElement("div");

  const title = document.createElement("h1");
  title.className = "h2 mb-2";
  title.innerHTML = `${listingData.title}`;

  const listingImagesContainer = document.createElement("div");
  listingImagesContainer.className = "listing-images";

  createMediaGallery(listingData, listingImagesContainer);
  for (let i = 0; i < 4; i++) {
    createModalForGallery(listingData, listingDetailsContainerChild, i);
  }

  listingDetailsContainerChild.appendChild(title);
  listingDetailsContainerChild.appendChild(listingImagesContainer);
  // listingImagesContainer.appendChild(firstImageRow);
  // listingImagesContainer.appendChild(secondImageRow);
  // firstImageRow.appendChild(image1);
  // secondImageRow.appendChild(image2);
  // secondImageRow.appendChild(image3);
  // secondImageRow.appendChild(image4);
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
