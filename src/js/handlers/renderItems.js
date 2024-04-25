import * as templates from "../templates/index.js";

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
