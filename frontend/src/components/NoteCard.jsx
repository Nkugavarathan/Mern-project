import React from "react"
import { Link } from "react-router-dom"
import { formatDate } from "../../lib/utils"
import { toast } from "react-hot-toast"
export default function NoteCard({ note, setNotes }) {
  const handleDelete = async (e, id) => {
    e.preventDefault() // get rid of the navigation behavior // we put entire card for Link so click that card go to createpage but that delete btn also click go to create page thats problem so e.preventDefault()   prevented that
    if (!window.confirm("Are you sure ")) {
      return
    }

    try {
      await api.delete(`/notes/${id}`)
      setNotes((prev) => prev.filter((note) => note._id !== id)) // get rid of the deleted one
      toast.success("Note Delete successfully")
    } catch (error) {
      toast.error("failed to delete")
    }
  }

  return (
    <div>
      <Link
        to={`/note/${note._id}`}
        className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 boder-solid border-[#00ff9d]"
      >
        <div className="card-body">
          <h3 className="card-title text-base-content">{note.title}</h3>
          <p className="text-base-content/70 line-clamp-3">
            {note.description}
          </p>
          <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">
              {formatDate(new Date(note.createdAt()))}
            </span>
            <div className="flex items-center gap-4">
              <PenSquareIcon className="size-4" />
              <button
                className="btn btn-ghost btn-xs text-error"
                onClick={(e) => handleDelete(e, note._id)}
              >
                <Trash2Icon className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
