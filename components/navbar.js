import Link from "next/link";

import { useState, useEffect, React } from "react";


const Navbar = () => {
  const [signedUser, setSignedUser] = useState(false);

  return (
    <nav className="flex justify-center pt-3 pb-3 space-x-4 border-b bg-blue-200 border-gray-300">
      {[
        ["Upload", "/upload"],
        ["Chatbot", "/chatbot"],
        ["Profile", "/profile"],
        ["Login","/login"]
      ].map(([title, url], index) => (
        <Link href={url} key={index} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slage-100 hover:text-slate-900 no-underline">
          
            {title}
        
        </Link>
      ))}

      {!signedUser && (
        // <Link href="/user" className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slage-100 hover:text-slate-900">
        //     user
        
        // </Link>
        <div></div>
      )}
    </nav>
  );
};

export default Navbar;
