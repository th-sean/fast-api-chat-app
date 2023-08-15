import Navbar from "../components/navbar";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";


function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Navbar />
      <div className="">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
