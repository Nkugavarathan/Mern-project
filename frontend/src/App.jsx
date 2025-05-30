import React from "react"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import NoteDetailPage from "./pages/NoteDetailPage"
// import { Toaster, toast } from "react-hot-toast"

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
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/notes/:id" element={<NoteDetailPage />} />
        </Routes>
      </div>
    </>
  )
}
