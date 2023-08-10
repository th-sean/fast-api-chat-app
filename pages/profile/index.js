import React, { useState, useEffect } from "react";
import axios from "axios";

function ChatbotPage() {
  

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken')
  }, []);

  async function checkuser() {

    
    console.log("Session in component:", token);
    const response = await axios
      .get("http://54.193.180.218:8000/users/me",{}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

      if(response){
        console.log("this is response ", response.data.chroma_path);
      }
      
  }

//   if (!userData) {
//     return <div>Please Login to continue</div>;
//   }

  return (
    <div>
      {/* Display user data or your chatbot UI here */}
      <p>Hello, </p>
      {/* ... other UI components */}
    </div>
  );
}

export default ChatbotPage;
