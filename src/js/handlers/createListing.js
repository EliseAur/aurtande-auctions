import { createListing } from "../api/listings/create.js";

function extractFormData(form) {
  const title = form.querySelector("input[name='title']").value;
  const description = form.querySelector("textarea[name='description']").value;
  const tagsInput = form.querySelector("input[name='tags']").value;
  const mediaInputs = Array.from(form.querySelectorAll("input[name='media']"))
    .map((input) => input.value.trim())
    .filter(Boolean);
  const endsAt = new Date(
    form.querySelector("input[name='ending-time']").value,
  );

  const tagsArray = tagsInput.split(",").map((tag) => tag.trim());

  return {
    title,
    description,
    tags: tagsArray,
    media: mediaInputs,
    endsAt,
  };
}

export function setCreateListingFormListener() {
  const form = document.querySelector("#createListingForm");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const listingData = extractFormData(form);

      try {
        const createdListing = await createListing(listingData);
        const createdListingId = createdListing.id;
        alert("Your listing was successfully created.");
        location.href = `../index.html?id=${createdListingId}`;
      } catch (error) {
        alert(`An error occurred while creating the listing: ${error.message}`);
      }
    });
  }
}
