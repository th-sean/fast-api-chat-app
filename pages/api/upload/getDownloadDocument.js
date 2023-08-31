import axios from "axios";

export default async function handler(req, res) {
    const token = req.headers.authorization.split(" ")[1];
    console.log("this is token " + token);
    const { selectedId } = req.body;  // Changed from req.body to req.query
    
    console.log("this is document you selected " + selectedId);
    
    try {
        console.log("started");
        const response = await axios.get(`http://54.193.180.218:8000/download_file/${selectedId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            responseType: "arraybuffer", 
        });
        console.log("finished " + response.data);
        
        // Set the appropriate headers
        res.setHeader('Content-Type', response.headers['content-type']);
        res.setHeader('Content-Disposition', `attachment; filename=${response.headers['content-disposition'].split('filename=')[1]}`);
        
        // Send the blob data directly
        res.status(200).send(response.data);
        
    } catch (error) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Not authenticated";
        res.status(500).json({ message: errorMessage });
        console.log(errorMessage);
    }
}