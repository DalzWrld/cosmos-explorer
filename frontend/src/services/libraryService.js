import { apiRequest } from "./httpClient"

const BASE_URL = "https://images-api.nasa.gov/search"

/**
 * Search NASA's Image & Video Library. No API key required.
 * @param {string} query
 * @param {"image"|"video"|"audio"} [mediaType]
 */