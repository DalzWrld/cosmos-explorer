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

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-5 py-10">
      <div className="space-y-1">
        <h1 className="font-display text-2xl font-semibold">Near-Earth Objects</h1>
        <p className="text-dust">What came close to Earth this week?</p>
      </div>
    </div>
  )
}