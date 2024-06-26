import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

const API_URL = "http://10.2.44.52:8888/api"; //cty
//const API_URL = 'http://127.0.0.1:8888/api'; //home

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    const success = handleInputErrors(username, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        Username: username,
        Password: password,
      });

      const data = res.data;

      const user = data.data;
      localStorage.setItem("chat-user", JSON.stringify(user));
      setAuthUser(user);
      toast.success("Login successful");
    } catch (error) {
      toast.error("Sai tên đăng nhập hoặc mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};
export default useLogin;

function handleInputErrors(username, password) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }
  return true;
}
