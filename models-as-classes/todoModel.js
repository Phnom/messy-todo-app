const CrudModel = require("./crudModel")

class TodoModel extends CrudModel {
  constructor() {
    super()
  }
  async allTodoLists() {
    return await this.findAll("SELECT * FROM todo_lists")
  }

  async createTodoList(title, color) {
    const id = await this.create(
      "INSERT INTO todo_lists(title,color) VALUES (?, ?)",
      [title, color]
    )
    return await this.findOne(`SELECT * FROM todo_lists WHERE id = ?`, [id])
  }
  async createTodo(content, todoListID) {
    const id = await this.create(
      `INSERT INTO todos(content, todo_list_id) VALUES (?,?)`,
      [content, todoListID]
    )
    return await this.findOne(`SELECT * FROM todos WHERE id = ?`, [id])
  }
  async getTodo(id) {
    return await this.findOne(`SELECT * FROM todos WHERE id = ?`, [id])
  }
  async updateTodoList(id, title, color) {
    return await this.update(
      `UPDATE todo_lists SET title = ?, color = ? WHERE id = ?`,
      [title, color, id]
    )
  }
  async updateTodo(id, content, done) {
    return await this.update(
      `UPDATE todos SET content = ?, done = ? WHERE id = ?`,
      [content, done, id]
    )
  }

  async deleteTodoList(id) {
    return await this.delete(`DELETE FROM todo_lists WHERE id = ?`, [id])
  }
}

module.exports = TodoModel
