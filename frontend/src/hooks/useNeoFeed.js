import { useCallback, useState } from "react"
import { getNeoFeed } from "@/services/neoService"

export function useNeoFeed() {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState("idle") // idle | loading | success | error
  const [error, setError] = useState(null)
}