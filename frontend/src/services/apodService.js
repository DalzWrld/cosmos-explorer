import { apiRequest } from "./httpClient"

const BASE_URL = "https://api.nasa.gov/planetary/apod"
const API_KEY = import.meta.env.VITE_NASA_API_KEY || "DEMO_KEY"

/**
 * Fetch the Astronomy Picture of the Day.
 * @param {string} [date] - YYYY-MM-DD. Defaults to today when omitted.
 */
export async function getApod(date) {
  const params = new URLSearchParams({ api_key: API_KEY })
  if (date) params.set("date", date)

  return apiRequest(`${BASE_URL}?${params.toString()}`)
}