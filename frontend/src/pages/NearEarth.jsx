import { useEffect } from "react"
import { useNeoFeed } from "@/hooks/useNeoFeed"
import { DateRangeForm } from "@/components/neo/DateRangeForm"
import { NeoCard } from "@/components/neo/NeoCard"
import { OrbitLoader } from "@/components/OrbitLoader"
import { ErrorState } from "@/components/ErrorState"

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}
function addDaysISO(days) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString().slice(0, 10)
}

export function NearEarth() {
  const { data, status, error, search } = useNeoFeed()

  useEffect(() => {
    search(todayISO(), addDaysISO(6))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}