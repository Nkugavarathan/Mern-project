import React, { useState } from "react"
import Navbar from "../components/Navbar"
import RateLimitedUI from "./../components/RateLimitedUI"

export default function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(false)
  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}
    </div>
  )
}
