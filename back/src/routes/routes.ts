import { Router } from "express";
import { login,register, greet } from "../controllers/controller";
import { authenticateMiddleware } from "../middleware/authenticateMiddleware";
import errorMiddleware from "../middleware/errorMiddleware";
const router = Router();

router.get("/", authenticateMiddleware, greet);
router.post("/login", login);
router.post("/register", register);



export default router;