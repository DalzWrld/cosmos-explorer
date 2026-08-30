// Shared fetch wrapper used by every service module.
// Keeping this in one place means when Phase 2 swaps NASA calls for our own
// Flask API, only this file (and the base URLs in each service) needs to change.

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}

export async function apiRequest(url, options = {}) {
  let response
  try {
    response = await fetch(url, options)
  } catch (networkError) {
    throw new ApiError(
      "Couldn't reach the server. Check your connection and try again.",
      0
    )
  }
}