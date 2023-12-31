import axios from "axios";

export default async function handler(req, res) {
    const token = req.headers.authorization.split(" ")[1];

    try {
        const response = await axios.get("http://54.193.180.218:8001/users/me", {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        res.status(200).json({
            success: true,
            message: "Profile Loaded",
            response: response.data,
        });
    } catch (error) {
        const errorMessage = 
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Not authenticated";
        res.status(500).json({
            success: false,
            error: errorMessage
        });
    }
}
