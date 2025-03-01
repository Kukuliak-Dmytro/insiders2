import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App></App>,
        children: [
            {
                path: '/',
                element: <ProtectedRoute><Home /></ProtectedRoute>

            },
            {
                path: '/login',
                element: <LoginPage />
            }
        ]
    }
])