import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { state } = useLocation();

  const { signInByGoogle, signInByFacebook, signInByGithub } = useAuth();
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    signInByGoogle()
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Welcome!",
          text: `Signed in as ${res.user.displayName}`,
          showConfirmButton: false,
          timer: 2000,
        });

        navigate(state?.from ? state.from : "/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Google Sign-In Failed",
          text: err.message,
          confirmButtonColor: "#d33",
        });
      });
  };

  const handleFacebookSignIn = () => {
    signInByFacebook()
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Welcome!",
          text: `Signed in as ${res.user.displayName}`,
          showConfirmButton: false,
          timer: 2000,
        });

        navigate(state?.from ? state.from : "/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Facebook Sign-In Failed",
          text: err.message,
          confirmButtonColor: "#d33",
        });
      });
  };

  const handleGithubSignIn = () => {
    signInByGithub()
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "🔥 Welcome, GitHub User!",
          text: `Signed in as ${res.user.displayName || "User"}`,
          showConfirmButton: false,
          timer: 2000,
          background: "#1f1f1f",
          color: "#fff",
          iconColor: "#ff6f00",
          toast: true,
          position: "top-end",
        });
        navigate(state?.from ? state.from : "/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "💥 Sign-In Failed!",
          text: err.message || "Something went wrong with GitHub sign-in.",
          confirmButtonText: "Retry",
          background: "#2d2d2d",
          color: "#fff",
          iconColor: "#ff0033",
        });
      });
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <p className="text-gray-600">Or sign in with</p>
      <div className="flex flex-wrap gap-4">
        {/* Google */}
        <button
          onClick={handleGoogleSignIn}
          className="flex cursor-pointer items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
        >
          <FaGoogle className="text-red-500" />
          <span className="text-sm font-medium">Google</span>
        </button>

        {/* Facebook */}
        <button
          onClick={handleFacebookSignIn}
          className="flex cursor-pointer items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
        >
          <FaFacebookF className="text-blue-600" />
          <span className="text-sm font-medium">Facebook</span>
        </button>

        {/* GitHub */}
        <button
          onClick={handleGithubSignIn}
          className="flex cursor-pointer items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
        >
          <FaGithub className="text-gray-800" />
          <span className="text-sm font-medium">GitHub</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
