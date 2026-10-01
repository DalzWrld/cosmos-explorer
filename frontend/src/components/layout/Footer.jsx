import { Copyright } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-auto border-t border-panel-border">
      <div className="mx-auto max-w-6xl px-5 py-6 text-sm text-dust sm:py-8 sm:px-6 lg:px-8 flex sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-1.5">
          <Copyright size={11} /> {new Date().getFullYear()} Ian. All rights reserved.
        </p>
        <p>
          Cosmos Explorer runs on public NASA APIs (APOD, NeoWs, Image &amp;
          Video Library).
        </p>
      </div>
    </footer>
  )
}