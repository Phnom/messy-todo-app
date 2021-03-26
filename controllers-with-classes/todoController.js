const TodoModel = require("../models-as-classes/todoModel")

const todoModel = new TodoModel()

const getAllTodoLists = async (req, res, next) => {
  try {
    const data = await todoModel.allTodoLists()
    res.json(data)
  } catch (error) {
    next(error)
  }
}

const postTodoList = async (req, res) => {
  const { title, color } = req.body
  if (!(title || color)) {
    return res.status(400).json({ error: "Invalid body" })
  }

  try {
    const data = await todoModel.createTodoList(title, color)
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

const postTodo = async (req, res) => {
  const { todoListID, content } = req.body
  if (!(todoListID || content)) {
    return res.status(400).json({ error: "Invalid body" })
  }

  try {
    const data = await todoModel.createTodo(content, todoListID)
    res.status(201).json(data)
  } catch (error) {
    next(error)
  }
}
const getTodo = async (req, res) => {
  const { id } = req.body
  if (!id) {
    return res.status(400).json({ error: "Invalid body" })
  }
  try {
    const data = await todoModel.getTodo(id)
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

const patchTodolist = async (req, res) => {
  const { id, title, color } = req.body
  if (!(id || title || color)) {
    return res.status(400).json({ error: "Invalid body" })
  }
  try {
    await todoModel.updateTodoList(id, title, color)
    return res.json({ message: "Todo list updated" })
  } catch (error) {
    next(error)
  }
}

const patchTodo = async (req, res) => {
  const { id, content, done } = req.body
  if (!(id || content || done)) {
    return res.status(400).json({ error: "Invalid body" })
  }

  try {
    await todoModel.updateTodo(id, content, done)
    res.json({ message: "Todo updated" })
  } catch (error) {
    next(error)
  }
}

const deleteTodolist = async (req, res) => {
  const { id } = req.body
  if (!id) {
    return res.status(400).json({ error: "Invalid body, missing id" })
  }
  try {
    await todoModel.deleteTodoList(id)
    res.json({ message: "Todo list deleted" })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllTodoLists,
  postTodoList,
  postTodo,
  getTodo,
  patchTodolist,
  deleteTodolist,
  patchTodo,
}
