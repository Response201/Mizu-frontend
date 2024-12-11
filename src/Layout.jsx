import { Outlet } from "react-router-dom";
import { Navigation } from "./components/layout/Navigation";
import CustomCursors from "./components/layout/CustomCursors";


export const Layout = () => {
  return (
    <article>
    <CustomCursors />
      <header>{<Navigation />}</header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </article>
  );
};
