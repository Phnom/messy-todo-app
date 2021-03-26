require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 8080

// Custom routes
const todoRoutes = require("./routes/todoRoutes")

// Custom Middlewares
const logger = require("./middleware/logger")
const headers = require("./middleware/headers")
const errorHandler = require("./middleware/errorHandling")

// Using express json middleware
app.use(express.json())

// express custom middlewares
app.use(logger)
app.use(headers)

// api endpoints with controllers
app.use("/api/v1", todoRoutes)

// Error handler custom middleware
console.log(errorHandler)
app.use(errorHandler)

// Start listening
app.listen(PORT, () => console.log("Running on port " + PORT))
