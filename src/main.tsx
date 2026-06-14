import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// 1. Cambiamos createBrowserRouter por createHashRouter
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import router from './routes';
import './index.css'; 
import "./i18n";

// 2. Inicializamos el hash router (no requiere parámetros extra)
const appRouter = createHashRouter(router);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
    <ToastContainer />
  </StrictMode>
);