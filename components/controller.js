import { useState, useEffect,useRef } from "react";
import FileController from "./fileController.js";
import ChatController from "./chatController.js";
import moment from "moment";
import { useRouter } from "next/router";
import axios from "axios";
import useChatInfoStore from "../stores/chatStore.js";

function Controller() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const router = useRouter();

  const chatArray = useChatInfoStore((state) => state.chatArray);
  const setChatArray = useChatInfoStore((state) => state.setChatArray);
  const addChatArray = useChatInfoStore((state) => state.addChatArray);
  const popChatArray = useChatInfoStore((state) => state.popChatArray);

  const summarizeId = useChatInfoStore((state) => state.summarizeId);
  const setSummarizeId = useChatInfoStore((state) => state.setSummarizeId);

  const isApiCallInProgress = useRef(false);

  useEffect(() => {
   if (!isApiCallInProgress.current) {
       isApiCallInProgress.current = true;
       fetchSummary(summarizeId).then(() => {
           isApiCallInProgress.current = false;
       });
   }
  }, [summarizeId]);

  const handleClick = async () => {
    setIsLoading(true);
    const sendTime = moment().format("h:mm");
    const myMessage = { sender: "me", message: inputText, time: sendTime };
    const botLoadingMessage = {
      sender: "bot-loading",
      message: "",
      time: sendTime,
    };

    addChatArray(myMessage);
    addChatArray(botLoadingMessage);
    setInputText("");

    const data = {
      message: inputText,
    };

    try {
      const response = await axios.post("/api/chatbot/postBotMessage", data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

      popChatArray(); // Remove loading message

      if (response.status === 200) {
        const botMessage = response.data;
        console.log("this is bot controller " + botMessage);
        addChatArray(botMessage);
      } else if (response.status === 401) {
        window.alert("Please login first");
      } else if (response.status === 400) {
        window.alert(response.data.detail);
      }
    } catch (error) {
      popChatArray(); // Remove loading message
      const errorMessage = {
        sender: "bot",
        message: { message: error.message },
        time: sendTime,
      };
      addChatArray(errorMessage);
      console.error(error);
    }
    setIsLoading(false);
  };

  const fetchSummary = async (id) => {
    const selectedId = id;
    setIsLoading(true);
    const sendTime = moment().format("h:mm");
    
    const botLoadingMessage = {
      sender: "bot-loading",
      message: "",
      time: sendTime,
    };
    
    addChatArray(botLoadingMessage);

    try {
      const response = await axios.post(
        `/api/chatbot/getSummary`,
        { selectedId: selectedId },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      popChatArray();
      console.log("is this summary?");
      if (response.status === 200) {
        const summary = await response.data;
        console.log("this is summary " + summary);
        addChatArray(summary);
      } else {
        // handle errors like you did in the handleClick function
      }
    } catch (err) {
      popChatArray();
      console.log(err);
    }
    setIsLoading(false);
    setSummarizeId(-1);
  };

  const handleRefresh = async () => {
    const response = await axios.get("/api/chatbot/getClearChatHistory", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      alert("Successfully clear history");
      setChatArray([]);
    } else {
      alert("failed to clear history");
    }
  };

  return (
    <div className="w-full lg:h-[calc(100%-258px)]">
      <ChatController
        inputText={inputText}
        isLoading={isLoading}
        messages={chatArray}
        setIsSideBarOpen={setIsSideBarOpen}
        setInputText={setInputText}
        handleClick={handleClick}
        handleRefresh={handleRefresh}
      />
    </div>
  );
}

export default Controller;
