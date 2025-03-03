import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { RouterProvider } from 'react-router'
import { router } from './routes/routes.tsx'
import './index.css'
createRoot(document.getElementById('root')!).render(
<StrictMode>
    
        <RouterProvider router={router}>
        </RouterProvider>
</StrictMode>


)
