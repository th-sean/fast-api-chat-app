import Link from "next/link";

import { useState, useEffect, React } from "react";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineCloudUpload,
  AiOutlineLogin
} from "react-icons/ai";
import {
  BsChat
} from "react-icons/bs"
import { GrClose } from "react-icons/gr";

const Navbar = () => {
  const [signedUser, setSignedUser] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setdrawerOpen] = useState(false);
  const [token, setToken] = useState("");
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const tabs = [
    {
      icon: <AiOutlineCloudUpload className="text-xl" />,
      text: "Upload Documents",
      link: "/upload",
    },
    {
      icon: <BsChat className="text-xl" />,
      text: "Chatbot",
      link: "/chatbot",
    },
    {
      icon: <AiOutlineUser className="text-xl" />,
      text: "Account",
      link: "/profile",
    },
    {
      icon: <AiOutlineLogin className="text-xl" />,
      text: "Login",
      link: "/login",
    }
  ];

  useEffect(() => {
    setToken(sessionStorage.getItem("accessToken"));
    console.log("this is token at chatbotpage" + token);

    if (token.length == 0) {
      setSignedUser(false);
    } else {
      setSignedUser(true);
    }
  }, []);

  return (
    <div className="bg-blue-600 p-4 relative">
      {drawerOpen && (
        <div
          className="fixed top-0 left-0 h-full w-full bg-black bg-opacity-50 z-20 "
          onClick={() => setdrawerOpen(false)}
        >
          {drawerOpen && (
            <div className="absolute top-0 left-0 h-full w-64 bg-white shadow-md z-10 transition-transform transform translate-x-0 transition duration-300 ">
              <div className="w-full bg-gradient-to-r from-[#542ee6] to-[#2a8ce6] h-40">
                <button
                  className="text-2xl font-bold absolute top-0 right-0 p-4 "
                  onClick={() => setdrawerOpen(false)}
                >
                  <div className="">
                    <GrClose className="text-white" />
                  </div>
                </button>
                
              </div>
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  className={`${
                    selectedTabIndex === index ? "bg-blue-500 text-white" : ""
                  } flex items-center justify-center align-center font-medium p-3 rounded-lg hover:bg-gray-100 transition duration-300 m-2`}
                  onClick={() => {
                    setSelectedTabIndex(index);
                    setdrawerOpen(false); // Close the drawer when a tab is clicked
                  }}>
                  <div className="ml-3 text-sm mr-3">{tab.icon}</div>
                  <Link href={tab.link} className="w-full text-sm">
                    {tab.text}
                  </Link>
                </div>
              ))}
              
            </div>
          )}
        </div>
      )}

      {/* Left side */}
      <div className="float-left">
        {/* Close Button */}
        <div className="text-2xl">
          <button onClick={() => setdrawerOpen(!drawerOpen)} className="mr-4">
            <AiOutlineMenu />
          </button>
        </div>

        {/* Tabs */}
      </div>

      {/* Right side */}
      <div className="float-right relative">{/* Profile Icon */}</div>

      {/* Clear float */}
      <div className="clear-both"></div>
    </div>
  );
};

export default Navbar;
