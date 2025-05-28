// Handle logic for each route (create, read, update, delete).

export const getAllNotes = async (req, res) => {
  res.status(200).send("u fetched the note")
}

export const createNote = async (req, res) => {
  res.status(201).json({ message: "u fetched the note" })
}
export const upadateNote = async (req, res) => {
  res.status(201).json({ message: "Note updated succesffully" })
}
export const deleteNote = async (req, res) => {
  res.status(201).json({ message: "Note updated succesffully" })
}
