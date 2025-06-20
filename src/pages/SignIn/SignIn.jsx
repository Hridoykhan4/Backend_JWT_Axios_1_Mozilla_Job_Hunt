import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loginLottie from "../../assets/Lottie/loginLottie.json";
import useAuth from "../../hooks/useAuth";
import useScrollTo from "../../hooks/useScrollTo";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
  const { signInUser } = useAuth();
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  useScrollTo();

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setError(``);

    signInUser(email, password)
      .then(() => {
        setError("");
        form.reset();
        Swal.fire({
          icon: "success",
          title: "Welcome Back!",
          text: "You've successfully signed in!",
          timer: 2500,
          showConfirmButton: false,
        });
        navigate(state?.from ? state.from : "/");
      })
      .catch((err) => {
        setError(err.message);
        Swal.fire({
          icon: "error",
          title: "Sign In Failed",
          text: err.message,
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-tr from-sky-100 via-white to-blue-100">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row-reverse items-center gap-8 bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl p-6 sm:p-12 border border-sky-100 relative">
        {/* Floating Blur */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-300 opacity-20 rounded-full blur-3xl z-0" />

        {/* Lottie Animation */}
        <div className="w-full lg:w-1/2 z-10">
          <Lottie animationData={loginLottie} loop />
        </div>

        {/* Login Form */}
        <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-200 z-10">
          <form onSubmit={handleSignIn}>
            <h1 className="text-4xl font-extrabold text-center text-sky-600 mb-8 relative after:content-[''] after:absolute after:w-16 after:h-1 after:bg-sky-400 after:-bottom-3 after:left-1/2 after:-translate-x-1/2">
              Sign In
            </h1>

            {/* Email Input */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="example@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              />
            </div>

            {/* Password Input */}
            <div className="mb-6 relative">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              />
              <button
                onClick={() => setShowPass((prev) => !prev)}
                type="button"
                className="absolute cursor-pointer right-3 bottom-4"
              >
                {showPass ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
              </button>
            </div>

            {error && (
              <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-3 rounded text-red-600 text-sm">
                ⚠️ {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              Login
            </button>
          </form>

          {/* Social Login */}
          <SocialLogin />

          {/* Sign Up Prompt */}
          <p className="mt-6 text-sm text-center text-gray-600">
            New here?
            <Link
              to="/register"
              className="ml-1 text-sky-600 underline hover:text-sky-700 font-medium transition"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
