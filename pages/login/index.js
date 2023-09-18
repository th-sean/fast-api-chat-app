import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import useLabelArrayStore from "../../stores/store";
import useAccountInfoStore from "../../stores/store";
import withLayout from "../../components/layouts/withLayout";
import LottieAnimation from "../../components/animation/lottie-animation";
import animationData from "../../public/accounting-lottie.json";

function LoginPage() {
  const [message, setMessage] = useState("");
  const setUsername = useAccountInfoStore((state) => state.setUsername);

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
        "successfully retrive the access token to login.js" + response.data
      );
      setMessage(response.data.message);
      sessionStorage.setItem("accessToken", response.data.accessToken);
      console.log("getprofile here");
      await getProfile;

      window.location.href = "/upload";
    } catch (error) {
      // setMessage(error.response.data.message);
    }
  };

  async function getProfile() {
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
    <div className="min-h-screen flex flex-col md:flex-row bg-skyblue-300">
      {/* Left Side Content */}

   
        <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 bg-blue-600">
        <div className="absolute top-6 left-6 text-white text-xl font-bold">Knowledge AI</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white w-full text-center mt-20">
            Empower Your Documents with AI
          </h1>
          <p className="text-gray-200 mb-4 text-center">
            Upload your documents and let our AI analyze them. We'll find the
            right documents for you, provide valuable accounting information,
            and more.
          </p>
          <LottieAnimation
            animationData={animationData}
            width={500}
            height={500}
          />
        </div>
    

      {/* Right Side Content */}
      <div className="flex-1 flex justify-center items-center p-6 md:p-0">
        <div className="bg-white p-4 md:p-8 w-full md:w-auto rounded-lg">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Login to Knowledge AI
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Email
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                required
              />
            </div>
            {message && <p className="text-xs text-red-500 mb-3">{message}</p>}
            <div className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              <button
                className="w-full text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
          <p className="mt-4 text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-500 font-medium hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default withLayout(LoginPage, "login");
