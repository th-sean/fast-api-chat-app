import axios from "axios";
import moment from "moment";

export default async function handler(req, res) {
    const token = req.headers.authorization.split(" ")[1];
    console.log("this is token "+token)
    const {selectedId}  = req.body
    console.log("this is selected id " + selectedId)
    try {
        const response = await axios.get(`http://54.193.180.218:8001/summary/${selectedId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        console.log("can you see summary of document? "+ response.data)
        const botTime = moment().format("h:mm");
        res.status(200).json({
            sender: "bot",
            message: {message : response.data},
            time: botTime
        });
    } catch (error) {
        const botTime = moment().format("h:mm");
        const errorMessage = 
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Not authenticated";
        res.status(500).json({
            sender: "bot",
            message: {message : errorMessage},
            time: botTime
        });
    }
}


// const fetchSummary = async (id) => {
//     setIsLoading(true);
//     try {
//       const res = await fetch(`http://54.193.180.218:8001/summary/${id}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
//         },

//       });
      
//       if (res.ok) {
//         const summary = await res.text();
//         const time = moment().format("h:mm");
//         const botMessage = { sender: "bot", message: summary, time };
//         setMessages([...messages, botMessage]);
//       } else {
//         // handle errors like you did in the handleClick function
//       }
//     } catch (err) {
//       console.log(err);
//     }
//     setIsLoading(false);
//   };