import { apiRequest } from "./httpClient"

// NASA retired the old api.nasa.gov/planetary/apod endpoint (it started
// intermittently 500ing in Sept 2026 after apod.nasa.gov moved to
// science.nasa.gov/apod, and is scheduled for full shutdown Dec 1, 2026).
// This is NASA's replacement endpoint: no API key needed, no quota.
const BASE_URL = "https://science.nasa.gov/wp-json/wp/v2/apod-basic"

// Converts the API's raw WordPress-shaped response into the simple shape
// the rest of the app expects (same field names Phase 1 was built around,
// so ApodHero only needs a small update rather than a rewrite).
function normalizeApod(raw) {
  const stripHtml = (html) => {
    if (!html) return ""
    const parsed = new DOMParser().parseFromString(html, "text/html")
    return parsed.documentElement.textContent.trim()
  }

  return {
    date: raw.date,
    title: raw.title,
    explanation: stripHtml(raw.explanation),
    media_type: raw.media_type,
    url: raw.hdurl || raw.url,
    hdurl: raw.hdurl,
    permalink: raw.permalink,
    copyright: stripHtml(raw.credit || raw.copyright),
  }
}

/**
 * Fetch the Astronomy Picture of the Day.
 * @param {string} [date] - YYYY-MM-DD. Defaults to today when omitted.
 */
export async function getApod(date) {
  if (date) {
    // The new endpoint takes dates as YYMMDD in the URL path, not a query param.
    const yymmdd = date.replace(/-/g, "").slice(2)
    const raw = await apiRequest(`${BASE_URL}/${yymmdd}`)
    return normalizeApod(raw)
  }

  const [raw] = await apiRequest(`${BASE_URL}?per_page=1`)
  return normalizeApod(raw)
}