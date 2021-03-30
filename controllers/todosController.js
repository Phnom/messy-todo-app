const todoModel = require("../models/todosModel")

const postTodo = async (req, res, next) => {
  const { todoListsID } = req.params
  const { content } = req.body
  if (!(todoListsID || content)) {
    return res.status(400).json({ error: "Invalid body" })
  }
  try {
    const data = await todoModel.createTodo(content, todoListsID)
    res.status(201).json(data)
  } catch (error) {
    next(error)
  }
}

const getAllTodo = async (req, res, next) => {
  try {
    const data = await todoModel.allTodos()
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

const getTodo = async (req, res, next) => {
  const { id } = req.params
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

const patchTodo = async (req, res, next) => {
  const { id } = req.params
  const { content, done } = req.body
  if (!(id || done)) {
    return res.status(400).json({ error: "Invalid body" })
  }
  try {
    await todoModel.updateTodo(id, content, done)
    res.json({ message: "Todo updated" })
  } catch (error) {
    next(error)
  }
}

const deleteTodo = async (req, res, next) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({ error: "Invalid body, missing id" })
  }
  try {
    await todoModel.deleteTodos(id)
    res.json({ message: "Todo deleted" })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getTodo,
  getAllTodo,
  postTodo,
  patchTodo,
  deleteTodo,
}
