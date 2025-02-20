import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Home from "../pages/Home"
import Login from "../pages/Login"
import ProtectedRoute from "./ProtectedRoute"
export const router = createBrowserRouter([
   {
    path: "/",
    element: <App/>,
    children: [
        {
         path: "/",
         element: <ProtectedRoute>
            <Home></Home>
         </ProtectedRoute>
         },
         {
            path: "/login",
            element: <Login/>
         },
         {
            path: "/register",
            element: <h1>Register</h1>

         }
      ]
        
}
    
])
