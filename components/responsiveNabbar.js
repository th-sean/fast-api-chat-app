import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    AiOutlineMenu,
    AiOutlineClose,
    AiOutlineUser,
    AiOutlineCloudUpload,
    AiOutlineLogin
} from 'react-icons/ai';
import { BsChat } from 'react-icons/bs';

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

const TabItems = ({ setSelectedTabIndex, selectedTabIndex }) => {
    return tabs.map((tab, index) => (
      <div
        key={index}
        className={`${
          selectedTabIndex === index ? "bg-blue-500 text-white" : ""
        } flex items-center justify-center align-center font-medium p-3 rounded-lg hover:bg-blue-200 transition duration-300 m-2`}
        onClick={() => setSelectedTabIndex(index)}
      >
        <div className="ml-3 text-sm mr-3">{tab.icon}</div>
        <Link href={tab.link} className="w-full text-sm">
          {tab.text}
        </Link>
      </div>
    ));
  };

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [token, setToken] = useState("");

    useEffect(() => {
        setToken(sessionStorage.getItem("accessToken"));
        // Other useEffect code...
    }, [token]);

    return (
        <div>
            {/* Desktop Navigation */}
            <div className="hidden lg:block relative h-screen overflow-y-hidden w-64 bg-white shadow-md z-10 transition-transform transform translate-x-0 transition duration-300">
                <div className="w-full bg-gradient-to-r from-[#542ee6] to-[#2a8ce6] h-40"></div>
                <TabItems setSelectedTabIndex={setSelectedTabIndex} selectedTabIndex={selectedTabIndex} />
            </div>

            {/* Mobile Navigation */}
            <div className="bg-slate-100 items-center justify-center p-4 relative lg:hidden">
                {drawerOpen && (
                    <div
                        className="fixed top-0 left-0 h-full w-full bg-black bg-opacity-50 z-20"
                        onClick={() => setDrawerOpen(false)}
                    >
                        <div className="absolute top-0 left-0 h-full w-64 bg-white shadow-md z-10 transition-transform transform translate-x-0 transition duration-300 custom:hidden">
                            <div className="w-full bg-gradient-to-r from-[#542ee6] to-[#2a8ce6] h-40">
                                <button
                                    className="text-2xl font-bold absolute top-0 right-0 p-4"
                                    onClick={() => setDrawerOpen(false)}
                                >
                                    <AiOutlineClose />
                                </button>
                            </div>
                            {tabs.map((tab, index) => (
                                <div
                                    key={index}
                                    className={`${
                                        selectedTabIndex === index ? "bg-blue-500 text-white" : ""
                                    } flex items-center justify-center align-center font-medium p-3 rounded-lg hover:bg-blue-200 transition duration-300 m-2`}
                                    onClick={() => {
                                        setSelectedTabIndex(index);
                                        setDrawerOpen(false);
                                    }}
                                >
                                    <div className="ml-3 text-sm mr-3">{tab.icon}</div>
                                    <Link href={tab.link} className="w-full text-sm">
                                        {tab.text}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="float-left">
                    <button onClick={() => setDrawerOpen(!drawerOpen)} className="mr-4 text-2xl">
                        <AiOutlineMenu />
                    </button>
                </div>

                <Link className="float-right relative text-2xl" href="/profile">
                    <AiOutlineUser />
                </Link>

                <div className="clear-both"></div>
            </div>
        </div>
    );
};

export default Navbar;