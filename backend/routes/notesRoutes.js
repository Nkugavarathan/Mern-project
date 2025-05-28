import express from "express"

const router = express.Router()

router.get("/", (req, res) => {
  res.status(200).send("u fetched the note")
})

router.post("/", (req, res) => {
  res.status(201).json({ message: "u fetched the note" })
})

router.put("/:id", (req, res) => {
  res.status(201).json({ message: "Note updated succesffully" })
})
router.delete("/:id", (req, res) => {
  res.status(201).json({ message: "Note deleted succesffully" })
})

export default router
