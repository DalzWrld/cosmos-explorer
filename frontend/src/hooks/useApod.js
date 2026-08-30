import { useEffect, useState } from "react"
import { getApod } from "@/services/apodService"

export function useApod(date) {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState("loading") // loading | success | error
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setStatus("loading")

    getApod(date)
      .then((result) => {
        if (cancelled) return
        setData(result)
        setStatus("success")
      })
  }, [date])
}