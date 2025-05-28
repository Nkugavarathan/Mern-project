// Handle logic for each route (create, read, update, delete).

import Note from "../models/Note.js"

// get all note              // in here ididnt use req so use _(underscore) instead of req
export const getAllNotes = async (req, res) => {
  try {
    // -1 will sort in desc order (newst first )
    const notes = await Note.find().sort({ createdAt: -1 }) // newst first according to time
    res.status(200).json(notes)
  } catch (error) {
    console.error("Error in getAllnotes controllers", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
// get note using id
export async function getNotesById(req, res) {
  try {
    const note = await Note.findById(req.params.id)
    if (!note) {
      return res.status(404).json({ message: "Note not successfully" })
    }
    res.status(200).json(note)
  } catch (error) {}
}

//create note
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

// // update note
export const upadateNote = async (req, res) => {
  try {
    const { title, description, image } = req.body // req.body in Express refers to the body of the incoming HTTP request — specifically the data that is sent by the client (e.g., Postman, a React frontend, etc.) in a POST, PUT, or PATCH request.
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        image, //This is the update data you're sending in the body of the PUT request. () update aga vendiya akala podura
      },
      { new: true } // By default, MongoDB returns the document *before* the update.
      // Setting `new: true` makes it return the updated version instead.
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

//delete note
export const deleteNote = async (req, res) => {
  try {
    // Use the Note model to find the note by ID and delete it from the database // Find the note by ID and delete it
    const deletedNote = await Note.findByIdAndDelete(req.params.id)

    // If no note is found with that ID, return 404
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" })
    }

    // If successfully deleted, return a success response
    return res.status(200).json({ message: "Note deleted successfully" })
  } catch (error) {
    // Log error and return internal server error response
    console.error("Error in deleteNote controller", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
