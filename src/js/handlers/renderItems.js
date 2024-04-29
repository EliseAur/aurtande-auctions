import * as templates from "../templates/index.js";

/**
 * Renders items into the specified container.
 * This function populates the specified container with HTML content based on the provided data.
 * If the data array is empty, it displays a message indicating that no items are available.
 * If a loading message is provided, it displays the loading message while fetching data.
 * @param {Array} data - The array of items to render.
 * @param {string} containerSelector - The CSS selector for the container element where items will be rendered.
 * @param {string} [noItemsMessage] - The message to display when no items are available.
 * @param {string} [loadingMessage] - The message to display while loading items.
 */
export async function renderItems(
  data,
  containerSelector,
  noItemsMessage,
  loadingMessage,
) {
  const container = document.querySelector(containerSelector);
  container.innerHTML = "";

  if (loadingMessage) {
    const loadingDiv = document.createElement("div");
    loadingDiv.textContent = loadingMessage;
    container.appendChild(loadingDiv);
  }

  if (data.length === 0) {
    const noItemsDiv = document.createElement("div");
    noItemsDiv.className = "noItems container w-100 pt-3 ps-2";
    noItemsDiv.innerHTML = `<p>${noItemsMessage}</p>`;
    container.appendChild(noItemsDiv);
  } else {
    templates.renderListingTemplates(data, container);
  }
}
