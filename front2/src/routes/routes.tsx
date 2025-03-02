import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";

import AllTodosPage from "@/pages/AllTodosPage";
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App></App>,
        children: [
            {
                path: '/',
                element:
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>

            },
            {
                path:'/lists',
                element:
                <ProtectedRoute>
                    <AllTodosPage/>
                </ProtectedRoute>
            }

        ]
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    }

])