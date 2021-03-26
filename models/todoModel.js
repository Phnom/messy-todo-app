const crudModel = require("./crudModel")

const allTodoLists = async () => {
  return await crudModel.findAll("SELECT * FROM todo_lists")
}

const createTodoList = async (title, color) => {
  const id = await crudModel.create(
    "INSERT INTO todo_lists(title,color) VALUES (?, ?)",
    [title, color]
  )
  return await crudModel.findOne(`SELECT * FROM todo_lists WHERE id = ?`, [id])
}
const createTodo = async (content, todoListID) => {
  const id = await crudModel.create(
    `INSERT INTO todos(content, todo_list_id) VALUES (?,?)`,
    [content, todoListID]
  )
  return await crudModel.findOne(`SELECT * FROM todos WHERE id = ?`, [id])
}
const getTodo = async (id) => {
  return await crudModel.findOne(`SELECT * FROM todos WHERE id = ?`, [id])
}
const updateTodoList = async (id, title, color) => {
  return await crudModel.update(
    `UPDATE todo_lists SET title = ?, color = ? WHERE id = ?`,
    [title, color, id]
  )
}
const updateTodo = async (id, content, done) => {
  return await crudModel.update(
    `UPDATE todos SET content = ?, done = ? WHERE id = ?`,
    [content, done, id]
  )
}

const deleteTodoList = async (id) => {
  return await crudModel.delete(`DELETE FROM todo_lists WHERE id = ?`, [id])
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
