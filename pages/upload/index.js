import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useRouter } from "next/router";
import { BsUpload, BsFilter } from "react-icons/bs";
import { AiOutlineDelete, AiOutlineClose } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import Spinner from "../../components/animation/spinner";

// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

function UploadPage() {
  const [fileUpload, setFileUpload] = useState(null);
  const [documentList, setDocumentList] = useState([]);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteConfirmOpen] = useState(false);
  const [fileIdToDelete, setFileIdToDelete] = useState(null);
  const [fileInfoToDelete, setFileInfoToDelete] = useState(null);
  const [PromptModalTitle, setPromptModalTitle] = useState("");
  const [PromptModalBody, setPromptModalBody] = useState("");
  const [deleteStatus, setDeleteStatus] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const [showPopup, setShowPopup] = useState(false);
  const fileInput = useRef(null);
  const [showUploadDropdown, setShowUploadDropdown] = useState(false);
  const [showKebabDropdown, setShowKebabDropdown] = useState(false);
  const dropdownUploadRef = useRef(false);
  const dropdownKebabRef = useRef(false);
  const router = useRouter();

  const openDeleteModal = (item, fileId) => {
    setFileIdToDelete(fileId);
    setFileInfoToDelete(item);
    setDeleteConfirmOpen(true);
  };

  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    fetchUploadedDocuments();
    const handleClickOutside = (event) => {
      const isOutsideUploadDropdown =
        showUploadDropdown &&
        dropdownUploadRef.current &&
        !dropdownUploadRef.current.contains(event.target);
      const isOutsideKebabDropdown =
        showKebabDropdown !== null &&
        dropdownKebabRef.current &&
        !dropdownKebabRef.current.contains(event.target);

      if (isOutsideUploadDropdown || isOutsideKebabDropdown) {
        handleCloseDropdowns();
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  async function handleFileChoose() {
    fileInput.current.click();
  }

  function handleFileChange(e) {
    const fileUploaded = e.target.files;
    if (!fileUploaded) return;
    setFileUpload(fileUploaded);
    handleFileUpload(fileUploaded);
    setShowPopup(true);
    setShowUploadDropdown(null);
  }

  const handlePromptOpen = () => {
    setShowUploadDropdown(false);
    setIsPromptModalOpen(true);
  };

  const toggleUploadDropdown = (event) => {
    event.stopPropagation();
    setShowUploadDropdown(!showUploadDropdown);
  };

  const toggleKebabDropdown = (event, index) => {
    event.stopPropagation();
    setShowKebabDropdown(index === showKebabDropdown ? null : index);
  };

  const handleCloseDropdowns = () => {
    setShowKebabDropdown(null);
    setShowUploadDropdown(false);
  };

  async function handleFileUpload(file) {
    if (!file) return;

    setUploadStatus("in-progress");

    const formData = new FormData();
    formData.append("file", file[0]);
    console.log();
    const response = await axios.post("/api/upload/postFileUpload", formData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      onUploadProgress: (progressEvent) => {
        setUploadProgress(progressEvent);
      },
    });

    if (response.status === 200) {
      setUploadStatus("completed");
      console.log("upload completed");
      fetchUploadedDocuments();
    } else {
      setUploadStatus("failed");
      console.log("fetching document");
      fetchUploadedDocuments();
      setUploadProgress(-1);
    }
  }

  async function handlePromptSubmit() {}

  async function fetchUploadedDocuments() {
    console.log("Get documentList");
    const response = await axios.get("/api/upload/getDocumentsList", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      setDocumentList(response.data.response);
    } else {
      console.log("failed to fetch");
    }
  }

  async function getDownloadDocument() {
    const selectedId = fileIdToDelete;
    console.log("this is download document id" + selectedId);

    const response = await axios.post(
      `/api/upload/postFileDownload`,
      { selectedId: selectedId },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("this is response ", response.data);

    if (response.status === 200) {
    } else {
    }
  }

  async function deleteDocument() {
    const selectedId = fileIdToDelete;
    setDeleteStatus("in-progress");
    console.log("this is delete document id" + selectedId);
    try {
      const response = await axios.post(
        `/api/upload/getDeleteDocument`,
        { selectedId: selectedId },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("this is response ", response.data);

      if (response.status === 200) {
        console.log("Deleted document");
        setDeleteStatus("complete");
        fetchUploadedDocuments();
        setDeleteConfirmOpen(false);
      } else {
        console.log("it is not 200")
        setDeleteStatus("complete");
        setDeleteConfirmOpen(false);
      }
    } catch (error) {
      console.error("Error during document deletion:", error);
      setDeleteStatus("complete");
      setDeleteConfirmOpen(false);
      alert('Failed to Delete File.');
    }
  }

  function redirectToChatbot(file_id) {
    const documentId = file_id; // Replace with how you retrieve the ID
    router.push(`/chatbot?docId=${documentId}`);
  }

  return (
    <div className="py-8 px-10 bg-slate-100">
      <div className="bg-white p-5 rounded-lg ">
        <div className="text-lg font-bold p-2">All fies </div>
        <div className="flex flex-wrap w-full items-center justify-between">
          <div className="relative mb-2 md:mb-0 flex z-10">
            {/* Title Button */}

            <button
              onClick={(e) => toggleUploadDropdown(e)}
              className="mt-2 md:mt-0 px-4 py-2 bg-blue-500 text-white rounded hover:bg-gray-300 flex"
            >
              <BsUpload className="text-xl mr-3" />
              <div>Upload</div>
            </button>

            {/* Dropdown Menu */}
            {showUploadDropdown && (
              <div
                ref={dropdownUploadRef}
                className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded shadow-lg"
              >
                <ul>
                  <li
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleFileChoose}
                  >
                    <div>Document</div>
                    <input
                      type="file"
                      ref={fileInput}
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    ></input>
                  </li>
                  <li
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handlePromptOpen}
                  >
                    <div>Prompt</div>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="w-full md:w-1/3 relative mt-2 md:mt-0 ">
            {/* Input Field */}
            <input
              type="text"
              className="border rounded-md w-full pl-10 pr-4 py-2 focus:border-blue-400 focus:outline-none"
              placeholder="Search..."
            />

            {/* Absolute-positioned icon */}
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <FaSearch />
            </div>
          </div>
        </div>
        <Modal
          isOpen={isPromptModalOpen}
          onRequestClose={() => setIsPromptModalOpen(false)}
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2>File name</h2>
          <input
            type="text"
            value={PromptModalTitle}
            onChange={(e) => setPromptModalTitle(e.target.value)}
          />
          <h2>Modal Body</h2>
          {/* <ReactQuill value={editorContent} onChange={setEditorContent} /> */}
          <button onClick={handlePromptSubmit}>Submit</button>
        </Modal>
      </div>
      <hr></hr>
      <div className="bg-white p-5 rounded-lg mt-4">
        <div>
          <div className="text-lg font-bold p-2 ">
            {documentList.length} Files Found
          </div>
          <div></div>
          {documentList &&
            documentList.map((item, index) => (
              <div
                key={index}
                className="relative flex border items-center font-medium p-3 rounded-lg hover:shadow-lg hover:bg-gray-200 transition duration-300 m-2"
              >
                <div className="overflow-hidden truncate">{item.file_name}</div>
                <div
                  className="ml-auto hover:bg-gray-100 p-2 rounded-lg cursor-pointer"
                  onClick={(e) => toggleKebabDropdown(e, index)}
                >
                  <CiMenuKebab className="text-gray-600 text-xl" />
                </div>
                {showKebabDropdown === index && (
                  <div
                    ref={dropdownKebabRef}
                    className="absolute top-full mt-2 w-48 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-20"
                  >
                    <ul>
                      <li
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => getDownloadDocument()}
                      >
                        Download
                      </li>
                      <li
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => redirectToChatbot(item.id)}
                      >
                        Summarize
                      </li>
                      <li
                        className="p-2 text-white rounded-lg bg-red-500 hover:bg-red-600 cursor-pointer"
                        onClick={() => openDeleteModal(item, item.id)}
                      >
                        Delete
                        <Modal
                          className="modal"
                          isOpen={isDeleteModalOpen}
                          // onRequestClose={() => setDeleteConfirmOpen(false)}
                          overlayClassName="modal-overlay"
                        >
                          <h2 className="text-lg font-bold">
                            Are you sure you want to delete the file?
                          </h2>
                          <p className="text-xs mt-5">
                            Are you sure you want to delete{" "}
                            <strong>{" " + item.file_name}</strong> ?
                          </p>
                          <div className="flex justify-end mt-5">
                            <button
                              onClick={() => setDeleteConfirmOpen(false)}
                              className="bg-gray-100 text-black px-4 py-2 rounded mr-2"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={deleteDocument}
                              className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                              {deleteStatus === "completed" ? (
                                "Completed"
                              ) : deleteStatus === "in-progress" ? (
                                <div className="flex items-center justify-center">
                                  <Spinner className="" size={`w-5 h-5`} />{" "}
                                  <div className="ml-1">Deleting</div>{" "}
                                </div>
                              ) : (
                                "Delete"
                              )}
                            </button>
                          </div>
                        </Modal>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      {showPopup && (
        <div className="fixed bottom-4 right-4 w-2/3 lg:w-1/4 p-4 bg-white border rounded-lg shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold overflow-hidden truncate">
              {uploadStatus === "completed" ? (
                "Completed"
              ) : uploadStatus === "in-progress" ? (
                <div className="flex items-center justify-center">
                  <Spinner className="" size={`w-5 h-5`} />{" "}
                  <div className="ml-1 text-xl">Uploading</div>{" "}
                </div>
              ) : (
                "Failed to upload"
              )}
            </h2>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-red-500 text-white rounded p-2 hover:bg-red-600"
            >
              <AiOutlineClose />
            </button>
          </div>
          <div className="flex justify-between items-center mb-4 ">
            <h2 className="text-xs overflow-hidden truncate">
              {fileUpload ? <div> {fileUpload[0].name}</div> : <div>Null</div>}{" "}
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
