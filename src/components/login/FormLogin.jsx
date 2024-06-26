import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { BsApple, BsFacebook, BsGoogle } from "react-icons/bs";
import AuthSocialButton from "./AuthSocialButton";
import { Toaster } from "react-hot-toast";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const FormLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  const socialAction = () => {};

  const isLoginPage = location.pathname === "/login";
  const isSignUpPage = location.pathname === "/signup";

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100">
      <Toaster />
      {/* Header */}
      <div className="w-full px-8 py-4">
        <img src="/images/logo-deep.png" alt="Logo" width={100} height={40} />
      </div>

      {/* Content */}
      <div className="w-full flex flex-col lg:flex-row mt-8 justify-center items-center">
        <div className="hidden lg:flex flex-row gap-96">
          {/* Description */}
          <div className="hidden md:flex flex-col justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-background bg-cover z-0 top-10 left-10">
                <img
                  src="/images/blue-background.png"
                  height={400}
                  width={400}
                  alt="blue-background"
                />
              </div>
              <div className="absolute inset-0 bg-blue-background bg-cover z-0 top-10 left-10">
                <div className="circle-blur"></div>
              </div>
              <div className="relative z-10 p-4">
                <h2 className="text-black font-normal leading-10 text-4xl">
                  Đăng nhập để
                  <br />
                  kết nối
                </h2>
                <br />
                <span className="cursor-pointer hover:text-primary-dark">
                  Nếu chưa có tài khoản Đăng ký <br/>tại&nbsp;
                  <span
                    onClick={() => navigate("/signup")}
                    className="text-blue-500"
                  >
                    đây!
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-16 hidden md:flex">
            <img
              src="/images/background-login.png"
              alt="Background image signin"
            />
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col w-full max-w-md p-4 md:p-8 lg:w-88 gap-40">
          <div className="flex flex-row justify-between items-center mb-4">
            <div className="null"></div>
            <div className="choose-language">
              <select
                name="choose-language"
                id="choose-language"
                className="border-0 bg-transparent font-roboto text-base font-medium leading-none tracking-wider"
              >
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
              </select>
            </div>
            <div className="flex">
              <button
                onClick={() => navigate("/login")}
                className={`px-4 py-2 font-medium transition rounded-3xl ${
                  isLoginPage
                    ? "bg-white text-blue-500 border-t shadow-xl"
                    : "text-blue-500 hover:bg-white"
                }`}
              >
                Đăng nhập
              </button>
              <button
                onClick={() => navigate("/signup")}
                className={`ml-4 px-4 py-2 font-medium transition rounded-3xl ${
                  isSignUpPage
                    ? "bg-white text-blue-500 shadow-xl"
                    : "text-blue-500 hover:bg-white"
                }`}
              >
                Đăng ký
              </button>
            </div>
          </div>

          {/* from đăng ký */}
          <div className="form flex flex-col">
            <div className="form-1">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="form-control relative">
                  <input
                    type="text"
                    placeholder="Nhập tài khoản"
                    className="w-full input input-bordered h-15 bg-customBlue text-customGray"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {username && (
                    <HighlightOffIcon
                      className="absolute right-2 top-2 text-gray-500 cursor-pointer"
                      size={20}
                      onClick={() => setUsername("")}
                    />
                  )}
                </div>
                <div className="form-control relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="***********"
                    className="w-full input input-bordered h-15 bg-customBlue text-customGray"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    className="absolute right-2 top-2 text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <VisibilityIcon size={20} />
                    ) : (
                      <VisibilityOffIcon size={20} />
                    )}
                  </div>
                </div>
                <div className="div-forgot-password text-right">
                  <span className="text-blue-500 cursor-pointer">
                    Quên mật khẩu ?
                  </span>
                </div>
                <Link
                  to="/signup"
                  className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
                >
                  {"Don't"} have an account?
                </Link>

                <div>
                  <button
                    className="bg-customBtn text-white btn btn-block btn-xl mt-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Đăng nhập"
                    )}
                  </button>
                </div>
              </form>
              <div className="mt-6">
                <div className="flex items-center">
                  <div className="flex-1 border-t"></div>
                  <div className="px-4">
                    <span>Hoặc tiếp tục với</span>
                  </div>
                  <div className="flex-1 border-t"></div>
                </div>
                <div className="mt-6 flex gap-2">
                  <AuthSocialButton
                    icon={BsGoogle}
                    onClick={() => socialAction("google")}
                  />
                  <AuthSocialButton
                    icon={BsApple}
                    onClick={() => socialAction("apple")}
                  />
                  <AuthSocialButton
                    icon={BsFacebook}
                    onClick={() => socialAction("facebook")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
