import { cn } from "@/lib/utils"

const options = [
  { value: undefined, label: "All" },
  { value: "image", label: "Images" },
  { value: "video", label: "Videos" },
  { value: "audio", label: "Audio" },
]

export function MediaTypeTabs({ value, onChange }) {
    return (
        <div className="inline-flex gap-1 rounded-lg border border-panel-border bg-panel p-1">
          {options.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => onChange(option.value)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium text-dust transition-colors",
                value === option.value && "bg-panel-raised text-starlight"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
    )
}