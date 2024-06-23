import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

const API_URL = "http://10.2.44.52:8888/api"; //cty
//const API_URL = 'http://127.0.0.1:8888/api'; //home

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ fullName, username, password, confirmPassword }) => {
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/register`, {
        FullName: fullName,
        Username: username,
        Password: password,
      });

      const data = res.data;
      if (data.status !== 1) {
        throw new Error(data.message || "Signup failed");
      }

      const user = data.data;
      localStorage.setItem("chat-user", JSON.stringify(user));
      setAuthUser(user);
      toast.success("Signup successful");
    } catch (error) {
      toast.error("Tên đăng nhập đã tồn tại");
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};
export default useSignup;

function handleInputErrors({ fullName, username, password, confirmPassword }) {
  if (!fullName || !username || !password || !confirmPassword) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
