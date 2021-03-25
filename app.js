require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 8080
const todoRouter = require("./routers/todoRouter")
app.use(express.json())

app.use((req, res, next) => {
  console.log(`Handling request for ${req.method} ${req.path}`)
  next()
})

app.use((req, res, next) => {
  if (
    req.method == "POST" &&
    req.headers["content-type"] != "application/json"
  ) {
    return res
      .status(400)
      .json({ error: "Missing header Content-Type: application/json" })
  }
  next()
})

app.use("/api", todoRouter)
app.listen(PORT, () => console.log("Running on port " + PORT))
