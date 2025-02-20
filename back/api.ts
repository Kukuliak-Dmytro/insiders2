// 
import dotenv from "dotenv";
dotenv.config();
// import { PrismaClient } from "@prisma/client";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { JwtPayload, AuthRequest } from "./src/interfaces/interface";
// import { authenticateMiddleware } from "./src/middleware/authenticateMiddleware";
import router from "./src/routes/routes";
// const prisma = new PrismaClient();
import errorMiddleware from "./src/middleware/errorMiddleware";
const app = express();
app.use(cors());
app.use(express.json());
app.use('/',router);
app.use(errorMiddleware);
// const secret = process.env.ACCESS_TOKEN_SECRET  as string;


// Middleware для перевірки токена

// Головна сторінка (перевіряє токен)
// app.get("/", authenticateMiddleware, async(req, res) => {
//     res.send("Welcome to the API!");
// });

// Запускаємо сервер
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
