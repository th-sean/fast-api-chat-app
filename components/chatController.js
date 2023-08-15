function ChatController({
	inputText,
	isLoading,
	messages,
	setIsSideBarOpen,
	setInputText,
	handleClick,
	handleRefresh,
}) {
	const handleInputChange = (event) => {
		setInputText(event.target.value);
	};

	const handleEnter = (event) => {
		if (event.key === "Enter") {
			handleClick();
		}
	};

	return (
		<div className="bg-[#fdfeff] relative flex w-full flex-1 overflow-hidden flex-col justify-between h-full shadow-2xl shadow-[#b3b6e6] z-20">
			<div className="flex justify-between items-center w-full p-4 bg-gradient-to-r from-[#542ee6] to-[#2a8ce6] font-bold ">
				
			</div>

			{/* Conversation */}
			{messages.length == 0 ? (
				<div className="font-bold text-8xl text-[#cccfef8c] text-center">
					Chit Chat Rabbit
				</div>
			) : (
				<div className="flex flex-col justify-between h-full overflow-y-scroll pb-96">
					<div className="mt-5 px-5">
						{messages?.map((message, key) => {
							return message.sender == "me" ? (
								<div className="chat chat-end" key={key}>
									<div className="chat-image avatar">
										<div className="w-10 rounded-full">
											<img src="src/imgs/cat.png" />
										</div>
									</div>
									<div className="chat-header">
										Me
										<time className="ml-2 text-xs opacity-50">
											{message.time}
										</time>
									</div>
									<div className="chat-bubble chat-bubble-info">
										{message.message}
									</div>
								</div>
							) : message.sender == "bot-loading" && isLoading ? (
								<div className="chat chat-start" key={key}>
									<div className="chat-image avatar">
										<div className="w-10 rounded-full">
											<img src="src/imgs/rabbit.png" />
										</div>
									</div>
									<div className="chat-header">
										Chit Chat Rabbit
										<time className="ml-2 text-xs opacity-50">
											{message.time}
										</time>
									</div>
									<div className="chat-bubble items-center chat-bubble-primary">
										<div className="flex space-x-3">
											<div className="h-2 w-2 bg-green-100 rounded-full animate-bounce200"></div>
											<div className="h-2 w-2 bg-green-100 rounded-full animate-bounce400"></div>
											<div className="h-2 w-2 bg-green-100 rounded-full animate-bounce"></div>
										</div>
									</div>
								</div>
							) : (
								<div className="chat chat-start" key={key}>
									<div className="chat-image avatar">
										<div className="w-10 rounded-full">
											<img src="src/imgs/rabbit.png" />
										</div>
									</div>
									<div className="chat-header">
										Chit Chat Rabbit
										<time className="ml-2 text-xs opacity-50">
											{message.time}
										</time>
									</div>
									<div className="chat-bubble chat-bubble-primary">
										{message.message}
									</div>
								</div>
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
							isLoading
								? "Wait a second...."
								: "Type your message..."
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
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="w-10 h-8"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}

export default ChatController;
