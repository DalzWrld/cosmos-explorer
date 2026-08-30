import { apiRequest } from "./httpClient"

const BASE_URL = "https://api.nasa.gov/neo/rest/v1/feed"
const API_KEY = import.meta.env.VITE_NASA_API_KEY || "DEMO_KEY"

/**
 * Fetch near-Earth objects for a date range (max 7 days per NASA's limit).
 * @param {string} startDate - YYYY-MM-DD
 * @param {string} endDate - YYYY-MM-DD
 */

export async function getNeoFeed(startDate, endDate) {
  const params = new URLSearchParams({
    start_date: startDate,
    end_date: endDate,
    api_key: API_KEY,
  })

  const data = await apiRequest(`${BASE_URL}?${params.toString()}`)
}