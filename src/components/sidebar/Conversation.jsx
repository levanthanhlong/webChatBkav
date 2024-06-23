import { useState } from "react";
import useConversation from "../../zustand/useConversation";

const API_URL = 'http://10.2.44.52:8888/api/images'; // cty
//const API_URL = 'http://127.0.0.1:8888/api/images'; // home

const DEFAULT_AVATAR = "/avatar/4bbfc078-ad2d-46a8-b023-a1e30992903d.jpg"; // Default avatar URL

const limitContent = (content, maxLength) => {
  content = String(content);
  if (content.length > maxLength) {
    return content.slice(0, maxLength) + "...";
  }
  return content;
};

const Conversation = ({ conversation, lastIdx, nickname, onNicknameChange }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState(nickname);

  const isSelected = selectedConversation?.FriendID === conversation.FriendID;
  const isOnline = conversation.isOnline;
  var isSend = conversation.isSend;
  const maxLength = 20; // set độ dài tối đa cho tên hiển thị

  // Giới hạn độ dài của Content
  const limitedContent = limitContent(conversation.Content, maxLength);

  const avatarUrl = `${API_URL}${conversation.Avatar || DEFAULT_AVATAR}`;

  const handleNicknameClick = () => {
    setIsEditing(true);
  };

  const handleNicknameChange = (event) => {
    setNewNickname(event.target.value);
  };

  const handleNicknameBlur = () => {
    setIsEditing(false);
    onNicknameChange(conversation.FriendID, newNickname);
  };

  const handleNicknameKeyDown = (event) => {
    if (event.key === 'Enter') {
      setIsEditing(false);
      onNicknameChange(conversation.FriendID, newNickname);
    }
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
                ${isSelected ? "bg-sky-500" : ""} `}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={avatarUrl} alt="user avatar" />
          </div>
          <div
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${isOnline ? "bg-green-500" : "bg-red-500"
              }`}
          ></div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            {isEditing ? (
              <input
                type="text"
                value={newNickname}
                onChange={handleNicknameChange}
                onBlur={handleNicknameBlur}
                onKeyDown={handleNicknameKeyDown}
                className="font-bold text-black bg-white"
                autoFocus
              />
            ) : (
              <p className="font-bold text-black" onClick={handleNicknameClick}>
                {nickname}
              </p>
            )}
          </div>
          <div
            className={`flex gap-3 justify-between ${isSend === 0 ? "font-bold" : "font-normal"
              }`}
          >
            <p className=" text-black">{limitedContent}</p>{" "}
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
