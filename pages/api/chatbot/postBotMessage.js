import axios from 'axios';
import moment from 'moment';

export default async function handler(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { message } = req.body;

  try {
    const response = await axios.post("http://54.193.180.218:8000/chain", {
      message: message
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    console.log("this is message" + response.data)
    if (response.status === 200) {
      
      const botTime = moment().format("h:mm");
      const botMessage = {
        sender: "bot",
        message: response.data,
        time: botTime,
      };
      return res.status(200).json(botMessage);
    } else if (response.status === 401) {
      return res.status(401).send("Please login first");
    } else if (response.status === 400) {
      return res.status(400).json(response.data);
    } else {
      return res.status(response.status).send("An error occurred.");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred.");
  }
}



// const handleClick = async () => {


//     // const message
//     const sendTime = moment().format("h:mm");
//     const myMessage = { sender: "me", message: inputText, time: sendTime };
//     const botLoadingMessage = {
//       sender: "bot-loading",
//       message: "",
//       time: sendTime,
//     };
//     const messageArr = [...messages, myMessage, botLoadingMessage];
//     setMessages(messageArr);

//     setInputText("");
//     const data = {
//       message: inputText,
//     };
//     // Console log test
//     console.log(data);

//     await fetch("http://54.193.180.218:8000/chain", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
//       },
//       body: JSON.stringify(data),
//     })
//       .then(async (res) => {
//         if (res.ok) {
//           const mes = await res.text();
//           console.log(mes);
//           const botTime = moment().format("h:mm");
//           const botMessage = {
//             sender: "bot",
//             message: mes,
//             time: botTime,
//           };
//           messageArr.pop();
//           messageArr.push(botMessage);
//           setMessages(messageArr);
//         } else {
//           messageArr.pop();
//           if (res.status === 401) {
//             window.alert("please login first");
//           } else if (res.status === 400) {
//             const mes = await res.json();
//             window.alert(mes.detail);
//           } else {
//             window.alert("An error occurred.");
//           }
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     setIsLoading(false);
//   };