import { Link } from "react-router-dom"
import { useApod } from "@/hooks/useApod"
import { ApodHero } from "@/components/apod/ApodHero"
import { OrbitLoader } from "@/components/OrbitLoader"
import { ErrorState } from "@/components/ErrorState"

const pillars = ["Discover", "Explore", "Understand", "Remember"]

export function Home() {
  const { data: apod, status, error } = useApod()
}