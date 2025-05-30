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

  // fetch vs axios

  // // Fetch note by ID
  // useEffect(() => {
  //   const fetchNote = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:5100/notes/${id}`)
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch note")
  //       }
  //       const data = await response.json()
  //       setNote(data)
  //       // const res = await api.get("/notes/${id}")
  //       // // axios stores the data in res.data
  //       // setNote(res.data)
  //       // console.log("Fetched note:", res.data)
  //     } catch (error) {
  //       console.error("Error fetching note:", error)
  //       toast.error("Could not load the note")
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   fetchNote()
  // }, [id])

  // // Delete note
  // const handleDelete = async () => {
  //   if (!window.confirm("Are you sure you want to delete this note?")) return

  //   try {
  //     const response = await fetch(`http://localhost:5100/api/notes/${id}`, {
  //       method: "DELETE",
  //     })
  //     if (!response.ok) throw new Error("Failed to delete note")
  //     toast.success("Note deleted")
  //     navigate("/")
  //   } catch (error) {
  //     console.error("Error deleting note:", error)
  //     toast.error("Failed to delete note")
  //   }
  // }

  // // Save note
  // const handleSave = async () => {
  //   if (!note.title.trim() || !note.description.trim()) {
  //     toast.error("Please enter a title and description")
  //     return
  //   }

  //   setSaving(true)
  //   try {
  //     const response = await fetch(`http://localhost:5100/api/notes/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(note),
  //     })
  //     if (!response.ok) throw new Error("Failed to update note")
  //     toast.success("Note updated successfully")
  //     navigate("/")
  //   } catch (error) {
  //     console.error("Error updating note:", error)
  //     toast.error("Failed to update note")
  //   } finally {
  //     setSaving(false)
  //   }
  // }

  // ✅ Fetch note by ID
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
        console.log("Datassssss", res.data)
        /*
        Datassssss {_id: '6839af3d73d666ed97b7d8fc', title: '.m.mk', description: ',ll;', image: 'sdfs', createdAt: '2025-05-30T13:14:37.810Z', …}
         */
      } catch (error) {
        console.error("Error fetching note:", error)
        toast.error("Could not load the note")
      } finally {
        setLoading(false)
      }
    }
    fetchNote()
  }, [id])

  // ✅ Handle Delete
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return

    try {
      await api.delete(`/notes/${id}`)
      toast.success("Note deleted")
      navigate("/")
    } catch (error) {
      console.error("Error deleting note:", error)
      toast.error("Failed to delete note")
    }
  }

  // ✅ Handle Save
  const handleSave = async () => {
    if (!note.title.trim() || !note.description.trim()) {
      toast.error("Please enter a title and description")
      return
    }

    setSaving(true)
    try {
      await api.put(`/notes/${id}`, note)
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
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <Link
          to="/"
          className="inline-flex items-center text-primary mb-6 hover:underline"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back to Notes
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
            ✏️ Edit Note
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSave()
            }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Title
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter note title"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Content
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-xl shadow-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Write your note content..."
                value={note.description}
                onChange={(e) =>
                  setNote({ ...note, description: e.target.value })
                }
              />
            </div>

            <div className="flex justify-between items-center gap-4 pt-2">
              <button
                type="button"
                onClick={handleDelete}
                className="w-1/2 text-red-600 border border-red-300 hover:bg-red-50 py-2 px-4 rounded-xl shadow-sm transition-all cursor-pointer"
              >
                🗑️ Delete
              </button>

              <button
                type="submit"
                disabled={saving}
                className="w-1/2 bg-primary text-white py-2 px-4 rounded-xl hover:bg-primary-focus transition-all duration-200 shadow-md cursor-pointer "
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
