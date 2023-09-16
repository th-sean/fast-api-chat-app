import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineCloudUpload,
  AiOutlineLogin,
} from "react-icons/ai";

import {
  PiUploadDuotone,
  PiChatTeardropTextDuotone,
  PiUserCircleDuotone,
} from "react-icons/pi";

import { FaFileLines, FaGoogleDrive } from "react-icons/fa6";
import { BsChat } from "react-icons/bs";
import Image from "next/image";
import useAccountInfoStore from "../stores/store.js";
import axios from "axios";
import { useRouter } from "next/router";
import firstLetterCapitalized from "../utils/stringManimupaltion.js";

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
    icon: <PiUploadDuotone className="w-4 h-4" />,
    text: "Manage Document",
    link: "/upload",
  },
  {
    icon: <PiChatTeardropTextDuotone className="w-4 h-4" />,
    text: "Conversation",
    link: "/chatbot",
  },
  {
    icon: <PiUserCircleDuotone className="w-4 h-4" />,
    text: "Account",
    link: "/profile",
  },
];

const TabItems = ({
  setSelectedTabIndex,
  selectedTabIndex,
  setShowCreateModal,
}) => {
  return (
    <div>
      <div className="flex justify-center align-middle px-5 pt-4 pb-3">
        <button
          className="transition-all duration-200 relative font-semibold shadow-sm outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm bg-blue-600 text-white ring-0 ring-blue-600 hover:ring-2 active:ring-0 w-full"
          onClick={() => setShowCreateModal(true)}
        >
          + Create content
        </button>
      </div>
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`${
            selectedTabIndex === index
              ? "text-blue-800 text-sm font-medium"
              : ""
          } mx-4 flex py-2 items-center justify-center align-center rounded hover:bg-gray-100 font-medium transition duration-300`}
          onClick={() => setSelectedTabIndex(index)}
        >
          <div className="ml-3 text-sm mr-3">{tab.icon}</div>
          <Link href={tab.link} className="w-full text-sm">
            {tab.text}
          </Link>
        </div>
      ))}
    </div>
  );
};

const CreateContentModal = ({ showModal, setShowCreateModal }) => {
  return (
    showModal && (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
        <div className="bg-white rounded">
          <div className="p-6 space-y-4 border-b">
            <h1 className="mb-2 text-lg font-semibold text-gray-900">
              Upload new content...
            </h1>
            <p className="text-sm font-normal text-gray-600">
              You can upload document from local device or Google drive
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 p-6 border-b">
            <button className="p-4 ring-1 ring-gray-200 rounded-2xl text-left space-y-3 hover:ring-gray-300 active:ring-gray-400">
              <div className="flex items-center space-x-3">
                <FaFileLines className="w-4 h-4 text-blue-800" />
                <div className="text-indigo-700 text-base font-semibold">
                  + Upload document
                </div>
              </div>
              <div>Upload your files from local device (.pdf, .png, .html)</div>
            </button>
            <button className="p-4 ring-1 ring-gray-200 rounded-2xl text-left space-y-3 hover:ring-gray-300 active:ring-gray-400">
              <div className="flex items-center space-x-3">
                <FaGoogleDrive className="w-4 h-4 text-red-800" />
                <div className="text-red-700 text-base font-semibold">
                  + Google drive
                </div>
              </div>
              <div>Get your files securely from Google drive</div>
            </button>
          </div>
          <div className="flex justify-end p-6">
            <button
              className="transition-all duration-200 relative font-medium shadow-sm outline-none hover:outline-none focus:outline-none rounded-lg px-4 py-2 text-base bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-2 active:ring-1"
              onClick={() => setShowCreateModal(false)}
            >
              <span className="flex items-center justify-center mx-auto space-x-2 select-none font-semibold">
                Cancel
              </span>
            </button>
          </div>
        </div>
      </div>
    )
  );
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
      {/* {labelArray.map((label, index) => (
        <div
          className="bg-blue-500 rounded text-white text-xs p-1 m-1"
          key={index}
        >
          # {label}
        </div>
      ))} */}
    </div>
  );
}

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [token, setToken] = useState("");
  const username = useAccountInfoStore((state) => state.username);
  const router = useRouter(); // Get the router object
  const [showCreateModal, setShowCreateModal] = useState(false);

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
    <div className="">
      {/* Desktop Navigation */}

      <div className="hidden lg:block relative h-screen overflow-y-hidden w-64 bg-gray-50 transition-transform transform translate-x-0 transition duration-300 flex flex-col">
        <div className="">
          <div className="flex items-center justify-between h-12 px-4 border-gray-200 hover:bg-gray-100 border-b">
            <div className="flex items-center ">
              <div className="bg-green-800 text-xs w-6 h-6 aspect-1 rounded-full font-bold text-white flex items-center justify-center">
                {firstLetterCapitalized(username)}
              </div>
              <div className="text-black-800 truncate ml-2 font-medium">
                {username}
              </div>
            </div>
            <Link href={"/login"} className="text-sm">
              <AiOutlineLogin className="text-xl" />
            </Link>
          </div>
        </div>
        <div className="pb-2 flex-0 border-b border-gray-200 mt-2 ">
          <TabItems
            setSelectedTabIndex={setSelectedTabIndex}
            selectedTabIndex={selectedTabIndex}
            setShowCreateModal={setShowCreateModal}
          />
        </div>
        <InterestItems />

        <div className="flex-grow overflow-y-auto">
          <div className="text-sm text-gray-600 pl-5 pt-2">Chat</div>
          <div className="flex justify-center align-middle px-5 pt-4 pb-3">
            <button
              className="transition-all duration-200 relative font-semibold  outline-none hover:outline-none focus:outline-none rounded-md px-3 py-1.5 text-sm border-gray-600 text-gray-500 ring-0 ring-gray-600 hover:ring-2 active:ring-0 w-full"
              onClick={() => {}}
            >
              <Link href={"/chatbot"}>
            New Conversation
          </Link>
            </button>
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
              
              <TabItems
                setSelectedTabIndex={setSelectedTabIndex}
                selectedTabIndex={selectedTabIndex}
                setShowCreateModal={setShowCreateModal}
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

      <CreateContentModal
        showModal={showCreateModal}
        setShowCreateModal={setShowCreateModal}
      />
    </div>
  );
};

export default Navbar;
