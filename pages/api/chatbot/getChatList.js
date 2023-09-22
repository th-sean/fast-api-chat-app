import axios from "axios";

export default async function handler(req, res) {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const response = await axios.get(
      `http://54.193.180.218:8000/get_chat_info`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const chatList = response.data.chatbots;
    rres
      .status(200)
      .json({ message: "Successfully loaded - chatList", chatList });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load messages",
    });
  }
}
