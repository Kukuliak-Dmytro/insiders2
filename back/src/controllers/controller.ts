import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { CustomApiError } from "../types/interface";
import { authLogin, authRegister } from "../operations/user_operations";
const prisma = new PrismaClient();
const secret = process.env.ACCESS_TOKEN_SECRET as string;
import { JwtPayload } from "../types/interface";
export async function greet(req: Request, res: Response) {
    res.send("Welcome to the API!");
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body;

        const user = await authLogin({ email, password });

        const accessToken = jwt.sign(user, secret, { expiresIn: "1h" });

        res.json({ accessToken });
    } catch (error) {
        next(error);
    }
}

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, name, password } = req.body;

        const user = await authRegister({ email, name, password });
        const accessToken = jwt.sign(user, secret, { expiresIn: "1h" });

        res.json({ accessToken });
    } catch (error) {
        next(error);
    }
}