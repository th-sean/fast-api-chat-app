import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineCloudUpload,
  AiOutlineLogin,
} from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import Image from "next/image";
import useAccountInfoStore from "../stores/store.js";
import axios from "axios";
import { useRouter } from "next/router";

async function getProfile(setLabelArray, setUsername) {
  const response = await axios.get("/api/getProfile", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });

  if (response.data.success) {
    const array = response.data.response.file_labels.split(", ");
    setLabelArray(array);
    const username = response.data.response.username;
    setUsername(username);
  } else {
    setMessage(response.data.message); // Note: Make sure 'setMessage' is properly defined and accessible
  }
}

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
];

const TabItems = ({ setSelectedTabIndex, selectedTabIndex }) => {
  return tabs.map((tab, index) => (
    <div
      key={index}
      className={`${
        selectedTabIndex === index ? "bg-blue-600 text-white" : ""
      } flex items-center justify-center align-center font-medium p-3 rounded-lg hover:bg-gray-200  transition duration-300 m-2`}
      onClick={() => setSelectedTabIndex(index)}
    >
      <div className="ml-3 text-sm mr-3">{tab.icon}</div>
      <Link href={tab.link} className="w-full text-sm">
        {tab.text}
      </Link>
    </div>
  ));
};

function InterestItems() {
  const labelArray = useAccountInfoStore((state) => state.labelArray);
  const setLabelArray = useAccountInfoStore((state) => state.setLabelArray); // Get the setter function
  const setUsername = useAccountInfoStore((state) => state.setUsername);

  useEffect(() => {
    getProfile(setLabelArray, setUsername); // Pass setLabelArray to getProfile
  }, []);

  return (
    <div className="p-2 flex flex-wrap">
      {labelArray.map((label, index) => (
        <div
          className="bg-blue-500 rounded text-white text-xs p-1 m-1"
          key={index}
        >
          # {label}
        </div>
      ))}
    </div>
  );
}

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [token, setToken] = useState("");
  const username = useAccountInfoStore((state) => state.username);
  const router = useRouter(); // Get the router object
  // ... other useState and variables ...

  useEffect(() => {
    setToken(sessionStorage.getItem("accessToken"));
    const currentTabIndex = tabs.findIndex(
      (tab) => tab.link === router.pathname
    );
    if (currentTabIndex !== -1) {
      setSelectedTabIndex(currentTabIndex);
    }
  }, [token, router.pathname]);

  return (
    <div>
      {/* Desktop Navigation */}
      <div className="hidden lg:block relative h-screen overflow-y-hidden w-64 bg-white shadow-md z-10 transition-transform transform translate-x-0 transition duration-300 flex flex-col">
        <div className="w-full h-40">
          <img
            src="/assets/logo.png"
            alt="My Image"
            width={300}
            height={200}
          />
        </div>
        <TabItems
          setSelectedTabIndex={setSelectedTabIndex}
          selectedTabIndex={selectedTabIndex}
        />

        <div className="absolute mb-4 bottom-0">
          <InterestItems />

          <div className="flex justify-between bg-gray-100 p-3 m-3 rounded items-center shadow-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-black mr-4 items-center rounded">
                <AiOutlineUser className="text-4xl fill-current bg-blue-400 rounded p-1 fill-white" />
              </div>
              <div className="text-sm">{username}</div>
            </div>
            <Link href={"/login"} className="text-sm">
              <AiOutlineLogin className="text-xl" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="bg-slate-100 items-center justify-center p-4 relative lg:hidden">
        {drawerOpen && (
          <div
            className="fixed top-0 left-0 h-full w-full bg-black bg-opacity-50 z-20"
            onClick={() => setDrawerOpen(false)}
          >
            <div className="absolute top-0 left-0 h-full w-64 bg-white shadow-md z-10 transition-transform transform translate-x-0 transition duration-300 custom:hidden">
              <div className="w-full  h-40">
                <Image
                  src="/Assets/logo.png"
                  alt="My Image"
                  width={300}
                  height={200}
                />
              </div>
              <TabItems
                setSelectedTabIndex={setSelectedTabIndex}
                selectedTabIndex={selectedTabIndex}
              />
            </div>
          </div>
        )}

        <div className="float-left">
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="mr-4 text-2xl"
          >
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
