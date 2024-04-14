function createMediaGallery(listingData, listingImagesContainer) {
  const firstImageRow = document.createElement("div");
  firstImageRow.className = "row";

  const secondImageRow = document.createElement("div");
  secondImageRow.className = "row";

  const placeholderImageUrl =
    "https://placehold.co/600x400?text=No+image+available";

  const image1 = document.createElement("img");
  image1.className = "img-fluid p-1";
  image1.src = listingData.media[0] || placeholderImageUrl;
  image1.alt = `${listingData.title}`;
  image1.dataset.bsToggle = "modal";
  image1.dataset.bsTarget = "#image-1";

  const image2 = document.createElement("img");
  image2.className = "img-fluid p-1 col-4";
  image2.src = listingData.media[1] || placeholderImageUrl;
  image2.alt = `${listingData.title}`;
  image2.dataset.bsToggle = "modal";
  image2.dataset.bsTarget = "#image-2";

  const image3 = document.createElement("img");
  image3.className = "img-fluid p-1 col-4";
  image3.src = listingData.media[2] || placeholderImageUrl;
  image3.alt = `${listingData.title}`;
  image3.dataset.bsToggle = "modal";
  image3.dataset.bsTarget = "#image-3";

  const image4 = document.createElement("img");
  image4.className = "img-fluid p-1 col-4";
  image4.src = listingData.media[3] || placeholderImageUrl;
  image4.alt = `${listingData.title}`;
  image4.dataset.bsToggle = "modal";
  image4.dataset.bsTarget = "#image-4";

  firstImageRow.appendChild(image1);
  secondImageRow.appendChild(image2);
  secondImageRow.appendChild(image3);
  secondImageRow.appendChild(image4);

  listingImagesContainer.appendChild(firstImageRow);
  listingImagesContainer.appendChild(secondImageRow);
}

function createModalForGallery(listingData, listingDetailsContainerChild) {
  const firstModal = document.createElement("div");
  firstModal.className = "modal fade";
  firstModal.id = "image-1";
  firstModal.tabIndex = "-1";
  firstModal.ariaLabel = "image-1";
  firstModal.ariaHidden = "true";

  const modalDialog = document.createElement("div");
  modalDialog.className = "modal-dialog";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const modalBody = document.createElement("div");
  modalBody.className = "modal-body";
  modalBody.innerHTML = `<img
 src="${listingData.media[0]}"
 class="img-fluid p-1"
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
  firstModal.appendChild(modalDialog);
  listingDetailsContainerChild.appendChild(firstModal);
}

export function listingDetailsTemplate(listingData) {
  const listingDetailsContainerChild = document.createElement("div");

  const title = document.createElement("h1");
  title.className = "h2 mb-2";
  title.innerHTML = `${listingData.title}`;

  const listingImagesContainer = document.createElement("div");
  listingImagesContainer.className = "listing-images mx-2";

  createMediaGallery(listingData, listingImagesContainer);
  createModalForGallery(listingData, listingDetailsContainerChild);

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
