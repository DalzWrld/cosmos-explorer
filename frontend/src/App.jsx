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
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/:id" element={<Discovery />} />
          <Route path="/near-earth" element={<NearEarth />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
