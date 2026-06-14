import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'; // Tailwind CSS y estilos globales
import "./i18n" // * Manejo de idiomas

import ReactDOM from "react-dom/client";
import { router } from "./routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);