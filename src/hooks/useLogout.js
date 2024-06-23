import { useState } from "react";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    try {
      // Xóa dữ liệu trong localStorage
      localStorage.clear();
      toast.success("Logout successful");
      // Chuyển hướng người dùng tới trang đăng nhập hoặc trang chủ
      window.location.href = "/login";
    } catch (error) {
      console.error("Failed to logout", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
