import HamburgerNavbar from "../components/navbar";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import DesktopDrawer from "../components/desktopDrawer";

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col h-screen lg:flex-row">
      <div className="hidden lg:block">
        <DesktopDrawer />
      </div>
      <HamburgerNavbar className="lg:hidden fixed top-0" />
      <div className="w-full overflow-y-auto bg-slate-100">
        <div className="flex-grow overflow-y-auto ">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

export default MyApp;
