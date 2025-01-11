import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/styles.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { router } from "./Router.jsx"; // The routing configuration of the app
import { RouterProvider } from "react-router-dom"; // Provides routing functionality for the app
import { GlobalProvider } from "./context/GlobalContext.jsx"; // Global state provider for the app
import { ProductProvider } from "./context/ProductContext.jsx"; // Context provider for managing product data
import { CartProvider } from "./context/CartContext.jsx"; // Context provider for managing the cart state



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

       {/* Wrapping the app with multiple context providers to manage global, product, and cart states */}
     <GlobalProvider >  
      <CartProvider>  
      <ProductProvider >  
  {/* The RouterProvider sets up routing using the configured router */}
    <RouterProvider router={router}></RouterProvider>
    </ProductProvider>
    </CartProvider>
    </GlobalProvider> 
  </React.StrictMode>
);
