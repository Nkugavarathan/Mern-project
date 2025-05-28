// import express from "express"
// import noteRoutes from "./routes/notesRoutes.js" // note the .js extension
// import { connectdb } from "./config/db.js"
// import dotenv from "dotenv"
// dotenv.config()
// console.log(process.env.MONGO_URI)
// const app = express()

// app.use(express.json()) // to parse JSON bodies

// app.use("/api/notes", noteRoutes)

// connectdb()

// app.get("/", (req, res) => {
//   res.send("Welcome to the MERN Notes App!")
// })
// // app.use(express.json())

// // const cors = require("cors")
// // app.use(cors())

// // app.get("/", (req, res) => {
// //   res.status(200).send("Hello Wors")
// // })
// // app.post("/posts", (req, res) => {
// //   console.log(req.body)
// //   res.json({ message: "User created" })
// // })

// app.listen(5100, () => {
//   console.log("App running on http://localhost:3000")
// })

import express from "express"
import dotenv from "dotenv"
import { connectdb } from "./config/db.js"
import noteRoutes from "./routes/notesRoutes.js"

// Load environment variables
dotenv.config()

// console.log("MONGO_URI:", process.env.MONGO_URI) // Debug check
const PORT = process.env.PORT || 3000
const app = express()

// Connect DB
connectdb()

// Middleware
app.use(express.json())

// Routes
app.use("/api/notes", noteRoutes)

app.get("/", (req, res) => {
  res.send("Welcome to the MERN Notes App!")
})

// Start server

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`)
})
