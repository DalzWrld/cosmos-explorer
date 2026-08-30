import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

function addDaysISO(days) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString().slice(0, 10)
}

export function DateRangeForm({ onSearch }) {
  const [startDate, setStartDate] = useState(todayISO())
  const [endDate, setEndDate] = useState(addDaysISO(6))

  function handleSubmit(event) {
    event.preventDefault()
    onSearch(startDate, endDate)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="start-date" className="text-xs text-dust">
          From
        </label>
        <Input
          id="start-date"
          type="date"
          value={startDate}
          max={endDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
    </form>
  )
}