import HamburgerNavbar from "../components/navbar";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import DesktopDrawer from "../components/desktopDrawer";

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden lg:block"> <DesktopDrawer/></div>
      <div className="w-full overflow-y-auto">
        <HamburgerNavbar className="lg:hidden"/>
        <div className="w-full">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

export default MyApp;
