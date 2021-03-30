const { Router } = require("express")
const todoController = require("../controllers/todoListsController")
const router = Router()

router.get("/todolists", todoController.getAllTodoLists)
router.get("/todolists/:id", todoController.getTodoLists)
router.get("/todolists/:id/todos", todoController.getAllTodosByTodoList)
router.post("/todolists", todoController.postTodoList)
router.patch("/todolists/:id", todoController.patchTodolist)
router.delete("/todolists/:id", todoController.deleteTodolist)

// db.all ?
// delete list?
module.exports = router
