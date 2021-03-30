const crudModel = require("./crudModel")

const updateTodo = async (id, content, done) => {
  return content
    ? await crudModel.update(
        `UPDATE todos SET content = ?, done = ? WHERE id = ?`,
        [content, done, id]
      )
    : await crudModel.update("UPDATE todos SET done = ? WHERE id = ?", [
        done,
        id,
      ])
}

const allTodos = async () => {
  return await crudModel.findAll("SELECT * FROM todo")
}

const getTodo = async (id) => {
  return await crudModel.findOne(`SELECT * FROM todos WHERE id = ?`, [id])
}

const getAllTodosByTodoList = async (id) => {
  return await crudModel.findAll("SELECT * FROM todos WHERE todo_list_id = ?", [
    id,
  ])
}

const createTodo = async (content, todoListID) => {
  const id = await crudModel.create(
    `INSERT INTO todos(content, todo_list_id) VALUES (?,?)`,
    [content, todoListID]
  )
  return await crudModel.findOne(`SELECT * FROM todos WHERE id = ?`, [id])
}

const deleteTodos = async (id) => {
  return await crudModel.deleteOne(`DELETE FROM todos WHERE id = ?`, [id])
}

module.exports = {
  createTodo,
  getTodo,
  updateTodo,
  allTodos,
  getAllTodosByTodoList,
  deleteTodos,
}
