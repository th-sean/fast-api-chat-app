import "../styles/globals.css";
import HamburgerNavbar from "../components/navbar";
import DesktopDrawer from "../components/desktopDrawer";
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  const showNavigation = router.pathname !== '/login';

  return (
    <div className="flex flex-col h-screen lg:flex-row">
      {showNavigation && (
        <div className="hidden lg:block">
          <DesktopDrawer />
        </div>
      )}
      {showNavigation && (
        <HamburgerNavbar className="lg:hidden fixed top-0" />
      )}
      <div className="w-full overflow-y-auto bg-slate-100">
        <div className="flex-grow overflow-y-auto ">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

export default MyApp;
