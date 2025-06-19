import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import jobIcon from "../../assets/job-logo.png";
import { FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();

  const signOutUser = () => {
    logout()
      .then(() => {
        alert(`Sign Out Successful`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addActiveFunc = ({ isActive }) =>
    `relative px-3 py-2 font-medium transition-all duration-200 ${
      isActive
        ? "text-sky-600 border-b-2 border-sky-600"
        : "text-gray-700 hover:text-sky-500"
    }`;

  const links = (
    <>
      <li>
        <NavLink className={addActiveFunc} to="/">
          Home <FaChevronDown />
        </NavLink>
      </li>
      <li>
        <NavLink className={addActiveFunc} to="/about">
          About <FaChevronDown />
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar  sticky  max-w-7xl mx-auto px-4">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
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
        <Link to="/" className="flex items-center gap-2">
          <img
            className="w-12 h-10 rounded-full"
            src={jobIcon}
            alt="Job Logo"
          />
          <span className="text-xl font-bold text-sky-600">Mozilla</span>
          <span className="text-xl font-semibold text-gray-700">Job Hunt</span>
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-4">{links}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-2">
        <Link
          to="/post-job"
          className="hidden sm:inline-block bg-sky-600 hover:bg-sky-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200"
        >
          Job Post
        </Link>

        {user ? (
          <button
            onClick={signOutUser}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition"
          >
            Sign Out
          </button>
        ) : (
          <>
           {/*  <Link
              to="/register"
              className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg transition"
            >
              Register
            </Link> */}
            <Link
              to="/signIn"
              className="bg-gray-800 hover:bg-gray-900 text-white font-medium px-4 py-2 rounded-lg transition"
            >
              Sign In
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
