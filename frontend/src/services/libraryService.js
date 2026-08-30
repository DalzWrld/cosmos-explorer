import { apiRequest } from "./httpClient"

const BASE_URL = "https://images-api.nasa.gov/search"

/**
 * Search NASA's Image & Video Library. No API key required.
 * @param {string} query
 * @param {"image"|"video"|"audio"} [mediaType]
 */

export async function searchLibrary(query, mediaType) {
  const params = new URLSearchParams({ q: query })
  if (mediaType) params.set("media_type", mediaType)

  const data = await apiRequest(`${BASE_URL}?${params.toString()}`)
  return (data.collection?.items || []).map((item) => {
    const info = item.data?.[0] || {}
    return {
      id: info.nasa_id,
      title: info.title,
      description: info.description,
      dateCreated: info.date_created,
      mediaType: info.media_type,
      center: info.center,
      thumbnail: item.links?.[0]?.href,
    }
  })
}

/** Fetch full asset detail (used by the discovery detail page). */
export async function getLibraryItem(nasaId) {
  const data = await apiRequest(
    `https://images-api.nasa.gov/search?nasa_id=${encodeURIComponent(nasaId)}`
  )
  const item = data.collection?.items?.[0]
  if (!item) throw new Error("Discovery not found.")

  const info = item.data?.[0] || {}
  return {
    id: info.nasa_id,
    title: info.title,
    description: info.description,
    dateCreated: info.date_created,
    mediaType: info.media_type,
    center: info.center,
    keywords: info.keywords || [],
    thumbnail: item.links?.[0]?.href,
  }
}