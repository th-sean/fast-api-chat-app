import axios from "axios";
import moment from "moment";

export default async function handler(req, res) {
  const token = req.headers.authorization.split(" ")[1];

  const { chat_id } = req.body;

  try {
    const response = await axios.get(
      `http://54.193.180.218:8000/delete_chat/${chat_id}`,
      {
        message: message,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.status(200).json({ message: response.data });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete chat",
    });
  }
}
