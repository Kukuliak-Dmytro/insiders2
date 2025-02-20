import { Router } from "express";
import { login,register, greet,refresh } from "../controllers/user_controller";
import { authenticateMiddleware } from "../middleware/authenticateMiddleware";
import { createList, addTask, editList, getOneListById, deleteList, getAllUserLists } from "../controllers/todo_controller";
const router = Router();

router.get("/", authenticateMiddleware, greet);
router.post("/auth/login", login);
router.post("/auth/register", register);
router.post('/auth/refresh', refresh);

router.get('/list/user/:id', getAllUserLists)
router.get('/list/:id', getOneListById);
router.post('/list', createList);
router.patch('/list/:id', editList);
router.delete('/list/:id', deleteList);
router.post('/task', addTask);


export default router;