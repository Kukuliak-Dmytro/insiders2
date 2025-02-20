import { Request } from 'express';
export interface JwtPayload {
    id: number;
    email: string;

}

export interface AuthRequest extends Request {
    user?: JwtPayload;
}
export class CustomApiError extends Error {
    statusCode: number;

    constructor(message: string, statusCode?: number) {
        super(message);
        this.statusCode = statusCode ?? 500;
        
    }
}
