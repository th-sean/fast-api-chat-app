import Navbar from "../components/navbar";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";


function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Navbar />
      <div className="py-8 px-10 bg-slate-100">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
