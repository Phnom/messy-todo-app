const crudModel = require("./crudModel")

const allTodoLists = async () => {
  return await crudModel.findAll("SELECT * FROM todo_lists")
}

const getTodoLists = async (id) => {
  return await crudModel.findOne(`SELECT * FROM todo_lists WHERE id = ?`, [id])
}

const createTodoList = async (title, color) => {
  if (!title) {
    throw new Error("Invalid Body")
  }
  const id = await crudModel.create(
    "INSERT INTO todo_lists(title,color) VALUES (?, ?)",
    [title, color]
  )
  return await crudModel.findOne(`SELECT * FROM todo_lists WHERE id = ?`, [id])
}

const updateTodoList = async (id, title, color) => {
  return title
    ? await crudModel.update(
        `UPDATE todo_lists SET title = ?, color = ? WHERE id = ?`,
        [title, color, id]
      )
    : await crudModel.update(`UPDATE todo_lists SET color = ? WHERE id = ?`, [
        color,
        id,
      ])
}

const deleteTodoList = async (id) => {
  return await crudModel.deleteOne(`DELETE FROM todo_lists WHERE id = ?`, [id])
}

module.exports = {
  allTodoLists,
  createTodoList,
  updateTodoList,
  deleteTodoList,
  getTodoLists,
}
