import React from "react"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import NoteDetailPage from "./pages/NoteDetailPage"
import { Toaster, toast } from "react-hot-toast"

export default function App() {
  return (
    <div>
      {/* Add Toaster to render the toast notifications */}
      <Toaster />

      {/* A sample button to trigger a toast */}

      <button
        onClick={() => toast.success("Successfully!")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Clickme
      </button>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}
