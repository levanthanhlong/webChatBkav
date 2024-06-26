import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";

const DEFAULT_AVATAR = "/avatar/4bbfc078-ad2d-46a8-b023-a1e30992903d.jpg"; // Default avatar URL

const MessageContainer = () => {
  const API_URL = "http://10.2.44.52:8888/api/images"; // cty
  //const API_URL = 'http://127.0.0.1:8888/api/images'; //home api

  const { selectedConversation, setSelectedConversation } = useConversation();
  const [nickname, setNickname] = useState("");


  const getNickname = (friendId, fullName) => {
    const storedNicknames = localStorage.getItem("nicknames");
    if (storedNicknames) {
      const nicknames = JSON.parse(storedNicknames);
      return nicknames[friendId] || fullName;
    }
    return fullName;
  };

  useEffect(() => {
    if (selectedConversation) {
      const interval = setInterval(() => {
        const updatedNickname = getNickname(
          selectedConversation.FriendID,
          selectedConversation.FullName
        );
        setNickname(updatedNickname);
      }, 10);

      return () => clearInterval(interval); // cleanup interval on unmount
    }
  }, [selectedConversation]);

  useEffect(() => {
    return () => setSelectedConversation(null); // cleanup when unmount
  }, [setSelectedConversation]);

  if (!selectedConversation) {
    return <NoChatSelected />;
  }

  return (
    <div className="md:min-w-[450px] flex flex-col w-full bg-white">
      {/* Header */}
      <div className="flex gap-2 items-center rounded p-2 py-1 relative">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={`${API_URL}${selectedConversation.Avatar || DEFAULT_AVATAR}`}
            alt="user avatar"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex gap-3 justify-between">
          <p className="font-bold ">{nickname}</p>
        </div>
        <div
            className={`absolute left-10 top-1 w-3 h-3 rounded-full border-2 border-white ${selectedConversation.isOnline ? "bg-green-500" : "bg-red-500"
              }`}
          ></div>
      </div>

      <Messages />
      <MessageInput />
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  // const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <TiMessages className="text-3xl md:text-6xl text-center" />

        <p>Chưa có tin nhắn nào</p>
      </div>
    </div>
  );
};
