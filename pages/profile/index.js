import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthNotFound from "../../components/authNotfound";

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
    <div className="py-8 px-10 bg-slate-100">
      <div className="bg-white p-5 rounded-lg">
        <div className="text-lg font-bold p-2">Account inforomation</div>
        {userInfo && (
          <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(userInfo).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2 overflow-hidden truncate">
                <p className="text-gray-500 font-semibold">{key}:</p>
                <p className="text-gray-800">{value}</p>
              </div>
            ))}
          </div>
        </div>
        )}
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={checkuser}
        >
          Show User Info
        </button>
      </div>
      <div className="bg-white p-5 rounded-lg mt-5">
        <div className="text-lg font-bold p-2 ">Update API Keys</div>
        <form onSubmit={handleKey} className="p-2">
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
    <AuthNotFound />
  );
}

export default ProfilePage;
