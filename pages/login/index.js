import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import useLabelArrayStore from "../../stores/store";
import useAccountInfoStore from "../../stores/store";
import withLayout from "../../components/layouts/withLayout";

function LoginPage() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    console.log("this is username" + username);
    console.log("this is password" + password);
    try {
      const response = await axios.post("/api/login/postLogin", {
        username: username,
        password: password,
      });

      console.log(
        "successfully retrive the access token to login.js" +
          response.data
      );
      setMessage(response.data.message);
      sessionStorage.setItem("accessToken", response.data.accessToken);
      console.log("getprofile here")
      await getProfile
      
      window.location.href = "/upload";
    } catch (error) {
      // setMessage(error.response.data.message);
    }

  };

  async function getProfile() {
    const setUsername = useAccountInfoStore((state) => state.setUsername);
    const response = await axios.get("/api/getProfile", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
  
    if (response.data.success) {
      const username = response.data.response.username;
      setUsername(username);
    } else {
      
    }
  }

  return (
    <div className="bg-skyblue-300 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-skyblue-200"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-skyblue-200"
              required
            />
          </div>
          {message && <p className="text-xs text-red-500 mb-3">{message}</p>}
          <div className="w-full bg-skyblue-500 text-gray-700 py-2 rounded-lg hover:bg-skyblue-600">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Don&apos;t have an account?
          <Link
            href="/register"
            className="text-skyblue-500 font-medium hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
export default withLayout(LoginPage)
