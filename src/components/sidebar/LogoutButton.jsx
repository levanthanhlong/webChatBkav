import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto">
      {!loading ? (
        <div className="flex flex-row gap-2" onClick={logout}>
          <BiLogOut className="w-6 h-6 text-black cursor-pointer" />
          <span>Đăng xuất</span>
        </div>
      ) : (
        <span className="loading loading-spinner">Đăng xuất</span>
      )}
    </div>
  );
};
export default LogoutButton;
