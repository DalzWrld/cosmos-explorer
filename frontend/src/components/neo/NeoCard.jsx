import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function formatNumber(value) {
  return Number(value).toLocaleString(undefined, { maximumFractionDigits: 1 })
}

export function NeoCard({ neo }) {}