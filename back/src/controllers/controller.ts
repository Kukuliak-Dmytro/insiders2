import bcrypt from "bcrypt";
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

        res.json({ accessToken });
    } catch (error) {
        next(error);
    }
}
export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body;

        const user = await authLogin({ email, password });

        const accessToken = jwt.sign({ id: user.id, name: user.name, email: user.email }, secret, { expiresIn: "1h" });
        const refreshToken = jwt.sign({ id: user.id, name: user.name, email: user.email }, secret);
        res.json({ accessToken: accessToken, refreshToken: refreshToken });
        // res.cookie("refreshToken", refreshToken, { httpOnly: true });
        res.json({ accessToken });
    } catch (error) {
        next(error);
    }
}
export async function refresh(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers["authorization"];
        const refreshToken = authHeader && authHeader.split(" ")[1]; // Відділяємо "Bearer"


        if (!refreshToken) {
            throw new CustomApiError("Refresh token is required", 400);
        }
        jwt.verify(refreshToken, secret, (err, decoded) => {
            if (err) {
                throw new CustomApiError("Invalid token", 403);
            }
            const user = decoded as JwtPayload;
            const accessToken = jwt.sign({ id: user.id, name: user.name, email: user.email }, secret, { expiresIn: "1h" });
            const refreshToken = jwt.sign({ id: user.id, name: user.name, email: user.email }, secret);
            res.json({ accessToken: accessToken, refreshToken: refreshToken });
        }
        )

    }
    catch (error) {
        next(error);
    }
}