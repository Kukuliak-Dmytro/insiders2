import { Router } from "express";
import { login,register, greet,refresh } from "../controllers/user_controller";
import { authenticateMiddleware } from "../middleware/authenticateMiddleware";
import { createList, addTask } from "../controllers/todo_controller";
const router = Router();

router.get("/", authenticateMiddleware, greet);
router.post("/auth/login", login);
router.post("/auth/register", register);
router.post('/auth/refresh', refresh);

router.post('/list', createList);
router.post('/task', addTask);


export default router;