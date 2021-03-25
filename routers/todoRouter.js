const { Router } = require("express")
const todoController = require("../controllers/todos")

const router = new Router()

router.get("/todo/list", todoController.getAllTodoLists)
router.post("/todo/list", todoController.postTodoList)
router.patch("/todo/list", todoController.patchTodolist)
router.delete("/todo/list", todoController.deleteTodolist)
router.post("/todo", todoController.postTodo)
router.get("/todo", todoController.getTodo)
router.patch("/todo", todoController.patchTodo)

module.exports = router
