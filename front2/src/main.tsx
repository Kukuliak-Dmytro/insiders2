import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from './routes.tsx'
import './index.css'
import { AuthProvider } from './utils/storage.tsx'
createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={router}>
    </RouterProvider>
  </AuthProvider>

)
