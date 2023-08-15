import React, { useState, useEffect, useRef } from "react";
import {
  FcOpenedFolder,
  FcCamera,
  FcDownload,
  FcViewDetails,
  FcRefresh,
} from "react-icons/fc";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";

// import Button from "react-bootstrap/Button";
// import FloatingLabel from "react-bootstrap/FloatingLabel";
// import Form from "react-bootstrap/Form";
// import Dropdown from "react-bootstrap/Dropdown";

function UploadPage() {
  const [fileUpload, setFileUpload] = useState(null);
  const [documentList, setDocumentList] = useState([]);
  // const [documentType, setDocumentType] = useState(null);
  // const [comments, setComments] = useState("");
  const fileInput = useRef(null);

  useEffect(() => {
    getDocumentsList();
  }, []);

  async function onFileUpload() {
    fileInput.current.click();
  }
  function handleChange(e) {
    const fileuploaded = e.target.files[0];
    if (!fileuploaded) return;
    setFileUpload(fileuploaded);
  }

  // const handleDropdownSelect = (eventKey) => {
  //   setDocumentType(eventKey);
  // };

  // const handleCommentsChange = (event) => {
  //   setComments(event.target.value);
  // };

  async function onDocumentUpload() {
    if (fileUpload) {
      const headers = {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      };

      const formData = new FormData();
      formData.append("file", fileUpload);

      const response = await axios
        .post("http://54.193.180.218:8000/uploadfile", formData, {
          headers: headers,
        })
        .then(async (response) => {
          if (response.ok) {
            window.alert("File uploaded successfully");
            getFiles();
          } else {
            const mes = await response;
            console.log(mes);
            window.alert(mes.detail);
          }
        })
        .catch((error) => {
          console.log("failed Uploaded");
        });
      console.log("successfully uploaded");
    }
  }

  async function getDocumentsList() {
    console.log("Get documentList");

    try {
      const response = await axios.get("http://54.193.180.218:8000/get_files", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });
      setDocumentList(response.data);
      console.log("this is response ", response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  return (
    <div>
      <div className="bg-white p-5 rounded-lg">
        <div className="text-lg font-bold p-2 ">Upload your Documents</div>
        {/* Button section */}
        <div className="flex w-full justify-around mt-3 ">
          <div className="w-1/3">
            <button
              variant="primary"
              onClick={onFileUpload}
              className=" w-full"
            >
              <input
                type="file"
                ref={fileInput}
                onChange={handleChange}
                style={{ display: "none" }}
              ></input>
              <div className="text-center border p-5 rounded hover:bg-gray-100 rounded transition duration-200">
                <div className ="font-medium">Choose File</div>

                <FcOpenedFolder className="text-2xl w-full" />
              </div>
            </button>
          </div>
          <div className="w-1/3">
            <button variant="primary" className="w-full p-5 border text-center border p-5 rounded hover:bg-gray-100 rounded transition duration-200">
              <div className ="font-medium ">Scan </div>
              <FcCamera className="text-2xl w-full" />
             
            </button>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-center mt-5">
            <div className="border border-gray-300 h-[1px] w-full mr-3"> </div>
            <div className ="font-medium">Preview</div>
            <div className="border border-gray-300 h-[1px] w-full ml-3"></div>
          </div>

          {fileUpload ? (
            <div className="inline-flex items-center px-4 py-2 text-black border-1 rounded-lg cursor-pointer w-full ">
              <FcDownload className="text-lg mr-3" />
              <a
                class="no-underline"
                target="_blank"
                href={URL.createObjectURL(fileUpload)}
              >
                {fileUpload.name}
              </a>
              <div className="ml-auto">
                {(fileUpload.size / 1048576).toFixed(2)} MB
              </div>
            </div>
          ) : (
            <div className="inline-flex items-center px-4 py-2 text-black border-1 rounded-lg text-center w-full justify-center">
              {" "}
              Preview Not avaiable
            </div>
          )}
        </div>

        <div className="mt-3">
          <button 
            variant="primary"
            className={`${fileUpload === null? "bg-gray-400 text-white w-full hover:bg-gray-500 rounded transition duration-200" : "w-full bg-blue-500 hover:bg-vlue-500 rounded transition duration-200"} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"`}
            disabled={fileUpload === null}
            onClick={onDocumentUpload}
          >
            <div>{fileUpload === null? "No file":"Upload your Document"}</div>
          </button>
        </div>
      </div>
      <hr></hr>
      <div className="bg-white p-5 rounded-lg mt-4">
        <div>
          <div className="text-lg font-bold p-2 ">Check your Documents</div>
          {documentList &&
            documentList.map((item, index) => (
              <div
                key={index}
                className="flex border flex items-center font-medium p-3 rounded-lg hover:shadow-lg hover:bg-gray-200  transition duration-300 m-2"
              >
                <div>{item}</div>
                <div className="ml-auto hover:bg-gray-100 p-2 rounded-lg">
                  <AiOutlineDelete className="text-red-500 text-xl" />
                </div>
              </div>
            ))}
        </div>
        <div className="w-full"></div>
      </div>
    </div>
  );
}

export default UploadPage;
