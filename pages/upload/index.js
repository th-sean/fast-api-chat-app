import React, { useState, useEffect, useRef } from "react";
import { BsUpload, BsFilter } from "react-icons/bs";
import Modal from "react-modal";
import { AiOutlineDelete, AiOutlineClose } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

function UploadPage() {
  const [fileUpload, setFileUpload] = useState(null);
  const [documentList, setDocumentList] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const popupClassNames = `
  fixed
  bottom-4         // 1rem from the bottom
  right-4          // 1rem from the right
  w-2/3           // Popup width set to 1/3 of the screen width
  lg:w-1/4
  p-4              // Padding all around
  bg-white         // White background color
  border           // Add a border
  rounded-lg       // Large rounded corners
  shadow-xl        // Large shadow for a prominent elevation effect
`;
  // const modules = {
  //   toolbar: [
  //     [{ font: [] }],
  //     [{ size: ["small", false, "large", "huge"] }],
  //     [{ color: [] }, { background: [] }],
  //   ],
  // };
  const [showPopup, setShowPopup] = useState(false);
  const fileInput = useRef(null);
  // const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    getDocumentsList();
    const closeDropdown = (e) => {
      if (!e.target.closest(".relative")) {
        // If clicked outside the dropdown container
        setIsDropdownOpen(false);
      }
    };

    // document.addEventListener("mousedown", closeDropdown);
    // return () => {
    //   document.removeEventListener("mousedown", closeDropdown);
    // };
  }, []);

  const handleModalSubmit = () => {
    const fileTitle = modalTitle.replace(/\s+/g, "_"); // Replace spaces with underscores
    const fileContent = modalBody;

    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `${fileTitle}.txt`);

    setIsModalOpen(false);
  };

  async function onFileUpload() {
    fileInput.current.click();
  }

  function handleChange(e) {
    const fileUploaded = e.target.files[0];
    if (!fileUploaded) return;

    setFileUpload(fileUploaded);
    handleFileUpload(fileUploaded);
    setShowPopup(true);
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOpenModalClick = () => {
    setIsDropdownOpen(false);
    setIsModalOpen(true);
  };

  async function handleFileUpload(file) {
    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://54.193.180.218:8000/uploadfile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
          onUploadProgress: (progressEvent) => {
            // Calculate the progress percentage
            setUploadProgress(progressEvent);

            // Update progress or display a loading overlay
            // For example: setProgress(progress);
          },
        }
      );

      if (response.ok) {
        window.alert("File uploaded successfully");
        getDocumentsList();
      } else {
      }
    } catch (error) {
      console.log("Failed Uploaded");
    } finally {
      setUploading(false);
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
    <div className="py-8 px-10 bg-slate-100">
      <div className="bg-white p-5 rounded-lg ">
        <div className="text-lg font-bold p-2 ">All fies</div>
        <div className="flex w-full items-center justify-between">
          <div className="relative ">
            {/* Title Button */}

            <button
              onClick={toggleDropdown}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex"
            >
              <BsUpload className="text-xl mr-3" />
              <div>Upload</div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
                <button
                  className="block w-full py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={onFileUpload}
                >
                  Document
                  <input
                    type="file"
                    ref={fileInput}
                    onChange={handleChange}
                    style={{ display: "none" }}
                  ></input>
                </button>
                <button
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={handleOpenModalClick}
                >
                  Prompt
                </button>
              </div>
            )}
          </div>

          <div className="mt-3">
            {/* <div className="flex items-center mt-5">
            <div className="border border-gray-300 h-[1px] w-full mr-3"> </div>
            <div className ="font-medium">Preview</div>
            <div className="border border-gray-300 h-[1px] w-full ml-3"></div>
          </div> */}

            {/* {fileUpload ? (
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
          )} */}
          </div>
          <div className="relative ml-4 w-full">
            {/* Input Field */}
            <input
              type="text"
              className="border rounded-md pl-10 pr-4 py-2 focus:border-blue-400 focus:outline-none"
              placeholder="Search..."
            />

            {/* Absolute-positioned icon */}
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <FaSearch />
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-gray-300 flex">
            <BsFilter className="text-xl mr-3" />
            <div>Filter</div>
          </button>
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2>File name</h2>
          <input
            type="text"
            value={modalTitle}
            onChange={(e) => setModalTitle(e.target.value)}
          />
          <h2>Modal Body</h2>
          {/* <ReactQuill 
                value={editorContent}
                onChange={setEditorContent}
            /> */}
          <button onClick={handleModalSubmit}>Submit</button>
        </Modal>
      </div>
      <hr></hr>
      <div className="bg-white p-5 rounded-lg mt-4">
        <div>
          <div className="text-lg font-bold p-2 ">Check your Documents</div>
          <div></div>
          {documentList &&
            documentList.map((item, index) => (
              <div
                key={index}
                className="flex border flex items-center font-medium p-3 rounded-lg hover:shadow-lg hover:bg-gray-200  transition duration-300 m-2"
              >
                <div className="overflow-hidden truncate">{item.file_name}</div>
                <div className="ml-auto hover:bg-gray-100 p-2 rounded-lg">
                  <AiOutlineDelete className="text-red-500 text-xl" />
                </div>
              </div>
            ))}
        </div>
      </div>
      {showPopup && (
        <div className={popupClassNames}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold overflow-hidden truncate">
              {uploadProgress.progress === 1
                ? "Completed"
                : `Uploading... ${Math.round(uploadProgress.progress * 100)}%`}
            </h2>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-red-500 text-white rounded p-2 hover:bg-red-600"
            >
              <AiOutlineClose/>
            </button>
          </div>
          <div className="flex justify-between items-center mb-4 ">
            <h2 className="text-xs overflow-hidden truncate">
              {fileUpload ? <div> {fileUpload.name}</div> : <div>Null</div>}{" "}
            </h2>
            <p className="font-bold text-xs">
              {(uploadProgress.progress * 100).toFixed(0)}%
            </p>
          </div>

          <div className="bg-gray-300 w-full h-4 rounded mt-2">
            <div
              className="bg-blue-500 h-4 rounded"
              style={{
                width: `${(uploadProgress.progress * 100).toFixed(0)}%`,
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadPage;
