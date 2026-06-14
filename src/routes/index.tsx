import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Aloo from '../features/Aloo';
import Menora from '../features/Menora';

const router: RouteObject[] = [
  {
    path: '/',
    element: <Aloo />,
  },
  {
    path: '/menora',
    element: <Menora />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

export default router;