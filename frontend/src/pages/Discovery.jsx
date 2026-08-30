import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { getLibraryItem } from "@/services/libraryService"
import { Badge } from "@/components/ui/badge"
import { OrbitLoader } from "@/components/OrbitLoader"
import { ErrorState } from "@/components/ErrorState"

export function Discovery() {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [status, setStatus] = useState("loading")
  const [error, setError] = useState(null)

  useEffect(() => {
    setStatus("loading")
    getLibraryItem(id)
      .then((result) => {
        setItem(result)
        setStatus("success")
      })
      .catch((err) => {
        setError(err.message)
        setStatus("error")
      })
  }, [id])

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-5 py-10">
      <Link to="/explore" className="inline-flex items-center gap-1.5 text-sm text-dust hover:text-starlight">
        <ArrowLeft className="size-4" /> Back to Explore
      </Link>

      {status === "loading" && <OrbitLoader label="Loading discovery..." />}
      {status === "error" && <ErrorState message={error} />}

      {status === "success" && item && (
        <article className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-panel-border bg-panel">
            <img src={item.thumbnail} alt={item.title} className="w-full object-cover" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="nebula">{item.mediaType}</Badge>
            {item.dateCreated && <Badge>{item.dateCreated.slice(0, 10)}</Badge>}
            {item.center && <Badge>{item.center}</Badge>}
          </div>
          <h1 className="font-display text-2xl font-semibold">{item.title}</h1>
          <p className="leading-relaxed text-dust">{item.description}</p>
          {item.keywords?.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {item.keywords.map((keyword) => (
                <Badge key={keyword} variant="comet">
                  {keyword}
                </Badge>
              ))}
            </div>
          )}
        </article>
      )}
    </div>
  )
}