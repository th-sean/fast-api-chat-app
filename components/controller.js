import { useState, useEffect, useRef } from "react";
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
  const currentChatId = useChatInfoStore((state) => state.currentChatId);
  const setCurrentChatId = useChatInfoStore((state) => state.setCurrentChatId);
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
    let chatId = currentChatId;
    if (!chatId) {
      chatId = await setNewChatId();
    }

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
      chat_id: chatId,
      message: inputText,
    };
    console.log('About to make Axios call');
    try {
      const response = await axios.post("/api/chatbot/postBotMessage", data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        timeout: 180000,
      });
      console.log('Axios call completed');
      popChatArray();

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
      popChatArray();
      if (
        error.code === "ECONNABORTED" &&
        error.message.indexOf("timeout") !== -1
      ) {
        const timeoutMessage = {
          sender: "bot",
          message: {
            message: "The request took too long! Please try again later.",
          },
          time: sendTime,
        };
        addChatArray(timeoutMessage);
      } else {
        const errorMessage = {
          sender: "bot",
          message: { message: error.message },
          time: sendTime,
        };
        addChatArray(errorMessage);
      }
      console.error(error);
    }
    setIsLoading(false);
  };

  async function setNewChatId() {
    try {
      console.log("chatid Not found running setNewChatId");
      const response = await axios.get("/api/chatbot/postCreateNewChat", {
        headers: {
          Authorization: `Bearer ${
            sessionStorage.getItem("accessToken") || ""
          }`,
        },
      });
      const chatId = response.data.chat_id;
      sessionStorage.setItem("current_chatId",chatId );
      setCurrentChatId(chatId);

      return chatId;
    } catch (error) {
      console.error("Error getting new chat ID", error);
      return -1;
    }
  }

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
        setInputText={setInputText}
        handleClick={handleClick}
        handleRefresh={handleRefresh}
      />
    </div>
  );
}

export default Controller;
