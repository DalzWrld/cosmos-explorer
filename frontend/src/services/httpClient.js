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