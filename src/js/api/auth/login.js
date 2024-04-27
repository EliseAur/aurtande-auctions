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

  if (response.ok) {
    const { accessToken, ...user } = await response.json();
    storage.save("token", accessToken);
    storage.save("profile", user);
    storage.save("userName", user.name);

    alert("You are now logged in");
    window.location.href = "../../listings-member/index.html";
  } else {
    if (response.status === 401) {
      alert(
        "Invalid credentials or you are not registered. Please check your email and password or register before logging in.",
      );
    } else {
      // Handle other error cases
      console.error("Error logging in:", response.statusText);
      alert("An error occurred while logging in. Please try again later.");
    }
  }
}

// const { accessToken, ...user } = await response.json();
// storage.save("token", accessToken);
// storage.save("profile", user);
// storage.save("userName", user.name);

// alert("You are now logged in");
// window.location.href = "../../listings-member/index.html";
