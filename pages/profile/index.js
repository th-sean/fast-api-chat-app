import React, { useState, useEffect } from "react";
import axios from "axios";

function ProfilePage() {
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    setToken(sessionStorage.getItem("accessToken"));
    console.log("this is token at chatbotpage" + token);
  }, []);

  async function checkuser() {
    console.log("Session in component:", token);

    try {
      const response = await axios.get("http://54.193.180.218:8000/users/me", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });
      setUserInfo(response.data);
      console.log("this is response ", response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  async function handleKey(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const openai_key = formData.get("openai_key");
    const serp_key = formData.get("serp_key");

    console.log("this is openai_key" + openai_key);
    console.log("this is serp_key" + serp_key);

    const bodyRequest = {
      openai_key: openai_key,
      serp_key: serp_key,
    };
    try {
      const response = await axios.post(
        "http://54.193.180.218:8000/set_api",
        bodyRequest,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setUserInfo(response.data);
      console.log("api key has been updated ", response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  //   if (!userData) {
  //     return <div>Please Login to continue</div>;
  //   }

  return token && token.length > 0 ? (
    <div>
      <div>Show me curret user inforomation</div>
      {userInfo && (
        <div className="text-xs text-gray-500 mb-3">
          <p className="text-xs text-gray-500 mb-3">{"id : " + userInfo.id}</p>
          <p className="text-xs text-gray-500 mb-3">
            {"username : " + userInfo.username}
          </p>
          <p className="text-xs text-gray-500 mb-3">
            {"chroma_path : " + userInfo.chroma_path}
          </p>
          <p className="text-xs text-gray-500 mb-3">
            {"openai_key : " + userInfo.openai_key}
          </p>
          <p className="text-xs text-gray-500 mb-3">
            {"serp_key : " + userInfo.serp_key}
          </p>
          <p className="text-xs text-gray-500 mb-3">
            {"email : " + userInfo.email}
          </p>
          <p className="text-xs text-gray-500 mb-3">
            {"full_name : " + userInfo.full_name}
          </p>
          <p className="text-xs text-gray-500 mb-3">
            {"disabled : " + userInfo.disabled}
          </p>
        </div>
      )}
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={checkuser}
      >
        Load User Info
      </button>
      <div>
        <div className="mt-5">Update Openai_Key/Update sero_key</div>
        <form onSubmit={handleKey}>
          <div className="mb-4">
            <label
              htmlFor="openai_key"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Openai_Key:
            </label>
            <input
              type="text"
              id="openai_key"
              name="openai_key"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-skyblue-200"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="serp_key"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              serp_key:
            </label>
            <input
              type="serp_key"
              id="serp_key"
              name="serp_key"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-skyblue-200"
              required
            />
          </div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Update Change
          </button>
        </form>
      </div>
    </div>
  ) : (
    <div>please login </div>
  );
}

export default ProfilePage;
