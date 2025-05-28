// Handle logic for each route (create, read, update, delete).

import Note from "../models/Note.js"
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find()
    res.status(200).json(notes)
  } catch (error) {
    console.error("Error in getAllnotes controllers", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export const createNote = async (req, res) => {
  try {
    // destruct panni edukuram req.body la varathu objects format la irukum {"title":"sdfsdf","description":"sdsdf"}
    const { title, description, image } = req.body // req.body in Express refers to the body of the incoming HTTP request — specifically the data that is sent by the client (e.g., Postman, a React frontend, etc.) in a POST, PUT, or PATCH request.
    const newNote = new Note({ title, description, image })
    const note = await newNote.save()
    return res.status(201).json(note)
  } catch (error) {
    console.error("Error in ceatenotes controllers", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
export const upadateNote = async (req, res) => {
  try {
    const { title, description, image } = req.body // req.body in Express refers to the body of the incoming HTTP request — specifically the data that is sent by the client (e.g., Postman, a React frontend, etc.) in a POST, PUT, or PATCH request.
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        image,
      },
      { new: true }
    )
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" })
    }

    return res.status(200).json(updatedNote) //displays updted notes
  } catch (error) {
    console.error("Error in update controllers", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
export const deleteNote = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error in ceatenotes controllers", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
