// import React, { useEffect, useState } from "react"
// import { Link, useNavigate, useParams } from "react-router-dom"
// import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react"
// import { toast } from "react-hot-toast"

// // export default function NoteDetailPage() {
// //   const [notes, setNotes] = useState(null)
// //   const [loading, setLoading] = useState(true)
// //   const [saving, setSaving] = useState(false)

// //   const navigate = useNavigate()

// //   const { id } = useParams()

// //   useEffect(() => {
// //     const fetchNote = async () => {
// //       try {
// //         const res = await api.get(`/notes/${id}`)
// //         setNotes(res.data)
// //       } catch (error) {
// //         toast.error("Failed to fecth nthe note")
// //       } finally {
// //         setLoading(false)
// //       }
// //     }
// //     fetchNote()
// //   }, [id])

// //   const handleDelete = async () => {
// //     if (!window.confirm("Are you sure you want to delete this note?")) return

// //     try {
// //       await api.delete(`/notes/${id}`)
// //       toast.success("Note deleted")
// //       navigate("/")
// //     } catch (error) {
// //       console.log("Error deleting the note:", error)
// //       toast.error("Failed to delete note")
// //     }
// //   }

// //   const handleSave = async () => {
// //     if (!notes.title.trim() || !notes.description.trim()) {
// //       toast.error("Please add a title or content")
// //       return
// //     }

// //     setSaving(true)

// //     try {
// //       await api.put(`/notes/${id}`, notes)
// //       toast.success("Note updated successfully")
// //       navigate("/")
// //     } catch (error) {
// //       console.log("Error saving the note:", error)
// //       toast.error("Failed to update note")
// //     } finally {
// //       setSaving(false)
// //     }
// //   }

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-base-200 flex items-center justify-center">
// //         <LoaderIcon className="animate-spin size-10" />
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="min-h-screen bg-base-200">
// //       <div className="container mx-auto px-4 py-8">
// //         <div className="max-w-2xl mx-auto">
// //           <div className="flex items-center justify-between mb-6">
// //             <Link to="/" className="btn btn-ghost">
// //               <ArrowLeftIcon className="h-5 w-5" />
// //               Back to Notes
// //             </Link>
// //             <button
// //               onClick={handleDelete}
// //               className="btn btn-error btn-outline"
// //             >
// //               <Trash2Icon className="h-5 w-5" />
// //               Delete Note
// //             </button>
// //           </div>

// //           <div className="card bg-base-100">
// //             <div className="card-body">
// //               <div className="form-control mb-4">
// //                 <label className="label">
// //                   <span className="label-text">Title</span>
// //                 </label>
// //                 <input
// //                   type="text"
// //                   placeholder="Note title"
// //                   className="input input-bordered"
// //                   value={notes.title}
// //                   onChange={(e) => setNotes({ ...note, title: e.target.value })}
// //                 />
// //               </div>

// //               <div className="form-control mb-4">
// //                 <label className="label">
// //                   <span className="label-text">Description</span>
// //                 </label>
// //                 <textarea
// //                   placeholder="Write your note here..."
// //                   className="textarea textarea-bordered h-32"
// //                   value={notes.description}
// //                   onChange={(e) =>
// //                     setNotes({ ...notes, description: e.target.value })
// //                   }
// //                 />
// //               </div>

// //               <div className="card-actions justify-end">
// //                 <button
// //                   className="btn btn-primary"
// //                   disabled={saving}
// //                   onClick={handleSave}
// //                 >
// //                   {saving ? "Saving..." : "Save Changes"}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// export default function NoteDetailPage() {
//   // State to store the note
//   const [note, setNote] = useState(null)

//   // Loading and saving indicators
//   const [loading, setLoading] = useState(true)
//   const [saving, setSaving] = useState(false)

//   // For routing
//   const navigate = useNavigate()
//   const { id } = useParams() // Get note ID from URL

//   // Fetch the note from the server
//   // useEffect(() => {
//   //   const fetchNote = async () => {
//   //     try {
//   //       const res = await api.get(`/notes/${id}`)
//   //       setNote(res.data) // ✅ Save the fetched note
//   //       console.log("Fetched note:", res.data)
//   //     } catch (error) {
//   //       toast.error("Failed to fetch the note")
//   //     } finally {
//   //       setLoading(false) // Stop loading in both success or failure
//   //     }
//   //   }

//   //   fetchNote()
//   // }, [id])
//   useEffect(() => {
//     const fetchNote = async () => {
//       try {
//         const response = await fetch(`http://localhost:5100/notes/${id}`)
//         if (!response.ok) {
//           throw new Error("Network response was not ok")
//         }
//         const data = await response.json()
//         setNote(data)
//         console.log("Fetched note:", data)
//       } catch (error) {
//         console.error("Fetch error:", error)
//       }
//     }
//     fetchNote()
//   }, [id])

//   // Handle deleting the note
//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this note?")) return

//     try {
//       await api.delete(`/notes/${id}`)
//       toast.success("Note deleted")
//       navigate("/") // Go back to home page
//     } catch (error) {
//       toast.error("Failed to delete note")
//     }
//   }

//   // Handle saving updated note
//   const handleSave = async () => {
//     // Prevent empty title or description
//     if (!note.title.trim() || !note.description.trim()) {
//       toast.error("Please add a title and description")
//       return
//     }

//     setSaving(true)

//     try {
//       const response = await fetch(`http://localhost:5100/api/notes/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(note),
//       })
//       if (!response.ok) throw new Error("Failed to update note")
//       toast.success("Note updated successfully")
//       navigate("/")
//     } catch (error) {
//       console.error("Error updating note:", error)
//       toast.error("Failed to update note")
//     } finally {
//       setSaving(false)
//     }
//   }

//   // Show loading spinner
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-base-200 flex items-center justify-center">
//         <LoaderIcon className="animate-spin size-10" />
//       </div>
//     )
//   }

//   // ✅ Make sure note exists before trying to render
//   if (!note) {
//     return (
//       <div className="min-h-screen bg-base-200 flex items-center justify-center">
//         <p className="text-lg text-red-500">Note not found.</p>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-base-200">
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-2xl mx-auto">
//           <div className="flex items-center justify-between mb-6">
//             <Link to="/" className="btn btn-ghost">
//               <ArrowLeftIcon className="h-5 w-5" />
//               Back to Notes
//             </Link>
//             <button
//               onClick={handleDelete}
//               className="btn btn-error btn-outline"
//             >
//               <Trash2Icon className="h-5 w-5" />
//               Delete Note
//             </button>
//           </div>

//           <div className="card bg-base-100">
//             <div className="card-body">
//               {/* Title Input */}
//               <div className="form-control mb-4">
//                 <label className="label">
//                   <span className="label-text">Title</span>
//                 </label>
//                 <input
//                   type="text"
//                   className="input input-bordered"
//                   value={note.title}
//                   onChange={(e) => setNote({ ...note, title: e.target.value })}
//                 />
//               </div>

//               {/* Description Input */}
//               <div className="form-control mb-4">
//                 <label className="label">
//                   <span className="label-text">Description</span>
//                 </label>
//                 <textarea
//                   className="textarea textarea-bordered h-32"
//                   value={note.description}
//                   onChange={(e) =>
//                     setNote({ ...note, description: e.target.value })
//                   }
//                 />
//               </div>

//               {/* Save Button */}
//               <div className="card-actions justify-end">
//                 <button
//                   className="btn btn-primary"
//                   disabled={saving}
//                   onClick={handleSave}
//                 >
//                   {saving ? "Saving..." : "Save Changes"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react"
import { toast } from "react-hot-toast"
import api from "../../lib/axios"

export default function NoteDetailPage() {
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const navigate = useNavigate()
  const { id } = useParams()

  // Fetch note by ID
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`http://localhost:5100/notes/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch note")
        }
        const data = await response.json()
        setNote(data)
        // const res = await api.get("/notes/${id}")
        // // axios stores the data in res.data
        // setNote(res.data)
        // console.log("Fetched note:", res.data)
      } catch (error) {
        console.error("Error fetching note:", error)
        toast.error("Could not load the note")
      } finally {
        setLoading(false)
      }
    }
    fetchNote()
  }, [id])

  // Delete note
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return

    try {
      const response = await fetch(`http://localhost:5100/api/notes/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete note")
      toast.success("Note deleted")
      navigate("/")
    } catch (error) {
      console.error("Error deleting note:", error)
      toast.error("Failed to delete note")
    }
  }

  // Save note
  const handleSave = async () => {
    if (!note.title.trim() || !note.description.trim()) {
      toast.error("Please enter a title and description")
      return
    }

    setSaving(true)
    try {
      const response = await fetch(`http://localhost:5100/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      })
      if (!response.ok) throw new Error("Failed to update note")
      toast.success("Note updated successfully")
      navigate("/")
    } catch (error) {
      console.error("Error updating note:", error)
      toast.error("Failed to update note")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    )
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <p className="text-lg text-red-500">Note not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="btn btn-outline gap-2 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Notes
          </Link>

          <button
            onClick={handleDelete}
            className="btn btn-outline btn-error gap-2 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Trash2Icon className="h-5 w-5" />
            Delete Note
          </button>
        </div>

        <div className="space-y-6">
          <div className="form-control">
            <label className="label font-semibold text-lg">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              className="input input-bordered input-lg shadow-sm focus:ring-2 focus:ring-primary transition-all"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-lg">
              <span className="label-text">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-40 text-base shadow-sm focus:ring-2 focus:ring-primary transition-all"
              value={note.description}
              onChange={(e) =>
                setNote({ ...note, description: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end">
            <button
              className="btn btn-primary btn-lg shadow-md hover:shadow-xl transition-all duration-300"
              disabled={saving}
              onClick={handleSave}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
