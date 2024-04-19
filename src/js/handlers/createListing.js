import { createListing } from "../api/listings/create.js";

/**
 * Sets up a form submit listener for the create listing form.
 * When the form is submitted, it prevents the default form submission,
 * extracts the form data, creates a listing, and redirects to the created listing.
 *
 * @function
 * @returns {void}
 */
export function setCreateListingFormListener() {
  const form = document.querySelector("#createListingForm");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Selecting form inputs
      const title = form.querySelector("input[name='title']").value;
      const description = form.querySelector(
        "textarea[name='description']",
      ).value;
      const tagsInput = form.querySelector("input[name='tags']").value;
      const mediaInputs = Array.from(
        form.querySelectorAll("input[name='media']"),
      )
        .map((input) => input.value)
        .filter((value) => value.trim() !== "");
      const endsAt = new Date(
        form.querySelector("input[name='ending-time']").value,
      );

      // Formatting tags
      const tagsArray = tagsInput.split(",").map((tag) => tag.trim());

      // Creating listing data object
      const listingData = {
        title,
        description,
        tags: tagsArray,
        media: mediaInputs,
        endsAt,
      };

      try {
        const createdListing = await createListing(listingData);
        console.log("Created Listing:", createdListing);
        const createdListingId = createdListing.id;
        alert("Your listing was successfully created.");
        location.href = `../index.html?id=${createdListingId}`;
      } catch (error) {
        alert(`An error occurred while creating the listing: ${error.message}`);
      }
    });
  }
}
