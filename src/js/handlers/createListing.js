import * as listingMethods from "../api/listings/index.js";

/**
 * Extracts form data from the given HTML form.
 * This function retrieves values from various form fields and constructs an object
 * containing the extracted data.
 * @param {HTMLFormElement} form - The HTML form element from which to extract data.
 * @returns {Object} An object containing the extracted form data.
 * The returned object has the following properties:
 * - title: The title of the listing.
 * - description: The description of the listing.
 * - tags: An array of tags associated with the listing.
 * - media: An array of media URLs associated with the listing.
 * - endsAt: The end date and time of the listing.
 */
export function extractFormData(form) {
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

/**
 * Sets up a form listener for creating a listing.
 * This function adds an event listener to the submit event of the specified form.
 * When the form is submitted, it extracts the form data and sends it to create a new listing.
 * @param {HTMLFormElement} form - The HTML form element representing the create listing form.
 * The form should contain input fields for title, description, tags, media, and ending time.
 */
export function setCreateListingFormListener() {
  const form = document.querySelector("#createListingForm");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const listingData = extractFormData(form);

      try {
        const createdListing = await listingMethods.createListing(listingData);
        const createdListingId = createdListing.id;
        alert("Your listing was successfully created.");
        location.href = `../index.html?id=${createdListingId}`;
      } catch (error) {
        alert(`An error occurred while creating the listing: ${error.message}`);
      }
    });
  }
}
