// 
import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

const secret = process.env.ACCESS_TOKEN_SECRET as string; // Гарантуємо, що це точно рядок

// Інтерфейс для токена
interface JwtPayload {
    email: string;
}

// Розширений тип Request, щоб додати user
interface AuthRequest extends Request {
    user?: JwtPayload;
}

// Middleware для перевірки токена
const authenticateMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        res.status(401).json({ message: "Authorization header missing" });
        return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Token missing" });
        return;
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            res.status(403).json({ message: "Invalid token" });
            return;
        }

        const user = decoded as JwtPayload; // Приведення типу
        req.user = user;
        next();
    });
};

// Головна сторінка (перевіряє токен)
app.get("/", authenticateMiddleware, async(req, res) => {
    res.send("Welcome to the API!");
});

// Реєстрація нового користувача
app.post("/register", async  (req:Request, res:Response, next:NextFunction) => {
    const { email, name, password } = req.body;

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { email, name, password: hashedPassword },
    });

    const accessToken = jwt.sign({ email: user.email }, secret, { expiresIn: "1h" });

    res.json({ accessToken });
});

// Вхід (логін)
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        res.status(400).json({ message: "User not found" });
        return 
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        res.status(400).json({ message: "Invalid password" });
        return 
    }

    const accessToken = jwt.sign({ email: user.email }, secret, { expiresIn: "1h" });

    res.json({ accessToken });
});

// Запускаємо сервер
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
