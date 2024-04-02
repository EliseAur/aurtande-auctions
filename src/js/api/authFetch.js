import { load } from "../storage/index.js";

/**
 * Generates the headers for an authenticated request.
 *
 * @returns {Object} - An object containing the required headers.
 */
export function headers() {
  const token = load("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

/**
 * Performs an authenticated fetch with the provided URL and options.
 *
 * @param {string} url - The URL for the fetch request.
 * @param {Object} [options={}] - Additional options for the fetch request.
 * @returns {Promise<Response>} - A promise that resolves to the response from the fetch request.
 */
export async function authFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: headers(),
  });
}
