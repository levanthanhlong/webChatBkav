import GroupsIcon from "@mui/icons-material/Groups";
import { useState, useRef, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import LogoutButton from "./LogoutButton";
import useGetInforUser from "../../hooks/useGetUserInfor";
import useUpdateUserInfor from "../../hooks/useUpdateUserInfor";
import toast, { Toaster } from "react-hot-toast";

const UserMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newFullName, setNewFullName] = useState("");
  const { userInfor: fetchedUserInfor, loading: userLoading } = useGetInforUser();
  const { loading: updateLoading, updateUserInfo } = useUpdateUserInfor();
  const [userInfor, setUserInfor] = useState(fetchedUserInfor);
  const fileInputRef = useRef(null);

  const API_URL = "http://10.2.44.52:8888/api/"; //cty
  //const API_URL = "http://127.0.0.1:8888/api/"; //home

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
    toast.success("Đã chuyển chế độ sáng/tối");
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFullNameClick = () => {
    setIsEditingName(true);
    setNewFullName(userInfor?.FullName || "");
  };

  const handleNameChange = (event) => {
    setNewFullName(event.target.value);
  };

  const handleNameKeyPress = async (event) => {
    if (event.key === "Enter") {
      await updateUserInfo(newFullName, null);
      setIsEditingName(false);
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size < 2000000) {
        // Kiểm tra kích thước file
        await updateUserInfo(userInfor?.FullName, file);
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else {
        alert("Image size must be less than 2MB");
      }
    }
  };

  useEffect(() => {
    if (fetchedUserInfor) {
      setUserInfor(fetchedUserInfor);
    } else {
      const storedUserInfor = localStorage.getItem("user-infor");
      if (storedUserInfor) {
        setUserInfor(JSON.parse(storedUserInfor));
      }
    }
  }, [fetchedUserInfor]);

  if (!userInfor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <MenuIcon />
      </button>
      {isMenuOpen && (
        <div className="absolute mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-20">
          <div className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
            <div className="flex gap-2 items-center rounded p-2 py-1">
              <div className="w-12 rounded-full" onClick={handleAvatarClick}>
                <img
                  className="w-12 h-12"
                  src={`${API_URL}/images/${userInfor.Avatar}`}
                  alt="user avatar"
                />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex gap-3 justify-center">
                  {isEditingName ? (
                    <input
                      type="text"
                      value={newFullName}
                      onChange={handleNameChange}
                      onKeyPress={handleNameKeyPress}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    <p
                      className="font-bold text-black dark:text-white cursor-pointer"
                      onClick={handleFullNameClick}
                    >
                      {userInfor.FullName}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <AlternateEmailIcon /> Nhắc đến bạn
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <GroupsIcon /> Tạo nhóm
          </a>
          <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100">
            <label
              htmlFor="toggleDarkMode"
              className="flex items-center cursor-pointer"
            >
              <span className="mr-2">
                {" "}
                <NightlightOutlinedIcon /> Giao diện tối
              </span>
              <div className="w-10 h-4 relative bg-gray-400 rounded-full shadow-inner items-center justify-center dark:bg-gray-600">
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow  transition-transform duration-300 ease-in-out ${
                    isDarkMode ? "transform translate-x-full bg-gray-800" : ""
                  }`}
                />
                <input
                  id="toggleDarkMode"
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                  className="toggle-checkbox hidden"
                />
              </div>
            </label>
          </div>
          <div className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
            <LogoutButton />
          </div>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
      />
      <Toaster />
      {(userLoading || updateLoading) && <div>Đang cập nhật...</div>}
    </div>
  );
};

export default UserMenu;
