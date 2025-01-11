import { Outlet } from "react-router-dom";
import { Navigation } from "./components/layout/nav/Navbar";
import CustomCursors from "./components/layout/CustomCursors";
import { Notify } from "./components/layout/Notify";



export const Layout = () => {





  return (
    <article>
      {/* Custom cursor */}
      <CustomCursors />


      <header>

        {/* Navbar */}
        <Navigation />

      </header>


      <main>

        {/* Renders child route content dynamically based on the current route */}
        <Outlet />

        {/* Notification component -> display messages */}
        <Notify />
      </main>



    </article>
  );
};
