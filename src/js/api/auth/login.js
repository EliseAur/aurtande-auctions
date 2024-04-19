import { API_AUCTION_URL } from "../constants.js";
import * as storage from "../../storage/index.js";

const action = "/auth/login";
const method = "post";

export async function login(profile) {
  const loginURL = API_AUCTION_URL + action;
  console.log("This is the login URL", loginURL);

  const body = JSON.stringify(profile);
  console.log(body);

  const response = await fetch(loginURL, {
    headers: {
      "Content-type": "application/json",
    },
    method,
    body,
  });

  const { accessToken, ...user } = await response.json();
  storage.save("token", accessToken);
  storage.save("profile", user);
  storage.save("userName", user.name);
  storage.save("credits", user.credits);

  alert("You are now logged in");
  window.location.href = "../../listings-member/index.html";
}
