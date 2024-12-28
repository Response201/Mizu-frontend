import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/styles.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { router } from "./Router.jsx";
import { RouterProvider } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
/* import {  GlobalProvider } from "./context/GlobalContext.tsx"; */

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <GlobalProvider >  
      <ProductProvider >  

    <RouterProvider router={router}></RouterProvider>
    </ProductProvider>
    </GlobalProvider> 
  </React.StrictMode>
);
