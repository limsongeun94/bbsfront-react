import Header from "./Header";
import Footer from "./Footer";
import Navigator from "./Navigator";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <main className="main-layout">
        <Header />
        <Footer />
        <Navigator />
        <section>
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default Layout;
