import { Request } from 'express';
export interface JwtPayload {
    email: string;
}

export interface AuthRequest extends Request {
    user?: JwtPayload;
}
