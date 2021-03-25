const sqlite = require("sqlite3")
const db = new sqlite.Database("todos.db")

module.exports = db
