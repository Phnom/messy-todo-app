const crud = require("./crud")

const allTodoLists = async () => {
  try {
    return await crud.findAll("SELECT * FROM todo_lists")
  } catch (error) {
    return error
  }
}

const createTodoList = async (title, color) => {
  try {
    const id = await crud.create(
      "INSERT INTO todo_lists(title,color) VALUES (?, ?)",
      [title, color]
    )
    return await crud.findOne(`SELECT * FROM todo_lists WHERE id = ?`, [id])
  } catch (error) {
    return error
  }
}
const createTodo = async (content, todoListID) => {
  try {
    const id = await crud.create(
      `INSERT INTO todos(content, todo_list_id) VALUES (?,?)`,
      [content, todoListID]
    )
    return await crud.findOne(`SELECT * FROM todos WHERE id = ?`, [id])
  } catch (error) {
    return error
  }
}
const getTodo = async (id) => {
  try {
    return await crud.findOne(`SELECT * FROM todos WHERE id = ?`, [id])
  } catch (error) {
    return error
  }
}

const updateTodoList = async (id, title, color) => {
  try {
    return await crud.update(
      `UPDATE todo_lists SET title = ?, color = ? WHERE id = ?`,
      [title, color, id]
    )
  } catch (error) {
    return error
  }
}
const updateTodo = async (id, content, done) => {
  try {
    return await crud.update(
      `UPDATE todos SET content = ?, done = ? WHERE id = ?`,
      [content, done, id]
    )
  } catch (error) {
    return error
  }
}

const deleteTodoList = async (id) => {
  try {
    return await crud.delete(`DELETE FROM todo_lists WHERE id = ?`, [id])
  } catch (error) {
    return error
  }
}

module.exports = {
  allTodoLists,
  createTodoList,
  createTodo,
  getTodo,
  updateTodo,
  updateTodoList,
  deleteTodoList,
}
