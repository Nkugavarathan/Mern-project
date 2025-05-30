import api from "../../lib/axios"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"

export default function CreatePage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  cosnt[(loading, setLoading)] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim() || !description.trim()) {
      toast.error("All fields are require")
      return
    }
    setLoading(true)

    try {
      await api.post("/notes", {
        title,
        description,
        image,
      })
      toast.success("Note created successfully")
      navigate("/")
    } catch (error) {
      console.log("error")

      if (error.response.status === 429) {
        toast.error("Slow down you are createing notes too fast", {
          duration: 5000,
          icon: "😠",
        })
      } else {
        toast.error("Error")
      }
    }
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    placeholder="Note Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-32"
                    placeholder="Write your note here ...."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Image </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    placeholder="Note Title"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "creating....." : "Created.."}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
