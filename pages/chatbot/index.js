import { useSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'

function ChatbotPage() {
  const { data: session } = useSession();
  const [userData, setUserData] =useState(null);

  useEffect(() => {
    if (session) {
      
      const token = session.user.token;
      console.log("this is token. right? " +session)
      fetch("http://54.193.180.218:8000/users/me", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => {
        setUserData(data);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
    }
  }, [session]);

  if (!userData) {
    return <div>Please Login to continue</div>;
  }

  return (
    <div>
      {/* Display user data or your chatbot UI here */}
      <p>Hello, {userData.name}!</p>
      {/* ... other UI components */}
    </div>
  );
}

export default ChatbotPage;
