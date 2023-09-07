import { useState, useEffect } from "react";
import FileController from "./fileController.js";
import ChatController from "./chatController.js";
import moment from "moment";
import { useRouter } from "next/router";
import axios from "axios";

function Controller() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const router = useRouter();
  const { docId } = router.query;

  useEffect(() => {
    if (docId) {
      // Fetch the document summary or any other initial action using the docId
      fetchSummary(docId);
    }
  }, []);

  const handleClick = async () => {
    setIsLoading(true);
    const sendTime = moment().format("h:mm");
    const myMessage = { sender: "me", message: inputText, time: sendTime };
    const botLoadingMessage = {
      sender: "bot-loading",
      message: "",
      time: sendTime,
    };
  
    let messageArr = [...messages, myMessage, botLoadingMessage];
    setMessages(messageArr);
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
  
      messageArr.pop(); // Remove loading message
  
      if (response.status === 200) {
        const botMessage = response.data;
        console.log("this is bot controller " + botMessage);
        messageArr.push(botMessage);
      } else if (response.status === 401) {
        window.alert("Please login first");
      } else if (response.status === 400) {
        window.alert(response.data.detail);
      } 
    } catch (error) {
      messageArr.pop(); // Remove loading message
      const errorMessage = {
        sender: "bot",
        message: {message: error.message,},
        time: sendTime,
      };
      messageArr.push(errorMessage);
      console.error(error);
    }
  
    setMessages(messageArr);
    setIsLoading(false);
  };

  const fetchSummary = async (id) => {
    const selectedId = id;
    setIsLoading(true);
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

      console.log("is this summary?");
      if (response.status ===200) {
        const summary = await response.data;
        console.log("this is summary " + summary);
        const botMessage = summary;
        setMessages([...messages, botMessage]);
      } else {
        // handle errors like you did in the handleClick function
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const handleRefresh = async () => {
    const response = await axios.get("/api/chatbot/getClearChatHistory", {
      headers: {
        
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    })

    if(response.status ===200){
      alert("Successfully clear history")
      setMessages([]);
    } else{
      alert("failed to clear history")
    }
  };

  return (
    <div className="w-full lg:h-[calc(100%-258px)]">
      <ChatController
        inputText={inputText}
        isLoading={isLoading}
        messages={messages}
        setIsSideBarOpen={setIsSideBarOpen}
        setInputText={setInputText}
        handleClick={handleClick}
        handleRefresh={handleRefresh}
      />
      
    </div>
  );
}

export default Controller;
