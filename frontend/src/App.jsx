import React from "react"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import NoteDetailPage from "./pages/NoteDetailPage"
// import { Toaster, toast } from "react-hot-toast"

import Navbar from "./components/Navbar"
export default function App() {
  return (
    //     Add Toaster to render the toast notifications
    //     <Toaster />
    //     {/* A sample button to trigger a toast */}
    //     /* <button
    //       onClick={() => toast.success("Successfully!")}
    //       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    //     >
    //       Clickme
    //     </button> */
    //     /* <div className="p-4">
    //       <button className="btn btn-primary">DaisyUI Button</button>
    //     </div> */
    //     /* <h1 class="text-3xl font-bold underline">
    //   Hello world!
    // </h1> */

    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}
