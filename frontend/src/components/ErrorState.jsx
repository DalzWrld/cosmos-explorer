import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-hazard/30 bg-hazard/5 px-6 py-12 text-center">
      <AlertTriangle className="size-6 text-hazard" aria-hidden="true" />
      <p className="max-w-sm text-sm text-starlight">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  )
}