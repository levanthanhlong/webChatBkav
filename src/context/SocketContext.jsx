import { createContext, useContext} from "react";
// Tạo context cho socket
const SocketContext = createContext();

// Hook tùy chỉnh để sử dụng SocketContext
export const useSocketContext = () => {
	return useContext(SocketContext);
};

// Provider component cho SocketContext
export const SocketContextProvider = ({ children }) => {
	
	return (
		<SocketContext.Provider>
			{children}	
		</SocketContext.Provider>
	);
};
