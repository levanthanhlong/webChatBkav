import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios";

const API_URL = "http://10.2.44.52:8888/api"; // cty
//const API_URL = 'http://127.0.0.1:8888/api'; //home

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation?.FriendID) return;

      setLoading(true);

      try {
        const token = JSON.parse(localStorage.getItem("chat-user")).token;
        const res = await axios.get(`${API_URL}/message/get-message`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            FriendID: selectedConversation.FriendID,
          },
        });

        const data = res.data;
        if (data.status !== 1)
          throw new Error(data.message || "Failed to fetch messages");

        setMessages(data.data);

        // Save messages to localStorage
        localStorage.setItem(
          `messages-${selectedConversation.FriendID}`,
          JSON.stringify(data.data)
        );
      } catch (error) {
       // toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation?.FriendID, setMessages]);

  return { messages, loading };
};

export default useGetMessages;

