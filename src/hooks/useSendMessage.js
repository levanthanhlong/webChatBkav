import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const API_URL = "http://10.2.44.52:8888/api"; //cty
  //const API_URL = 'http://127.0.0.1:8888/api'; //home

  const sendMessage = async (message, file) => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("chat-user")).token;

    try {
      const formData = new FormData();
      formData.append("FriendID", selectedConversation.FriendID);
      formData.append("Content", message);
      if (file) {
        formData.append("files", file);
      }

      const res = await axios.post(
        `${API_URL}/message/send-message`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = res.data;
      if (data.status !== 1)
        throw new Error(data.message || "Failed to send message");

      const updatedMessages = [...messages, data.data];
      setMessages(updatedMessages);

      // Lưu tin nhắn cập nhật vào localStorage
      localStorage.setItem(
        `messages-${selectedConversation.FriendID}`,
        JSON.stringify(updatedMessages)
      );
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
