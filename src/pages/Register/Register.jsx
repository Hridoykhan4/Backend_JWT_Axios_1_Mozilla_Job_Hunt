import Lottie from "lottie-react";
import registerAnime from "../../assets/Lottie/registerLottie.json";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import useScrollTo from "../../hooks/useScrollTo";
import SocialLogin from "../Shared/SocialLogin";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  useScrollTo();
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;
    // Validation
    if (name.length < 3) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Name must be at least 3 characters long",
        timer: 2500,
        showConfirmButton: false,
      });
    }

    if (password.length < 6) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must be at least 6 characters long",
        timer: 2500,
        showConfirmButton: false,
      });
    }
    if (!/[A-Z]/.test(password)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must include at least one uppercase letter",
        timer: 2500,
        showConfirmButton: false,
      });
    }
    if (!/\d/.test(password)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must include at least one digit",
        timer: 2500,
        showConfirmButton: false,
      });
    }

    setError("");

    createUser(email, password)
      .then(() => {
        updateUserProfile(name).then(() => {
          form.reset();
          Swal.fire({
            icon: "success",
            title: "Registered!",
            text: "Your account has been created successfully.",
            timer: 2500,
            showConfirmButton: false,
          });
          nav(`/`);
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: err.message,
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-8 bg-white/60 backdrop-blur-md shadow-2xl rounded-3xl p-6 sm:p-10 border border-pink-100">
        {/* Lottie Animation */}
        <div className="w-full lg:w-1/2">
          <Lottie animationData={registerAnime} loop />
        </div>

        {/* Register Form */}
        <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <h1 className="text-3xl font-extrabold text-center text-pink-600 mb-6 relative after:content-[''] after:absolute after:w-16 after:h-1 after:bg-pink-400 after:-bottom-2 after:left-1/2 after:-translate-x-1/2">
            Register
          </h1>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
              />
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded text-red-600 text-sm">
                ⚠️ {error}
              </div>
            )}

            {/* Submit */}
            <input
              type="submit"
              value="Register"
              className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
            />
          </form>

          {/* Social Login - OUTSIDE the form to prevent required errors */}
          <div className="mt-6">
            <SocialLogin />
          </div>

          {/* Already have an account */}
          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?
            <Link
              to="/signIn"
              className="ml-1 text-pink-600 underline hover:text-pink-700 transition"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
