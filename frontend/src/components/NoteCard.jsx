import React from "react"
import { Link } from "react-router-dom"
import { formatDate } from "../../lib/utils"
import { toast } from "react-hot-toast"
import { PenSquareIcon, Trash2Icon } from "lucide-react"
import api from "../../lib/axios"

export default function NoteCard({ note, setNotes }) {
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete")) return

    try {
      await api.delete(`/notes/${id}`)
      setNotes((prev) => prev.filter((note) => note._id !== id))
      toast.success("Note deleted successfully")
    } catch (error) {
      console.error("DELETE ERROR:", error)
      toast.error("Failed to delete")
    }
  }

  return (
    <div className="bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 rounded-xl shadow-lg border-t-4 border-orange-400 transition-all duration-300 hover:shadow-2xl">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-orange-900 mb-2">
          {note.title}
        </h3>
        <p className="text-orange-800/80 text-sm line-clamp-3">
          {note.description}
        </p>

        <div className="flex justify-between items-center mt-6 text-orange-700">
          <span className="text-xs">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-4">
            <Link
              to={`/notes/${note._id}`}
              className="hover:text-orange-900 transition-colors"
            >
              <PenSquareIcon className="w-4 h-4" />
            </Link>
            <button
              onClick={() => handleDelete(note._id)}
              className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
            >
              <Trash2Icon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
