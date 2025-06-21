import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="flex items-center justify-center h-screen bg-gradient-to-br from-white to-blue-50 px-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-blue-600">404</h1>
        <p className="text-2xl mt-4 font-semibold text-gray-800">
          Oops! Page not found.
        </p>
        <p className="text-gray-500 mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition-all duration-200"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
