import { createContext, useContext, useState } from "react";

// Tạo context cho authentication
export const AuthContext = createContext();

// Hook tùy chỉnh để sử dụng AuthContext
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// Provider component cho AuthContext
export const AuthContextProvider = ({ children }) => {
  // Lấy thông tin người dùng từ localStorage và lưu vào state
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
