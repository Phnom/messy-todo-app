require("dotenv").config()
const express = require("express")
const sqlite = require("sqlite3")
const app = express()
const db = require("./db/sqlite")
const todoModel = require("./models/todo")
const PORT = process.env.PORT || 8080

// gettoDlist
app.get("/alltodolists", async (req, res) => {
  // db.get("SELECT * FROM todo_lists", function (err, row) {
  //   res.json(row)
  // })
  try {
    const data = await todoModel.allTodoLists()
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: "Something went wrong please try again" })
  }
})

app.post("/newtodolist", async (req, res) => {
  const { title, color } = req.body
  if (!(title || color)) {
    return res.status(400).json({ error: "Invalid body" })
  }

  try {
    const data = await todoModel.createTodoList(title, color)
    return res.json(data)
  } catch (error) {
    return res.json(error)
  }
  // db.run(
  //   `INSERT INTO todo_lists(title,color) VALUES (?, ?)`,
  //   [title, color],
  //   function (error) {
  //     if (error) {
  //       return res.status(500).json({ error })
  //     }

  //     db.get(
  //       `SELECT * FROM todo_lists WHERE id = ?`,
  //       [this.lastID],
  //       function (err, row) {
  //         res.json({ message: "Success", data: row })
  //       }
  //     )
  //   }
  // )
})

app.post("/newtodo", async (req, res) => {
  const { todoListID, content } = req.body
  if (!(todoListID || content)) {
    return res.status(400).json({ error: "Invalid body" })
  }

  try {
    const data = await todoModel.createTodo(content, todoListID)
    res.status(201).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
  // db.run(
  //   `INSERT INTO todos(content, todo_list_id) VALUES (?,?)`,
  //   [content, todoListID],
  //   function (error) {
  //     if (error) {
  //       return res.status(500).json({ error })
  //     }
  //     db.get(
  //       `SELECT * FROM todos WHERE id = ?`,
  //       [this.lastID],
  //       function (err, row) {
  //         res.json({ message: "Success", data: row })
  //       }
  //     )
  //   }
  // )
})

// same as alltodo

/*

app.get("/gettodolists", (req, res) => {
  db.all(`SELECT * FROM todo_lists`, function (error, rows) {
    if (error) {
      return res.status(500).json({ error })
    }
    res.json({ message: "Success", data: rows })
  })
})

*/

app.get("/gettodo", (req, res) => {
  const { id } = req.body
  if (!id) {
    return res.status(400).json({ error: "Invalid body" })
  }

  db.get(`SELECT * FROM todos WHERE id = ?`, [id], function (error, row) {
    if (error) {
      res.status(500).json({ error })
    }
    res.json({ message: "Success", data: row })
  })
})

app.post("/updatetodolist", (req, res) => {
  const { id, title, color } = req.body
  if (!(id || title || color)) {
    return res.status(400).json({ error: "Invalid body" })
  }
  db.run(
    `UPDATE todos SET title = ?, color = ? WHERE id = ?`,
    [title, color, id],
    function (error) {
      if (error) {
        return res.status(400).json({ error })
      }
      res.json({ message: "Todo list updated" })
    }
  )
})

app.post("/updatetodo", (req, res) => {
  const { id, content, done } = req.body
  if (!(id || content || done)) {
    return res.status(400).json({ error: "Invalid body" })
  }

  db.run(
    `UPDATE todos SET content = ?, done = ? WHERE id = ?`,
    [content, done, id],
    function (error) {
      if (error) {
        return res.status(500).json({ error })
      }
      res.json({ message: "Todo updated" })
    }
  )
})

app.post("/deletetodolist", (req, res) => {
  const { id } = req.body
  if (!id) {
    return res.status(400).json({ error: "Invalid body, missing id" })
  }

  db.run(`DELETE FROM todo_lists WHERE id = ?`, [id], function (error) {
    if (error) {
      return res.status(500).json({ error })
    }
    if (this.changes == 0) {
      return res
        .status(404)
        .json({ error: `Todo list with id ${id} not found` })
    }

    res.json({ message: "Todo list deleted" })
  })
})
