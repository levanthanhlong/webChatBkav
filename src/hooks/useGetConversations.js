import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const API_URL = "http://10.2.44.52:8888/api"; //cty
//const API_URL = 'http://127.0.0.1:8888/api'; //home

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  const getConversations = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("chat-user")).token;
      const res = await axios.get(`${API_URL}/message/list-friend`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = res.data;
      if (data.status !== 1) {
        throw new Error(data.message || "Failed to fetch conversations");
      }
      setConversations(data.data);

      // Lưu dữ liệu cuộc trò chuyện vào localStorage
      localStorage.setItem("conversations", JSON.stringify(data.data));
    } catch (error) {
      //toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getConversations(); // Initial fetch

    const interval = setInterval(() => {
      getConversations();
    }, 1000); // Fetch every 1 second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
