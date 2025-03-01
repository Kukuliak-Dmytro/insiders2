import { createBrowserRouter } from "react-router";
import App from "./App";
import LoginPage from "./pages/Login";

export const router=createBrowserRouter([
    {
        path:'/',
        element:<App></App>,
        children:[
            {
                path:'/',
                element: <h1>Welcome to the home page!</h1>
                
            },
            {
                path:'/login',
                element: <LoginPage/>
            }
        ]
    }
])