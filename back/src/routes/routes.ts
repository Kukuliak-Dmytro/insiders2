import { Router } from "express";
import { login,register, greet,refresh } from "../controllers/user_controller";
import { authenticateMiddleware } from "../middleware/authenticateMiddleware";
import todoController from "../controllers/todo_controller";
const router = Router();

router.get("/", authenticateMiddleware, greet);

router.post("/auth/login", login);
router.post("/auth/register", register);
router.post("/auth/refresh", refresh);

router.get('/list/user/:id', authenticateMiddleware, todoController.getAllUserLists);
router.get('/list/:id', authenticateMiddleware, todoController.getOneListById);
router.get('/list/:id/tasks',authenticateMiddleware, todoController.getTasksFromList);

router.post('/list', authenticateMiddleware, todoController.createList);
router.patch('/list/:id', authenticateMiddleware, todoController.editList);
router.delete('/list/:id', authenticateMiddleware, todoController.deleteList);

router.post('/task', authenticateMiddleware, todoController.addTask);
router.patch('/task/:id',authenticateMiddleware, todoController.editTask);
router.patch('/task/:id/toggle', authenticateMiddleware, todoController.toggleTaskCompletion)
router.delete('/task/:id',authenticateMiddleware, todoController.deleteTask);


export default router;