const express = require("express")
const app = express()

app.use(express.json())

const cors = require("cors")
app.use(cors())

app.get("/", (req, res) => {
  res.status(200).send("Hello Wors")
})
app.post("/posts", (req, res) => {
  console.log(req.body)
  res.json({ message: "User created" })
})

app.listen(3000, () => {
  console.log("App running on http://localhost:3000")
})
