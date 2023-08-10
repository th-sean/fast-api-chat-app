import React, { useState, useEffect, useRef } from "react";
import {
  FcOpenedFolder,
  FcCamera,
  FcDownload,
  FcViewDetails,
  FcRefresh,
} from "react-icons/fc";

// import Button from "react-bootstrap/Button";
// import FloatingLabel from "react-bootstrap/FloatingLabel";
// import Form from "react-bootstrap/Form";
// import Dropdown from "react-bootstrap/Dropdown";

function UploadPage() {
  const [fileUpload, setFileUpload] = useState(null);
  const [documentList, setDocumentList] = useState([])
  // const [documentType, setDocumentType] = useState(null);
  // const [comments, setComments] = useState("");
  const fileInput = useRef(null);

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
        Authorization : `Bearer ${sessionStorage.getItem("accessToken")}`,
        "Content-Type": "multipart/form-data",
      }

      const formData = new FormData()
      formData.append('file', new Blob([fileUpload], {type :'application/octet-stream'}))
      try {

        const response = await axios.post('http://54.193.180.218:8000/uploadfile',formData, {headers:headers });
        console.log("successfully uploaded")
        
      } catch (error) {
        console.error("Error uploading file:", error);
        return null;
      }
    }
  }

  async function getDocumentsList() {
    console.log("Get documentList")

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
      <div className="upload-container">
        <h3>Step 1 : Upload your Documents</h3>
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
              <div className="text-center">
                <div>File upload</div>

                <FcOpenedFolder className="text-2xl w-full" />
              </div>
            </button>
          </div>
          <div className="w-1/3">
            <button variant="primary" className="w-full">
              <div>Scan Document</div>
              <FcCamera className="text-2xl w-full" />
            </button>
          </div>
        </div>
        <div className="mt-3">
          <h4>Preview </h4>
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
            <div className="inline-flex items-center px-4 py-2 text-black border-1 rounded-lg text-center">
              {" "}
              There is no Preview to Display
            </div>
          )}
        </div>
        {/* Choose Category */}
        {/* <h4 className="mt-3">Add Detail</h4>
        <div className="mt-3 w-full">
          <Dropdown name="type" onSelect={handleDropdownSelect}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {documentType ? documentType : "Select Document Type"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="Check">Check</Dropdown.Item>
              <Dropdown.Item eventKey="Check">Invoice</Dropdown.Item>
              <Dropdown.Item eventKey="Receipt">Receipt</Dropdown.Item>
              <Dropdown.Item eventKey="Statement">Statement</Dropdown.Item>
              <Dropdown.Item eventKey="Other">Other</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div> */}

        {/* Comment Section */}
        {/* <div className="mt-3">
          <FloatingLabel controlId="floatingTextarea2" label="Comments">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              value={comments}
              onChange={handleCommentsChange}
              style={{ height: "100px" }}
            />
          </FloatingLabel>
        </div> */}

        <div className="mt-3">
          <button
            variant="primary"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={fileUpload === null}
            onClick={onDocumentUpload}
          >
            <div>Submit</div>
          </button>
        </div>
      </div>
      <hr></hr>
      <div>
        <div className="flex">
          <h3>Check your Documents</h3>
          <FcRefresh className="text-3xl ml-auto" onclick={getDocumentsList} />
          {documentList && documentList.map((item)=>{
            
          })}
        </div>
        <div className="w-full">
          
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
