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

// import express from "express"
// import cors from "cors"

// import dotenv from "dotenv"
// import { connectdb } from "./config/db.js"
// import { rateLimiter } from "./middleware/rateLimiter.js"
// import noteRoutes from "./routes/notesRoutes.js"

// import path from "path"
// import { fileURLToPath } from "url"
// import { dirname } from "path"

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

// // ✅ Serve uploaded images statically
// // Load environment variables
// dotenv.config()

// // console.log("MONGO_URI:", process.env.MONGO_URI) // Debug check
// const PORT = process.env.PORT || 3000
// const app = express()

// app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// if (process.env.NODE_ENV !== "production") {
//   app.use(cors())
// }

// // Middleware
// app.use(express.json())
// //This middleware is used to parse incoming JSON request bodies. It tells Express to automatically convert JSON data from the client into a usable req.body object.
// //before routes add this middleware

// app.use(rateLimiter)

// //understand next()

// // Custom middleware to log the HTTP method and request URL for each incoming request
// // app.use((req, res, next) => {
// //   console.log(`Req method ${req.method} & Req URL is ${req.url}`)
// //   next() // Pass control to the next middleware or route handler
// // })
// // // Custom Middleware #1
// // app.use((req, res, next) => {
// //   console.log("Step 1: Logger Middleware")
// //   next() // Move to next middleware
// // })

// // // Custom Middleware #2
// // app.use((req, res, next) => {
// //   console.log("Step 2: Another Middleware")
// //   next() // Move to the route
// // })

// app.use("/api/notes", noteRoutes)
// // frontend and backend same domain name setup start

// const dirName = path.resolve()

// if (process.env.NODE_ENV === "production") {
//   // This resolves to: E:\Web develop\MERN\codesistency\frontend\dist
//   const frontendPath = path.join(__dirname, "../frontend/dist")
//   console.log("Serving static files from:", frontendPath)

//   app.use(express.static(frontendPath))

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(frontendPath, "index.html"))
//   })
// }

// // frontend and backend same domain name setup end
// app.get("/", (req, res) => {
//   res.send("Welcome to the MERN Notes App!")
// })

// // Your routes...
// app.get("/notes/:id", (req, res) => {
//   // example code to send a note
//   res.json({ id: req.params.id, title: "Sample Note" })
// })

// app.use("/uploads", express.static("uploads"))

// // Start server

// // Connect DB
// connectdb().then(() => {
//   // once mongodb connect then only server run
//   app.listen(PORT, () => {
//     console.log(`App running on http://localhost:${PORT}`)
//   })
// })

// Core & Environment
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path, { dirname } from "path"
import { fileURLToPath } from "url"

// App & Config
import { connectdb } from "./config/db.js"
import { rateLimiter } from "./middleware/rateLimiter.js"
import noteRoutes from "./routes/notesRoutes.js"

dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()

// Get __dirname in ES Module
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// MongoDB connect
connectdb().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ App running on http://localhost:${PORT}`)
  })
})

// Middleware
app.use(express.json())
app.use(rateLimiter)

// CORS only in development
if (process.env.NODE_ENV !== "production") {
  app.use(cors())
}

// API Routes
app.use("/api/notes", noteRoutes)

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../frontend/dist")
  console.log("✅ Serving static files from:", frontendPath)

  app.use(express.static(frontendPath))

  // Catch-all route for React frontend
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"))
  })
}

// Debug root route
app.get("/", (req, res) => {
  res.send("Welcome to the MERN Notes App!")
})
