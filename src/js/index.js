import * as listeners from "./handlers/index.js";
import * as profileMethods from "./api/account/index.js";
// import { getProfile } from "./api/auth/profile.js";

/**
 * Sets up routing behavior and initializes event listeners based on the current URL path.
 * This function ensures that the appropriate listeners and actions are executed for each page.
 * If the current path does not match any predefined cases, no specific actions are taken.
 *
 * @returns {void}
 *
 * @example
 * // Example usage:
 * // This function is typically called once when the application starts to set up the initial state.
 * setupRoutingAndListeners();
 */
function setupRoutingAndListeners() {
  switch (location.pathname) {
    case "/pages/account/login/":
    case "/pages/account/login/index.html":
    case "/aurtande-auctions/pages/account/login/":
    case "/aurtande-auctions/pages/account/login/index.html":
      listeners.setLoginFormListener();
      break;
    case "/pages/account/register/":
    case "/pages/account/register/index.html":
    case "/aurtande-auctions/pages/account/register/":
    case "/aurtande-auctions/pages/account/register/index.html":
      listeners.setRegisterFormListener();
      break;
    case "/":
    case "/index.html":
    case "/aurtande-auctions/index.html":
      listeners.renderListings();
      break;
    case "/pages/listings-member/":
    case "/pages/listings-member/index.html":
    case "/aurtande-auctions/pages/listings-member/":
    case "/aurtande-auctions/pages/listings-member/index.html":
      listeners.renderListings();
      listeners.setLogoutFormListener();
      break;
    case "/pages/listing/":
    case "/pages/listing/index.html":
    case "/aurtande-auctions/pages/listing/":
    case "/aurtande-auctions/pages/listing/index.html":
      listeners.renderListingDetails();
      break;
    case "/pages/listing-member/":
    case "/pages/listing-member/index.html":
    case "/aurtande-auctions/pages/listing-member/":
    case "/aurtande-auctions/pages/listing-member/index.html":
      listeners.renderListingDetails();
      listeners.setLogoutFormListener();
      break;
    case "/pages/listing-member/create/":
    case "/pages/listing-member/create/index.html":
    case "/aurtande-auctions/pages/listing-member/create/":
    case "/aurtande-auctions/pages/listing-member/create/index.html":
      listeners.setLogoutFormListener();
      listeners.setCreateListingFormListener();
      break;
    case "/pages/account/":
    case "/pages/account/index.html":
    case "/aurtande-auctions/pages/account/":
    case "/aurtande-auctions/pages/account/index.html":
      listeners.setLogoutFormListener();
      listeners.renderProfileDetails();
      listeners.renderProfileListings();
      listeners.renderProfileBidsLead();
      listeners.renderProfileBidsNoLead();
      listeners.renderProfileWins();
      // profileMethods.getBidsILeadAmount();
      profileMethods.getBidsIWinAmount();
      profileMethods.getMySellingAmount();
      profileMethods.getProfileCredits();
      profileMethods.calcCurrentCredits();
      break;
    case "/pages/account/edit/":
    case "/pages/account/edit/index.html":
    case "/aurtande-auctions/pages/account/edit/":
    case "/aurtande-auctions/pages/account//edit/index.html":
      listeners.setUpdateProfileFormListener();
      break;
    case "/pages/listing-member/edit/":
    case "/pages/listing-member/edit/index.html":
    case "/aurtande-auctions/pages/listing-member/edit/":
    case "/aurtande-auctions/pages/listing-member/edit/index.html":
      listeners.setLogoutFormListener();
      listeners.setUpdateListingFormListener();
      break;

    default:
  }
}

setupRoutingAndListeners();
