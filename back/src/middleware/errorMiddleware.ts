import { ErrorRequestHandler } from "express";
import { CustomApiError } from "../types/interface";


const errorMiddleware: ErrorRequestHandler = (err: CustomApiError, _req, res, _next) => {

    if (err instanceof CustomApiError) {
        res.status(err.statusCode).json({code:err.statusCode, message: err.message });
        return;
    }

    res.status(500).json({ success: false, message: 'Internal server error' });
    console.error(err);
};

export default errorMiddleware;