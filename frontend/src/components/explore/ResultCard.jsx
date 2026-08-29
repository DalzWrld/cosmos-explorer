import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

export function ResultCard({ item }) {
  return (
    <Link to={`/explore/${item.id}`} className="group block">
      <Card className="overflow-hidden transition-colors group-hover:border-nebula/50">
        <div className="aspect-square w-full overflow-hidden bg-panel-raised">
          {item.thumbnail && (
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
              loading="lazy"
            />
          )}
        </div>
      </Card>
    </Link>
  )
}