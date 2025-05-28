import express from "express"
import noteRoutes from "./routes/notesRoutes.js" // note the .js extension

const app = express()

app.use(express.json()) // to parse JSON bodies

// Use CORS if needed
// import cors from "cors";
// app.use(cors());

app.use("/api/notes", noteRoutes)
app.get("/", (req, res) => {
  res.send("Welcome to the MERN Notes App!")
})
// app.use(express.json())

// const cors = require("cors")
// app.use(cors())

// app.get("/", (req, res) => {
//   res.status(200).send("Hello Wors")
// })
// app.post("/posts", (req, res) => {
//   console.log(req.body)
//   res.json({ message: "User created" })
// })

app.listen(3000, () => {
  console.log("App running on http://localhost:3000")
})
