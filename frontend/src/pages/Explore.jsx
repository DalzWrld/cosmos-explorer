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

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-dust" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the NASA collection..."
            className="pl-9"
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      <MediaTypeTabs value={mediaType} onChange={handleMediaTypeChange} />

      {status === "idle" && (
        <p className="py-16 text-center text-dust">
          Try &ldquo;Nebula&rdquo;, &ldquo;Artemis&rdquo;, or &ldquo;Saturn&rdquo; to get started.
        </p>
      )}
      {status === "loading" && <OrbitLoader label="Searching the archive" />}
      {status === "error" && <ErrorState message={error} onRetry={() => search(query, mediaType)} />}
      {status === "empty" && (
        <p className="py-16 text-center text-dust">
          No results for &ldquo;{query}&rdquo;. Try a different term.
        </p>
      )}
    </div>
  )
}