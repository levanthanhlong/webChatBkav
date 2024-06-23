import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const API_URL = "http://10.2.44.52:8888/api"; //cty
//const API_URL = 'http://127.0.0.1:8888/api'; //home

const useGetUserInfor = () => {
  const [loading, setLoading] = useState(false);
  const [userInfor, setUserInfor] = useState([]);

  useEffect(() => {
    const getUserInfor = async () => {
      setLoading(true);
      try {
        const chatUser = localStorage.getItem("chat-user");
        if (!chatUser) {
          throw new Error("User token not found in localStorage");
        }

        const token = JSON.parse(chatUser).token;
        const res = await axios.get(`${API_URL}/user/info`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;
        if (data.status !== 1) {
          throw new Error(data.message || "Failed to fetch user information");
        }

        console.log("load success");
        setUserInfor(data.data);
        localStorage.setItem("user-infor", JSON.stringify(data.data));
      } catch (error) {
       // toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getUserInfor();
  }, []);

  return { loading, userInfor };
};

export default useGetUserInfor;
