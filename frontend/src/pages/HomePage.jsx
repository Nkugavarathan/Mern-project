import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import RateLimitedUI from "./../components/RateLimitedUI"
import toast from "react-hot-toast"
import axios from "axios"
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
      <h1>My Notes</h1>
      {notes.map((note) => (
        <div key={note._id}>
          <h1>
            <strong> {note.title}</strong>
          </h1>
          <p>{note.description}</p>
        </div>
      ))}
      {isRateLimited && <RateLimitedUI />}
    </div>
  )
}
