import React from "react"
import { Link } from "react-router-dom"
import { PlusIcon } from "lucide-react"

export default function Navbar() {
  return (
    <div>
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-6xl p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-primary">Note App</h1>
            <Link to="/create" className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </header>
    </div>
  )
}
