import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import jobIcon from "../../assets/job-logo.png";
import { FaChevronDown } from "react-icons/fa";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logout } = useAuth();

  const signOutUser = () => {
    logout()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Signed Out!",
          text: "You have successfully logged out.",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Sign out failed: ${err.message}`,
          confirmButtonColor: "#d33",
        });
      });
  };

  const addActiveFunc = ({ isActive }) =>
    `relative px-1 py-2 font-medium transition-all duration-200 ${
      isActive
        ? "text-sky-600 border-b-2 border-sky-600"
        : "text-gray-700 hover:text-sky-500"
    }`;

  const links = (
    <>
      <li>
        <NavLink className={addActiveFunc} to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className={addActiveFunc} to="/allJobs">
          All Jobs
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink className={addActiveFunc} to="/myPostedJobs">
              My Posted Jobs
            </NavLink>
          </li>
          <li>
            <NavLink className={addActiveFunc} to="/myApplications">
              My Applications
            </NavLink>
          </li>
          <li>
            <NavLink className={addActiveFunc} to="/addJob">
              Add a Job
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar  sticky  max-w-7xl mx-auto px-4">
      {/* Navbar Start */}
      <div className="navbar-start flex-1 lg:w-1/2">
        <Link to="/" className="flex items-center gap-2">
          <img
            className="w-12 h-10 rounded-full"
            src={jobIcon}
            alt="Job Logo"
          />
          <span className="text-xl hidden sm:flex font-bold text-sky-600">
            Mozilla
          </span>
          <span className="text-xl hidden sm:flex font-semibold text-gray-700">
            Job Hunt
          </span>
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center ms-auto hidden lg:flex">
        <ul className="menu menu-horizontal gap-4">{links}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end  w-fit gap-2">
        {user ? (
          <button
            onClick={signOutUser}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition"
          >
            Sign Out
          </button>
        ) : (
          <>
             <Link
              to="/register"
              className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg transition"
            >
              Register
            </Link>
            <Link
              to="/signIn"
              className="bg-gray-800 hover:bg-gray-900 text-white font-medium px-4 py-2 rounded-lg transition"
            >
              Sign In
            </Link>
          </>
        )}
        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
          >
            {links}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
