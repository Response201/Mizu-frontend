import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/index.scss"
import "./scss/styles.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { router } from "./Router.jsx";
import { RouterProvider } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext.jsx";
/* import {  GlobalProvider } from "./context/GlobalContext.tsx"; */

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <GlobalProvider >  

    <RouterProvider router={router}></RouterProvider>

    </GlobalProvider> 
  </React.StrictMode>
);
