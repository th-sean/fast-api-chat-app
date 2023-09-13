import "../styles/globals.css";
import Navbar from "../components/responsiveNavbar"; // Import the merged Navbar
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

function MyApp({ Component, pageProps }) {
    
    const router = useRouter();

    // Determine if the navigation should be shown based on the current route
    const showNavigation = router.pathname !== '/login' && router.pathname !== '/register';

    return (
        <div className={"flex flex-col h-screen lg:flex-row " +inter.className}>
            {showNavigation && <Navbar />}
            <div className="w-full overflow-y-auto bg-slate-100">
                <div className="flex-grow overflow-y-auto">
                    <Component {...pageProps} />
                </div>
            </div>
        </div>
    );
}

export default MyApp;