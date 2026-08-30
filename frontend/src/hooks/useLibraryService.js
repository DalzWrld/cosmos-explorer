import { useCallback, useState } from "react"
import { searchLibrary } from "@/services/libraryService"

export function useLibrarySearch() {
  const [results, setResults] = useState([])
  const [status, setStatus] = useState("idle") // idle | loading | success | error | empty
  const [error, setError] = useState(null)
}