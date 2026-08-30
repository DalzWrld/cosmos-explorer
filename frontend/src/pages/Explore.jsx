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
}