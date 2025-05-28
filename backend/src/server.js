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
import cors from "cors"

import dotenv from "dotenv"
import { connectdb } from "./config/db.js"

import noteRoutes from "./routes/notesRoutes.js"

// Load environment variables
dotenv.config()

// console.log("MONGO_URI:", process.env.MONGO_URI) // Debug check
const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())

// Connect DB
connectdb()

// Middleware
app.use(express.json())
//This middleware is used to parse incoming JSON request bodies. It tells Express to automatically convert JSON data from the client into a usable req.body object.
//before routes add this middleware
// Routes
app.use("/api/notes", noteRoutes)

app.get("/", (req, res) => {
  res.send("Welcome to the MERN Notes App!")
})

// Start server

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`)
})
