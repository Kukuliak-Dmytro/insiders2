import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { authLogin, authRegister } from "../operations/user_operations";
import { CustomApiError } from "../types/interface";
import { JwtPayload } from "../types/interface";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
export async function greet(req: Request, res: Response) {
    res.send("Welcome to the API!");
}
export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, name, password } = req.body;

        const user = await authRegister({ email, name, password });
        const accessToken = jwt.sign({ id: user.id, name: user.name, email: user.email }, ACCESS_TOKEN_SECRET, { expiresIn: "15min" });
        const refreshToken = jwt.sign({ id: user.id, name: user.name, email: user.email }, REFRESH_TOKEN_SECRET);

        // Зберігаємо refreshToken в HTTP-only cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development", // Only false during development
            sameSite: process.env.NODE_ENV !== "development" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000
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

        const accessToken = jwt.sign({ id: user.id, name: user.name, email: user.email }, ACCESS_TOKEN_SECRET, { expiresIn: "15min" });
        const refreshToken = jwt.sign({ id: user.id, name: user.name, email: user.email }, REFRESH_TOKEN_SECRET);

        // Зберігаємо refreshToken в HTTP-only cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development", // Only false during development
            sameSite: process.env.NODE_ENV !== "development" ? "none" : "lax",
            maxAge:3* 24 * 60 * 60 * 1000
        });
        res.json({ userId: user.id, accessToken });
    } catch (error) {
        next(error);
    }
}
export async function refresh(req: Request, res: Response, next: NextFunction) {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            throw new CustomApiError("Refresh token is required", 400);
        }

        // Use promisify to handle jwt.verify properly in async function
        try {
            const user = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as JwtPayload;

            const newAccessToken = jwt.sign(
                { id: user.id, name: user.name, email: user.email },
                ACCESS_TOKEN_SECRET,
                { expiresIn: "15min" }
            );

            const newRefreshToken = jwt.sign(
                { id: user.id, name: user.name, email: user.email },
                REFRESH_TOKEN_SECRET
            );

            // Set the new refresh token as an HTTP-only cookie
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                // secure: process.env.NODE_ENV === "production",
                // sameSite: "strict",
                sameSite: "none",
                // path: "/refresh",
                maxAge: 24 * 60 * 60 * 1000
            });

            res.json({ userId: user.id, accessToken: newAccessToken });
        } catch (err) {
            throw new CustomApiError("Invalid token", 403);
        }
    } catch (error) {
        next(error);
    }
}