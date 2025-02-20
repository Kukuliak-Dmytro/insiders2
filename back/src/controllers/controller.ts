import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const secret = process.env.ACCESS_TOKEN_SECRET as string;
export async function greet(req:Request, res:Response) {
    res.send("Welcome to the API!");
}
export async function login(req:Request, res:Response) {
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
}
export async function register(req:Request, res:Response, next:NextFunction)  {
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
}