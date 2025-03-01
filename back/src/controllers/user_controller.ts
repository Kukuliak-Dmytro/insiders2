import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { authLogin, authRegister } from "../operations/user_operations";
import { CustomApiError } from "../types/interface";
import { JwtPayload } from "../types/interface";
const secret = process.env.ACCESS_TOKEN_SECRET as string;
export async function greet(req: Request, res: Response) {
    res.send("Welcome to the API!");
}
export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, name, password } = req.body;

        const user = await authRegister({ email, name, password });
        const accessToken = jwt.sign({ id: user.id, name: user.name, email: user.email }, secret, { expiresIn: "1h" });
        const refreshToken = jwt.sign({ id: user.id, name: user.name, email: user.email }, secret);

        // Зберігаємо refreshToken в HTTP-only cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,  // Забезпечує, щоб cookie була доступна тільки через HTTP-запити
            secure: process.env.NODE_ENV === "production", // Якщо в продакшн, тоді лише через HTTPS
            sameSite: "strict",  // Забороняє передавати cookie у крос-доменних запитах
            path: "/refresh", // cookie доступна тільки на маршруті /refresh
            maxAge: 24 * 60 * 60 * 1000 // 24 години (можна налаштувати)
        });

        res.json({ userId: user.id, accessToken });
    } catch (error) {
        next(error);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body;

        const user = await authLogin({ email, password });

        const accessToken = jwt.sign({  name: user.name, email: user.email }, secret, { expiresIn: "1h" });
        const refreshToken = jwt.sign({ name: user.name, email: user.email }, secret);

        // Зберігаємо refreshToken в HTTP-only cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,  // Забезпечує, щоб cookie була доступна тільки через HTTP-запити
            secure: process.env.NODE_ENV === "production", // Якщо в продакшн, тоді лише через HTTPS
            sameSite: "strict",  // Забороняє передавати cookie у крос-доменних запитах
            path: "/refresh", // cookie доступна тільки на маршруті /refresh
            maxAge: 24 * 60 * 60 * 1000 // 24 години (можна налаштувати)
        });

        res.json({ userId: user.id, accessToken });
    } catch (error) {
        next(error);
    }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
    try {
       const refreshToken = req.cookies.refreshToken; // Отримуємо refreshToken з cookies

        
        if (!refreshToken) {
            throw new CustomApiError("Refresh token is required", 400);
        }
        jwt.verify(refreshToken, secret, (err:any, decoded:any) => {
            if (err) {
                throw new CustomApiError("Invalid token", 403);
            }
            const user = decoded as JwtPayload;
            const accessToken = jwt.sign({ id: user.id, name: user.name, email: user.email }, secret, { expiresIn: "1h" });
            const refreshToken = jwt.sign({ id: user.id, name: user.name, email: user.email }, secret);
            res.json({ userId: user.id, accessToken: accessToken, refreshToken: refreshToken });
        }
        )

    }
    catch (error) {
        next(error);
    }
}