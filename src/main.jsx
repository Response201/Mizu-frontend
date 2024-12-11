import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/index.scss"
import "./scss/styles.scss"

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
