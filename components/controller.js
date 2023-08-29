import { useState, useEffect } from "react";
import FileController from "./fileController.js";
import ChatController from "./chatController.js";
import moment from "moment";
import { useRouter } from "next/router";

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

    // const message
    const sendTime = moment().format("h:mm");
    const myMessage = { sender: "me", message: inputText, time: sendTime };
    const botLoadingMessage = {
      sender: "bot-loading",
      message: "",
      time: sendTime,
    };
    const messageArr = [...messages, myMessage, botLoadingMessage];
    setMessages(messageArr);

    setInputText("");
    const data = {
      message: inputText,
    };
    // Console log test
    console.log(data);

    await fetch("http://54.193.180.218:8001/chain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (res.ok) {
          const mes = await res.text();
          console.log(mes);
          const botTime = moment().format("h:mm");
          const botMessage = {
            sender: "bot",
            message: mes,
            time: botTime,
          };
          messageArr.pop();
          messageArr.push(botMessage);
          setMessages(messageArr);
        } else {
          messageArr.pop();
          if (res.status === 401) {
            window.alert("please login first");
          } else if (res.status === 400) {
            const mes = await res.json();
            window.alert(mes.detail);
          } else {
            window.alert("An error occurred.");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setIsLoading(false);
  };

  const fetchSummary = async (id) => {
    setIsLoading(true);
    try {
      const res = await fetch(`http://54.193.180.218:8001/summary/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },

      });
      
      if (res.ok) {
        const summary = await res.text();
        const time = moment().format("h:mm");
        const botMessage = { sender: "bot", message: summary, time };
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
    await fetch("http://54.193.180.218:8001/clear_chat_history", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then(async (res) => {
        if (res.ok) {
          setMessages([]);
          window.alert("refreshed");
        } else if (res.status === 401) {
          window.alert("please login first");
        } else {
          const mes = await res.json();
          console.log(mes);
          window.alert(mes.detail);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full">
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
