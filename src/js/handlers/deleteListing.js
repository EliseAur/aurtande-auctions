import * as listingMethods from "../api/listings/index.js";

/**
 * Retrieves the listing ID from the URL parameters.
 * @returns {string} The listing ID.
 */
function getListingIdFromUrl() {
  const urlParams = new URLSearchParams(location.search);
  return urlParams.get("id");
}

/**
 * Checks if the current user is the author of the given listing.
 * If the current user is the author, it displays and sets up event listeners
 * for the remove and update listing buttons.
 * If the current user is not the author, it does nothing.
 *
 * @param {Object} listing - The listing object to check.
 * @param {string} listing.seller.name - The name of the seller.
 *
 * @returns {void}
 *
 * @example
 * // Assuming 'listing' is a valid listing object:
 * beAbleToDeleteListing(listing);
 */
export async function beAbleToDeleteListing(listing) {
  const userName = localStorage.getItem("userName");
  const currentUserName = userName
    ? userName.trim().replace(/^"(.*)"$/, "$1")
    : null;

  if (currentUserName === listing.seller.name) {
    const deleteButton = document.querySelector("#deleteButton");
    const updateButton = document.querySelector("#updateButton");

    const listingId = getListingIdFromUrl();

    if (deleteButton && updateButton) {
      deleteButton.addEventListener("click", async (event) => {
        event.preventDefault();
        try {
          await listingMethods.deleteListing(listingId);
          alert("Listing has been deleted.");
          const listingDetailsContainer = document.querySelector(
            "#listingDetailsContainer",
          );
          if (listingDetailsContainer) {
            listingDetailsContainer.innerHTML = `
                           <div class="d-flex pt-5">
                             <i class="bi bi-check-circle-fill h2 text-success me-2"></i>
                             <h1 class="h2 mb-3">Your listing was deleted.</h1>
                           </div>
                           <div class="d-flex">
                             <a href="../listings-member/index.html" class="btn btn-secondary w-100 mt-3 me-1">
                               <i class="bi bi-file-post me-1"></i>Explore listings
                             </a>
                             <a href="../account/index.html" class="btn btn-primary w-100 mt-3 ms-1">
                               <i class="bi bi-person-fill me-1"></i>Go to Account
                             </a>
                           </div>`;
          }
        } catch (error) {
          console.error("Error deleting listing:", error);
          alert(
            `An error occurred while deleting the listing: ${error.message}`,
          );
        }
      });
    }
  }
}
