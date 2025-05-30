import api from "../../lib/axios"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeftIcon } from "lucide-react"

export default function CreatePage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  // const image = "sdfs"

  const navigate = useNavigate()

  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   if (!title.trim() || !description.trim()) {
  //     toast.error("All fields are require")
  //     return
  //   }
  //   setLoading(true)

  //   try {
  //     await api.post("/notes", {
  //       title,
  //       description,
  //       image,
  //     })
  //     // console.log({ title, description, image })

  //     toast.success("Note created successfully")
  //     navigate("/")
  //   } catch (error) {
  //     console.log("error")

  //     if (error.response.status === 429) {
  //       toast.error("Slow down you are createing notes too fast", {
  //         duration: 5000,
  //         icon: "😠",
  //       })
  //     } else {
  //       toast.error("Error")
  //     }
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim() || !description.trim()) {
      toast.error("All fields are required")
      return
    }
    if (!image) {
      toast.error("Please upload an image")
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)

      formData.append("image", image)

      await api.post("/notes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      toast.success("Note created successfully")
      navigate("/")
    } catch (error) {
      console.error(error)

      if (error.response?.status === 429) {
        toast.error("Slow down, you're creating notes too fast", {
          duration: 5000,
          icon: "😠",
        })
      } else {
        toast.error("Error creating note")
      }
    } finally {
      setLoading(false)
    }
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
            📝 Create a New Note
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Title
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Content
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-xl shadow-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Write your note here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Future enhancement: Image URL input field */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-2 px-4 rounded-xl text-lg hover:bg-primary-focus transition-all duration-200 shadow-md cursor-pointer"
              >
                {loading ? "Creating..." : "Create Note"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
