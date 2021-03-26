const { Router } = require("express")
const todoController = require("../controllers/todoController")

const router = Router()

router.get("/todo/list", todoController.getAllTodoLists)
router.post("/todo/list", todoController.postTodoList)
router.patch("/todo/list", todoController.patchTodolist)
router.delete("/todo/list", todoController.deleteTodolist)
router.post("/todo", todoController.postTodo)
router.get("/todo", todoController.getTodo)
router.patch("/todo", todoController.patchTodo)

// db.all ?
// delete list?
module.exports = router
