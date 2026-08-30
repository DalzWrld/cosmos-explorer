import { useCallback, useState } from "react"
import { getNeoFeed } from "@/services/neoService"

export function useNeoFeed() {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState("idle") // idle | loading | success | error
  const [error, setError] = useState(null)

  const search = useCallback((startDate, endDate) => {
    setStatus("loading")
    getNeoFeed(startDate, endDate)
      .then((result) => {
        setData(result)
        setStatus("success")
      })
      .catch((err) => {
        setError(err.message)
        setStatus("error")
      })
  }, [])

  return { data, status, error, search }
}