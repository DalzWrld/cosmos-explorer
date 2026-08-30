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

      <div className="space-y-3 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="nebula">Astronomy Picture of the Day</Badge>
          <Badge>{apod.date}</Badge>
          {apod.copyright && <Badge>&copy; {apod.copyright}</Badge>}
        </div>
        <h1 className="font-display text-2xl font-semibold text-starlight sm:text-3xl">
          {apod.title}
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-dust sm:text-base">
          {apod.explanation}
        </p>
      </div>
    </div>
  )
}