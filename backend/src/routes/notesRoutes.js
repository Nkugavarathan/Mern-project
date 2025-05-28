// Define HTTP endpoints.(path(URL) +HTTP methodsa )

import express from "express"
import {
  createNote,
  deleteNote,
  getAllNotes,
  upadateNote,
  getNotesById,
} from "../controllers/notesController.js"

const router = express.Router()

router.get("/", getAllNotes)
router.get("/:id", getNotesById)

router.post("/", createNote)

router.put("/:id", upadateNote)
router.delete("/:id", deleteNote)

export default router
