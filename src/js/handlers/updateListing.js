import * as listingMethods from "../api/listings/index.js";
// import * as handlers from "./index.js";

/**
 * Retrieves the listing ID from the URL parameters.
 * @returns {string} The listing ID.
 */
function getListingIdFromUrl() {
  const urlParams = new URLSearchParams(location.search);
  return urlParams.get("id");
}

/**
 * Sets up the form listener for updating a listing.
 * Retrieves the listing details, populates the form fields, and handles the form submission to update the listing.
 * @returns {void}
 * @example
 * setUpdateListingFormListener();
 */
export async function setUpdateListingFormListener() {
  const form = document.querySelector("#editListingForm");
  const listingId = getListingIdFromUrl();

  if (form) {
    //disable the form with the button before it is uploaded
    const button = form.querySelector("button");
    button.disabled = true;

    // Assign the formatted value to the input field
    // loading the form
    const listingEdit = await listingMethods.getListing(listingId);
    form.title.value = listingEdit.title;
    form.description.value = listingEdit.description;
    form.tags.value = listingEdit.tags;
    for (let i = 0; i < listingEdit.media.length; i++) {
      form.media[i].value = listingEdit.media[i];
    }
    const endsAtDate = new Date(listingEdit.endsAt);
    const endsAtISOString = endsAtDate.toISOString().slice(0, 16);
    form["ending-time"].value = endsAtISOString;

    //Once we have loaded the form
    button.disabled = false;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const title = form.querySelector("input[name='title']").value;
      const description = form.querySelector(
        "textarea[name='description']",
      ).value;
      const tagsInput = form.querySelector("input[name='tags']").value;
      const mediaInputs = Array.from(
        form.querySelectorAll("input[name='media']"),
      )
        .map((input) => input.value.trim())
        .filter(Boolean);

      // Splitting tagsInput into an array of tags
      const tagsArray = tagsInput.split(",").map((tag) => tag.trim());

      const listingData = {
        id: listingId,
        title,
        description,
        tags: tagsArray,
        media: mediaInputs,
      };

      try {
        const updatedListing = await listingMethods.updateListing(listingData);
        console.log("updatedListing", updatedListing);
        const updatedListingId = updatedListing.id;
        console.log("updated listingId", updatedListingId);
        alert("Your listing was successfully updated.");
        location.href = `../index.html?id=${updatedListingId}`;
      } catch (error) {
        alert(`An error occurred while creating the listing: ${error.message}`);
      }
    });
  }
}
