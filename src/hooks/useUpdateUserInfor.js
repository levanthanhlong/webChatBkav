import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const API_URL = "http://10.2.44.52:8888/api"; //cty
//const API_URL = "http://127.0.0.1:8888/api"; //home

const useUpdateUserInfor = () => {
  const [loading, setLoading] = useState(false);

  const updateUserInfo = async (fullName, avatarFile) => {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("chat-user")).token;
      if (!token) {
        throw new Error("Token chưa lưu vào localStorage");
      }

      const formData = new FormData();
      formData.append("FullName", fullName);
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const response = await axios.post(`${API_URL}/user/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      if (data.status !== 1) {
        throw new Error(
          data.message || "Cập nhật thông tin người dùng thất bại"
        );
      }

      toast.success(data.message || "Cập nhật thông tin người dùng thành công");
    } catch (error) {
      console.error("Cập nhật thông tin người dùng thất bại", error);
      toast.error(
        error.message || "Đã xảy ra lỗi khi cập nhật thông tin người dùng"
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateUserInfo };
};

export default useUpdateUserInfor;
