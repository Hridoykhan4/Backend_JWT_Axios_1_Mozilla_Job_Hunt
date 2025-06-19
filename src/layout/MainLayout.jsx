import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";

const MainLayout = () => {
  return (
    <>
      <header className="z-100 sticky top-0 bg-white shadow-sm mx-auto px-3">
        <Navbar></Navbar>
      </header>
      <main className="min-h-[calc(100vh-289px)] max-w-7xl mx-auto px-3">
        <Outlet></Outlet>
      </main>

      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
};

export default MainLayout;
