import { AiOutlineSend, AiOutlineRobot, AiOutlineUser } from "react-icons/ai";
import React, { useState } from "react";
function ChatController({
  inputText,
  isLoading,
  messages,
  setIsSideBarOpen,
  setInputText,
  handleClick,
  handleRefresh,
}) {
  const Instruction = [
    {
      title: "Access Documents",
      text: "Please show me and provide a summary of the July 2023 Bicat Report.",
    },
    {
      title: "Expense Tracking",
      text: "what are my income and expenses for Q1 2023?",
    },
    {
      title: "Tax-Preparation",
      text: "Can you provide me financial statements, to send to my CPA for 2022 tax filing?",
    },
    {
      title: "Investment Basics",
      text: "what is our household's total net worth at the end of 2022?",
    },
  ];
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };
  const handleHandleInstruction = (itemText) => () => {
    setInputText(itemText);
  };

  return (
    <div>
      <div></div>
      <div className="mt-5 rounded-lg bg-[#fdfeff] relative flex w-full flex-1 overflow-hidden flex-col justify-between h-full shadow-[#b3b6e6] z-20">
        {/* <div className="flex justify-between items-center w-full p-4 bg-gradient-to-r from-[#542ee6] to-[#2a8ce6] font-bold "></div> */}

        {/* Conversation */}
        {messages.length == 0 ? (
          // <div className="font-bold text-8xl text-[#cccfef8c] text-center">
          // 	chat
          // </div>

          <div className="">
            <div className="font-bold text-4xl text-[#cccfef8c] text-center mt-10">
              Chatbot-Demo
            </div>
            <div className="grid grid-cols-2 gap-4 align-center justify-center px-8 mt-40">
              {Instruction.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-xl p-5 text-xs hover:bg-gray-200"
                  onClick={handleHandleInstruction(item.text)}
                >
                  <div className="font-bold text-gray-700">{item.title}</div>
                  <div className="text-gray-400">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-between h-full overflow-y-scroll pb-96">
            <div>hi</div>
            <div className="border border-gray-300"></div>
            <div className="">
              {messages?.map((message, key) => {
                return message.sender == "me" ? (
                  <>
                    <div
                      className="chat chat-end bg-white p-5 flex"
                      key={key}
                    >
                      <div className="text-white">
                      <AiOutlineUser className="text-4xl fill-current bg-blue-400 rounded p-1" />
                      </div>
                      <div className="chat-bubble chat-bubble-info ml-5">
                        {message.message}
                        <div>
                          <time className=" text-xs opacity-50">
                            {message.time}
                          </time>
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-300"></div>
                  </>
                ) : message.sender == "bot-loading" && isLoading ? (
                  <>
                    <div className=" bg-gray-100 p-5 flex" key={key}>
                      <AiOutlineRobot className="text-4xl bg-white rounded p-1" />

                      <div className="chat-bubble chat-bubble-primary ml-5">
                        {message.message}
                        <div>
                          <time className="text-xs opacity-50">
                            {message.time}
                          </time>
                        </div>
                        <div className="chat-bubble items-center chat-bubble-primary">
                          <div className="flex space-x-3">
                            <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce200"></div>
                            <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce400"></div>
                            <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-300"></div>
                  </>
                ) : (
                  <>
                    <div className=" bg-gray-100 p-5 flex" key={key}>
                      <AiOutlineRobot className="text-4xl bg-white rounded p-1" />

                      <div className="chat-bubble chat-bubble-primary ml-5">
                        {message.message}
                        <div>
                          <time className="text-xs opacity-50">
                            {message.time}
                          </time>
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-300"></div>
                  </>
                );
              })}
            </div>
          </div>
        )}

        <div className="bg-white p-4 bottom-0 flex flex-row justify-between h-18 mb-2">
          <div className="flex flex-grow px-4">
            <input
              type="text"
              className="border p-2 mr-2 w-full  rounded-xl"
              placeholder={
                isLoading ? "Wait a second...." : "Type your message..."
              }
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleEnter}
            />
          </div>
          <div className="flex w-1/7 justify-center">
            <button
              className={
                "py-2 px-4 mr-4 rounded-3xl hover:bg-green-300 hover:text-white" +
                (isLoading
                  ? " opacity-40 bg--[#2a8ce6] text-white "
                  : " opacity-80 bg-gradient-to-r from-[#542ee6] to-[#2a8ce6] text-white")
              }
              onClick={handleClick}
            >
              <AiOutlineSend className="text-2xl " />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatController;
