import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { getLibraryItem } from "@/services/libraryService"
import { Badge } from "@/components/ui/badge"
import { OrbitLoader } from "@/components/OrbitLoader"
import { ErrorState } from "@/components/ErrorState"

export function Discovery() {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [status, setStatus] = useState("loading")
  const [error, setError] = useState(null)

  useEffect(() => {
    setStatus("loading")
    getLibraryItem(id)
      .then((result) => {
        setItem(result)
        setStatus("success")
      })
      .catch((err) => {
        setError(err.message)
        setStatus("error")
      })
  }, [id])
}