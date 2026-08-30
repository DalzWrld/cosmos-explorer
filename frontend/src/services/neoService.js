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

  // NASA nests results by date; flatten into one sorted list for the UI.
  const objects = Object.values(data.near_earth_objects || {}).flat()
  objects.sort(
    (a, b) =>
      new Date(a.close_approach_data[0]?.close_approach_date) -
      new Date(b.close_approach_data[0]?.close_approach_date)
  )

  return { objects, elementCount: data.element_count ?? objects.length }
}