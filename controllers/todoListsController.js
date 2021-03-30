const todoListsModel = require("../models/todoListsModel")
const todosModel = require("../models/todosModel")

const getAllTodoLists = async (req, res, next) => {
  try {
    const data = await todoListsModel.allTodoLists()
    res.json(data)
  } catch (error) {
    next(error)
  }
}

const getTodoLists = async (req, res, next) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({ error: "Invalid body" })
  }
  try {
    const data = await todoListsModel.getTodoLists(id)
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

const getAllTodosByTodoList = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id) {
      res.json("No id provided")
    }
    const data = await todosModel.getAllTodosByTodoList(id)
    res.json(data)
  } catch (error) {
    next(error)
  }
}

const postTodoList = async (req, res, next) => {
  const { title, color } = req.body
  try {
    const data = await todoListsModel.createTodoList(title, color)
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

const patchTodolist = async (req, res, next) => {
  const { id } = req.params
  const { title, color } = req.body
  if (!(id || color)) {
    return res.status(400).json({ error: "Invalid body" })
  }
  try {
    await todoListsModel.updateTodoList(id, title, color)
    return res.json({ message: "Todo list updated" })
  } catch (error) {
    next(error)
  }
}

const deleteTodolist = async (req, res, next) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({ error: "Invalid body, missing id" })
  }
  try {
    await todoListsModel.deleteTodoList(id)
    res.json({ message: "Todo list deleted" })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllTodoLists,
  getTodoLists,
  postTodoList,
  deleteTodolist,
  patchTodolist,
  getAllTodosByTodoList,
}
