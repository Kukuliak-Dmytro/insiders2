import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload, AuthRequest } from "../interfaces/interface";
import  dotenv from "dotenv";
dotenv.config();
const secret = process.env.ACCESS_TOKEN_SECRET as string

export const authenticateMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
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
