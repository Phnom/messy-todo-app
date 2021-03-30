const { Router } = require("express")
const todoController = require("../controllers/todosController")
const router = Router()

router.get("/todos/", todoController.getTodo)
//"http://localhost:5000/todos/1
router.get("/todos/:id", todoController.getTodo)
router.post("/todos/:todoListsID", todoController.postTodo)
router.patch("/todos/:id", todoController.patchTodo)
router.delete("/todos/:id", todoController.deleteTodo)

module.exports = router
