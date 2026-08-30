import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function formatNumber(value) {
  return Number(value).toLocaleString(undefined, { maximumFractionDigits: 1 })
}

export function NeoCard({ neo }) {
  const approach = neo.close_approach_data[0]
  const diameter = neo.estimated_diameter.meters
  const isHazardous = neo.is_potentially_hazardous_asteroid

  return (
    <Card
      className={
        isHazardous ? "border-l-4 border-l-hazard" : "border-l-4 border-l-panel-border"
      }
    >
      <CardHeader className="flex-row items-start justify-between gap-2 space-y-0">
        <CardTitle className="text-base">{neo.name.replace(/[()]/g, "")}</CardTitle>
        <Badge variant={isHazardous ? "hazard" : "comet"}>
          {isHazardous ? "Potentially hazardous" : "Not hazardous"}
        </Badge>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-3 font-mono text-xs text-dust sm:grid-cols-4">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-dust/70">Diameter</p>
          <p className="text-starlight">
            {formatNumber(diameter.estimated_diameter_min)}&ndash;
            {formatNumber(diameter.estimated_diameter_max)} m
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wide text-dust/70">Velocity</p>
          <p className="text-starlight">
            {formatNumber(approach.relative_velocity.kilometers_per_hour / 3600)} km/s
          </p>
        </div>
      </CardContent>
    </Card>
  )
}