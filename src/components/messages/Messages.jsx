import { useEffect, useRef, useState } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useConversation from "../../zustand/useConversation";
import useCheckNewMessages from "../../hooks/useCheckNewMessages";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const Messages = () => {
  const { messages: fetchedMessages, loading } = useGetMessages();
  const { selectedConversation } = useConversation();
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef();

  useCheckNewMessages(1000); // Check for new messages every 1 second

  useEffect(() => {
    // Load messages from localStorage
    if (selectedConversation) {
      const savedMessages = localStorage.getItem(
        `messages-${selectedConversation?.FriendID}`
      );
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        setMessages([]); // Clear messages if none are saved
      }
    }
  }, [selectedConversation]);

  useEffect(() => {
    // Update state with fetched messages when available
    if (!loading && fetchedMessages.length > 0) {
      setMessages(fetchedMessages);
    }
  }, [fetchedMessages, loading]);

  useEffect(() => {
    // Scroll to the last message
    if (messages.length > 0) {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div
            key={message.id || index}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <div className="flex justify-center items-center flex-col gap-20">
          <div className="mt-80">
            <ChatBubbleOutlineIcon style={{ fontSize: 100 }} className="text-gray-400" />
          </div>
          <div className="text-center">
            <p className="text-gray-400">Chưa có tin nhắn...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
