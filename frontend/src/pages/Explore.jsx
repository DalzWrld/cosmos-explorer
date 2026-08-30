import { useState } from "react"
import { Search } from "lucide-react"
import { useLibrarySearch } from "@/hooks/useLibrarySearch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MediaTypeTabs } from "@/components/explore/MediaTypeTabs"
import { ResultCard } from "@/components/explore/ResultCard"
import { OrbitLoader } from "@/components/OrbitLoader"
import { ErrorState } from "@/components/ErrorState"

export function Explore() {
  const [query, setQuery] = useState("")
  const [mediaType, setMediaType] = useState(undefined)
  const { results, status, error, search } = useLibrarySearch()

  function handleSubmit(event) {
    event.preventDefault()
    search(query, mediaType)
  }

  function handleMediaTypeChange(next) {
    setMediaType(next)
    if (query.trim()) search(query, next)
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-5 py-10">
      <div className="space-y-1">
        <h1 className="font-display text-2xl font-semibold">Explore</h1>
        <p className="text-dust">What are you curious about?</p>
      </div>
    </div>
  )
}