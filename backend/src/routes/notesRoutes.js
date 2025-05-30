// Define HTTP endpoints.(path(URL) +HTTP methodsa )

import express from "express"
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
  getNotesById,
} from "../controllers/notesController.js"
import upload from "../middleware/uploadMiddleware.js"

const router = express.Router()

router.post("/", upload.single("image"), createNote)

router.get("/", getAllNotes)
router.get("/:id", getNotesById)

router.put("/notes/:id", upload.single("image"), updateNote)

// router.post("/", createNote)

router.put("/:id", updateNote)
router.delete("/:id", deleteNote)

export default router
