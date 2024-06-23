import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  //kiểm tra pathname hiện tại
  const navigate = useNavigate();
  const location = useLocation();
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
      <div className="w-full flex flex-col lg:flex-row mt-8 justify-center items-center gap-80">
        <div className="hidden lg:flex flex-row gap-20">
          {/* Background Image */}
          <div className="mt-16 hidden md:flex">
            <img
              src="public/images/background-signup.png"
              alt="Background image signup"
            />
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col w-full max-w-md p-4 md:p-8 lg:w-88">
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
                className={`px-4 py-2 font-medium transition rounded-3xl ${isLoginPage
                  ? "bg-white text-blue-500"
                  : "text-blue-500 hover:bg-white"
                  }`}
              >
                Đăng nhập
              </button>
              <button
                onClick={() => navigate("/signup")}
                className={`ml-4 px-4 py-2 font-medium transition rounded-3xl ${isSignUpPage
                  ? "bg-white text-blue-500"
                  : "text-blue-500 hover:bg-white"
                  }`}
              >
                Đăng ký
              </button>
            </div>
          </div>

          <div className="form flex flex-col">
            <h1 className="text-3xl md:text-6xl text-black">Đăng ký</h1>
            <br></br>
            <div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    placeholder="Tên hiển thị"
                    className="w-full input input-bordered h-10 bg-customBlue text-customGray"
                    value={inputs.fullName}
                    onChange={(e) =>
                      setInputs({ ...inputs, fullName: e.target.value })
                    }
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="tài khoản"
                    className="w-full input input-bordered h-10 bg-customBlue text-customGray"
                    value={inputs.username}
                    onChange={(e) =>
                      setInputs({ ...inputs, username: e.target.value })
                    }
                  />
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Mật khẩu"
                    className="w-full input input-bordered h-10 bg-customBlue text-customGray"
                    value={inputs.password}
                    onChange={(e) =>
                      setInputs({ ...inputs, password: e.target.value })
                    }
                  />
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Nhắc lại mật khẩu"
                    className="w-full input input-bordered h-10 bg-customBlue text-customGray"
                    value={inputs.confirmPassword}
                    onChange={(e) =>
                      setInputs({
                        ...inputs,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <button
                    className="bg-customBtn text-white btn btn-block btn-xl mt-2 border border-slate-700"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Đăng ký"
                    )}
                  </button>
                </div>
                <div className="text-xl mt-2 inline-block text-black">
                  Bạn đã có tài khoản, đăng nhập <br/> tại &nbsp;
                  <Link
                    to={"/login"}
                    className="text-xl text-blue-600 mt-2 inline-block"
                  >
                    đây
                  </Link>
                  !
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
