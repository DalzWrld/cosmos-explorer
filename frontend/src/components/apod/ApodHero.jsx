import { Badge } from "@/components/ui/badge"

export function ApodHero({ apod }) {
  const isVideo = apod.media_type === "video"

  return (
    <div className="overflow-hidden rounded-2xl border border-panel-border bg-panel">
      <div className="aspect-video w-full bg-panel-raised">
        {isVideo ? (
          <iframe
            src={apod.url}
            title={apod.title}
            className="h-full w-full"
            allowFullScreen
          />
        ) : (
          <img
            src={apod.hdurl || apod.url}
            alt={apod.title}
            className="h-full w-full object-cover"
            loading="eager"
          />
        )}
      </div>
    </div>
  )
}