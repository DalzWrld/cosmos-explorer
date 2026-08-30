import { Link } from "react-router-dom"
import { useApod } from "@/hooks/useApod"
import { ApodHero } from "@/components/apod/ApodHero"
import { OrbitLoader } from "@/components/OrbitLoader"
import { ErrorState } from "@/components/ErrorState"

const pillars = ["Discover", "Explore", "Understand", "Remember"]

export function Home() {
  const { data: apod, status, error } = useApod()

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-5 py-10">
      <div className="space-y-4 text-center">
        <div className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-comet">
          {pillars.map((pillar, i) => (
            <span key={pillar} className="flex items-center gap-2">
              {pillar}
              {i < pillars.length - 1 && <span className="text-dust">&rarr;</span>}
            </span>
          ))}
        </div>
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">
          Discover what&rsquo;s beyond our world.
        </h1>
        <p className="mx-auto max-w-xl text-dust">
          Space is complicated. Exploring it doesn&rsquo;t have to be.
        </p>
      </div>

      {status === "loading" && <OrbitLoader label="Pulling today's discovery" />}
      {status === "error" && <ErrorState message={error} />}
      {status === "success" && apod && <ApodHero apod={apod} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/explore"
          className="group rounded-xl border border-panel-border bg-panel p-5 transition-colors hover:border-nebula/50"
        >
          <p className="font-display font-semibold text-starlight group-hover:text-nebula-soft">
            Explore the archive &rarr;
          </p>
          <p className="mt-1 text-sm text-dust">
            Search NASA&rsquo;s image and video library for anything that catches your curiosity.
          </p>
        </Link>
      </div>
    </div>
  )
}