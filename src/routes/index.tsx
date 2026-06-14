// src/routes/index.tsx

import { createBrowserRouter } from "react-router-dom";
import Aloo from "../features/Aloo";
import Menora from "../features/Menora";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Aloo />,
  },
  {
    path: "/menora",
    element: <Menora />,
  },
]);