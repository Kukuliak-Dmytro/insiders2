// 
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import router from "./src/routes/routes";
import errorMiddleware from "./src/middleware/errorMiddleware";
import cookieParser from 'cookie-parser'
const app = express();
app.use(cors({
    origin: "http://localhost:5173", // Дозволяємо тільки твій фронтенд
    credentials: true // Дозволяємо передавати кукі та заголовки авторизації
}));
app.use(cookieParser())
app.use(express.json());
app.use('/', router);
app.use(errorMiddleware);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
