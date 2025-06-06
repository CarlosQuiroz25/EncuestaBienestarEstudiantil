import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './router/Router'
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={createBrowserRouter(routes)} />
    </AuthProvider>
  </StrictMode>,
)
