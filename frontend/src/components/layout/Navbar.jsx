import { NavLink } from "react-router-dom"
import { Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

const links = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore" },
  { to: "/near-earth", label: "Near-Earth" },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-panel-border bg-void/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <NavLink to="/" className="flex items-center gap-2 font-display text-lg font-semibold">
          <Rocket className="size-5 text-nebula-soft" aria-hidden="true" />
          Cosmos Explorer
        </NavLink>
      </div>
    </header>
  )
}