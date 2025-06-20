import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";
import Spinner from "../components/Spinner";

const MainLayout = () => {
  const navigation = useNavigation();

  return (
    <>
      <header className="z-100 sticky top-0 bg-white shadow-sm mx-auto px-3">
        <Navbar></Navbar>
      </header>
      <main className="min-h-[calc(100vh-289px)] max-w-7xl mx-auto px-3">
        {navigation?.state === "loading" ? (
          <Spinner></Spinner>
        ) : (
          <Outlet></Outlet>
        )}
      </main>

      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
};

export default MainLayout;
