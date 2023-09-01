import axios from "axios";


export const config = {
  api: {
    bodyParser: false,  // Disabling body parser
  },
};

async function handler(req, res) {
  const token = req.headers.authorization.split(' ')[1]; // Extracting token for authorization
    console.log("this is reqbody check " + JSON.stringify(req))

  if (req.method === "POST") {
    const axiosConfig = {
      responseType: "stream",
      headers: {
        "accept": "application/json",
        "Authorization": `Bearer ${token}`  // Set the authorization header
      },
    };

    try {
      const { data } = await axios.post('http://54.193.180.218:8000/uploadfiles', req, axiosConfig);
      data.pipe(res);  
      res.status(200).json({
        success: true,
        message: "Upload Completed",
      });
    } catch (error) {
      // Handle errors from the backend server
      const errorMessage = error.response?.data?.message || error.message || "An error occurred.";
      res.status(error.response?.status || 500).json({
        message: errorMessage,
        success: false
      });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}

export default handler;