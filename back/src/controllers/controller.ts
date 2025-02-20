import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { CustomApiError } from "../types/interface";
const prisma = new PrismaClient();
const secret = process.env.ACCESS_TOKEN_SECRET as string;

export async function greet(req: Request, res: Response) {
    res.send("Welcome to the API!");
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new CustomApiError("User not found", 404);
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new CustomApiError("Invalid password", 400);
        }

        const accessToken = jwt.sign({ email: user.email }, secret, { expiresIn: "1h" });

        res.json({ accessToken });
    } catch (error) {
        next(error);
    }
}

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, name, password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new CustomApiError("User already exists", 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { email, name, password: hashedPassword },
        });

        const accessToken = jwt.sign({ email: user.email }, secret, { expiresIn: "1h" });

        res.json({ accessToken });
    } catch (error) {
        next(error);
    }
}