import { createBrowserRouter } from "react-router-dom";

import { Layout } from "./Layout";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { NotFound } from "./pages/NotFound";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/products",
        element: <Products />,
      },
    ],
  },
]);
