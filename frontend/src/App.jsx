import { Routes, Route } from "react-router-dom"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Home } from "@/pages/Home"
import { Explore } from "@/pages/Explore"
import { Discovery } from "@/pages/Discovery"
import { NearEarth } from "@/pages/NearEarth"

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Footer />
    </div>
  )
}

export default App
