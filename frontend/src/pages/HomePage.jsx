import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import RateLimitedUI from "./../components/RateLimitedUI"
import toast from "react-hot-toast"
import axios from "axios"
import NoteCard from "../components/NoteCard"
export default function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   const fetchNotes = async () => {
  //     try {
  //       const res = await fetch("http://localhost:5100/api/notes")
  //       const data = await res.json()
  //       console.log(data)
  //     } catch (error) {
  //       console.log("error fetching data")
  //     }
  //   }

  //   fetchNotes()
  // })

  //useing axios
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5100/api/notes")
        console.log(res.data) // axios stores the data in res.data
        setNotes(res.data)
        setIsRateLimited(false)
      } catch (error) {
        console.error("Error fetching notes:", error.message)
        if (error.response.status === 429) {
          setIsRateLimited(true)
        } else {
          toast.error("Error")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading Notes...</div>
        )}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        )}
      </div>

      {isRateLimited && <RateLimitedUI />}
    </div>
  )
}
