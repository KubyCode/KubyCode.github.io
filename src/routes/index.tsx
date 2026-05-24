// src/routes/index.tsx
import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Aloo from '../features/Aloo';


const router: RouteObject[] = [
  {
    path: '/',
    element: <Aloo />,
  },

  {
    // Ruta catch-all → redirige al inicio
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

export default router;