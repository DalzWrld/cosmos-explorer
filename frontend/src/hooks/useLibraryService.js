import { useCallback, useState } from "react"
import { searchLibrary } from "@/services/libraryService"

export function useLibrarySearch() {
  const [results, setResults] = useState([])
  const [status, setStatus] = useState("idle") // idle | loading | success | error | empty
  const [error, setError] = useState(null)

  // Deliberately called on submit, not per keystroke, per NASA's rate-limit plan.
  const search = useCallback((query, mediaType) => {
    if (!query.trim()) return
    setStatus("loading")

    searchLibrary(query, mediaType)
      .then((items) => {
        setResults(items)
        setStatus(items.length === 0 ? "empty" : "success")
      })
      .catch((err) => {
        setError(err.message)
        setStatus("error")
      })
  }, [])

  return { results, status, error, search }
}