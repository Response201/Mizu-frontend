import { createBrowserRouter } from "react-router-dom";

import { Layout } from "./Layout";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { NotFound } from "./pages/NotFound";
import { Receipts } from "./pages/Receipts";
import { PickAndMix } from "./pages/PickAndMix";
import { About } from "./pages/About";
import { Register } from "./pages/Register";
import { SignIn } from "./pages/SignIn";
import { CheckOut } from "./pages/CheckOut";
import { Payment } from "./pages/Payment";
import { PaymentComplete } from "./pages/PaymentComplete";
import { Product } from "./pages/Product";



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
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/mix",
        element: <PickAndMix />,
      },
      {
        path: "/receipts",
        element: <Receipts />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/checkout",
        element: <CheckOut />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
{

path:"/paymentComplete",
element:<PaymentComplete />

}

    ],
  },
]);

