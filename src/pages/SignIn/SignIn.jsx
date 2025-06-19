import { useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import loginLottie from "../../assets/Lottie/loginLottie.json";
import useAuth from "../../hooks/useAuth";

const SignIn = () => {
  const { signInUser, setUser } = useAuth();
  const [error, setError] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((res) => {
        setUser(res?.user);
        setError("");
        form.reset(); 
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-sky-50 to-blue-100">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row-reverse items-center gap-8 bg-white/60 backdrop-blur-md shadow-2xl rounded-3xl p-6 sm:p-10 border border-sky-100">
        {/* Lottie Section */}
        <div className="w-full lg:w-1/2">
          <Lottie animationData={loginLottie} loop />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <form onSubmit={handleSignIn}>
            <h1 className="text-3xl font-extrabold text-center text-sky-600 mb-6 relative after:content-[''] after:absolute after:w-16 after:h-1 after:bg-sky-400 after:-bottom-2 after:left-1/2 after:-translate-x-1/2">
              Sign In
            </h1>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              />
            </div>

            {/* Submit */}
            <input
              type="submit"
              value="Login"
              className="w-full py-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
            />
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-3 rounded">
              <p className="text-sm text-red-700">
                ⚠️ {error} —{" "}
                <span className="text-green-500 underline">Try Again</span>
              </p>
            </div>
          )}

          {/* Onboarding Prompt */}
          <p className="mt-6 text-sm text-center text-gray-600">
            New to this platform?
            <Link
              to="/register"
              className="ml-1 text-sky-600 font-medium underline hover:text-sky-700 transition"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
