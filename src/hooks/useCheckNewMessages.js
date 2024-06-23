import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const API_URL = "http://10.2.44.52:8888/api"; //cty
//const API_URL = 'http://127.0.0.1:8888/api'; //home

const useCheckNewMessages = (interval = 100) => {
  // default interval to 1 seconds
  const { selectedConversation, setMessages } = useConversation();

  useEffect(() => {
    if (!selectedConversation?.FriendID) return;

    const checkNewMessages = async () => {
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

        const savedMessages =
          JSON.parse(
            localStorage.getItem(`messages-${selectedConversation.FriendID}`)
          ) || [];

        if (JSON.stringify(savedMessages) !== JSON.stringify(data.data)) {
          localStorage.setItem(
            `messages-${selectedConversation.FriendID}`,
            JSON.stringify(data.data)
          );
          setMessages(data.data);
        }
      } catch (error) {
       // toast.error(error.message);
      }
    };

    const intervalId = setInterval(checkNewMessages, 100);
    return () => clearInterval(intervalId);
  }, [selectedConversation, interval, setMessages]);
};

export default useCheckNewMessages;
