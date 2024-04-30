import * as listingMethods from "../api/listings/index.js";
import * as profileMethods from "../api/account/index.js";
import * as templates from "../templates/index.js";

export async function renderProfileListings() {
  const container = document.querySelector("#myListingsContainer");
  container.innerHTML = "";

  const loadingDiv = document.createElement("div");
  loadingDiv.textContent = "Loading listings...";
  container.appendChild(loadingDiv);

  try {
    const profileListings = await profileMethods.getProfileListings();
    const goodListings = listingMethods.filterBadListingsA(profileListings);

    if (goodListings.length === 0) {
      const noItemsDiv = document.createElement("div");
      noItemsDiv.className = "noItems container w-100 pt-3 ps-2";
      noItemsDiv.innerHTML = `<p>$"There are no listings to display."</p>`;
      container.appendChild(noItemsDiv);
    } else {
      templates.renderListingTemplates(goodListings, container);
    }

    // Remove the loading div from the container
    container.removeChild(loadingDiv);

    return goodListings;
  } catch (error) {
    console.error("Error loading your listings:", error);
    container.innerHTML = `<div class="container w-100 pt-3 ps-2"><p>Error loading your listings. Please try again later.</p></div>`;
  }
}

export async function renderProfileBidsLead() {
  const container = document.querySelector("#myBidsContainer");
  container.innerHTML = "";

  const loadingDiv = document.createElement("div");
  loadingDiv.textContent = "Loading listings...";
  container.appendChild(loadingDiv);

  try {
    const listings = await listingMethods.getListings();
    const goodListings = listingMethods.filterBadListingsA(listings);
    const userName = JSON.parse(localStorage.getItem("userName"));

    const profileBidsLead = await profileMethods.filterProfileBidsLead(
      goodListings,
      userName,
    );

    if (goodListings.length === 0) {
      const noItemsDiv = document.createElement("div");
      noItemsDiv.className = "noItems container w-100 pt-3 ps-2";
      noItemsDiv.innerHTML = `<p>$"There are no listings to display."</p>`;
      container.appendChild(noItemsDiv);
    } else {
      templates.renderListingTemplates(profileBidsLead, container);
    }

    container.removeChild(loadingDiv);

    return profileBidsLead;
  } catch (error) {
    console.error("Error loading profile bids:", error);
    container.innerHTML = `<div class="container w-100 pt-3 ps-2"><p>Error loading profile bids. Please try again later.</p></div>`;
  }
}

export async function renderProfileBidsNoLead() {
  const container = document.querySelector("#myBidsContainerNoLead");
  container.innerHTML = "";

  const loadingDiv = document.createElement("div");
  loadingDiv.textContent = "Loading listings...";
  container.appendChild(loadingDiv);

  try {
    const listings = await listingMethods.getListings();
    const goodListings = listingMethods.filterBadListingsA(listings);
    const userName = JSON.parse(localStorage.getItem("userName"));

    const profileBidsNoLead = await profileMethods.filterProfileBidsNoLead(
      goodListings,
      userName,
    );

    if (profileBidsNoLead.length === 0) {
      const noItemsDiv = document.createElement("div");
      noItemsDiv.className = "noItems container w-100 pt-3 ps-2";
      noItemsDiv.innerHTML = `<p>$"There are no listings to display."</p>`;
      container.appendChild(noItemsDiv);
    } else {
      templates.renderListingTemplates(profileBidsNoLead, container);
    }

    container.removeChild(loadingDiv);

    return profileBidsNoLead;
  } catch (error) {
    console.error("Error loading profile bids:", error);
    container.innerHTML = `<div class="container w-100 pt-3 ps-2"><p>Error loading profile bids. Please try again later.</p></div>`;
  }
}

export async function renderProfileWins() {
  const container = document.querySelector("#myWinsContainer");
  container.innerHTML = "";

  const loadingDiv = document.createElement("div");
  loadingDiv.textContent = "Loading listings...";
  container.appendChild(loadingDiv);

  try {
    const profileWins = await profileMethods.filterProfileWins();
    if (profileWins.length === 0) {
      const noItemsDiv = document.createElement("div");
      noItemsDiv.className = "noItems container w-100 pt-3 ps-2";
      noItemsDiv.innerHTML = `<p>$"There are no listings to display."</p>`;
      container.appendChild(noItemsDiv);
    } else {
      templates.renderListingTemplates(profileWins, container);
    }

    container.removeChild(loadingDiv);

    return profileWins;
  } catch (error) {
    console.error("Error loading your wins:", error);
    container.innerHTML = `<div class="container w-100 pt-3 ps-2"><p>Error loading your wins. Please try again later.</p></div>`;
  }
}

export async function renderAllProfileListings() {
  await renderProfileListings();
  await renderProfileBidsLead();
  await renderProfileBidsNoLead();
  await renderProfileWins();
}
