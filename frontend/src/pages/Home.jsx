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
    </div>
  )
}