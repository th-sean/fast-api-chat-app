import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

function ChatbotPage() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const headers = {
    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    "Content-Type": "application/json",
  };

  const handleSubmit = async () => {
    try {
      console.log("try triggered");
      const response = await axios.post(
        "http://54.193.180.218:8000/chain",
        { message: inputMessage },
        {
          headers: headers,
        }
      );
      setMessages([
        ...messages,
        { type: "user", content: inputMessage },
        { type: "api", content: response.data.message },
      ]);
      const accessToken = response.data.access_token;
      console.log("access Token Ready " + accessToken);
      sessionStorage.setItem("accessToken", accessToken);
    } catch (error) {
      console.error("Error logging in:", error);

      // If there's an error message in the response, use that, otherwise use a generic error message
    }
    setInputMessage("");
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index} className={message.type}>
            {message.type === "user" ? "User" : "API"}: {message.content}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default ChatbotPage;
