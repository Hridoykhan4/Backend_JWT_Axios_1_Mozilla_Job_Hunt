import { useState, useEffect } from "react";
import FeaturedJobCard from "../Home/FeaturedJobCard";
import useScrollTo from "../../hooks/useScrollTo";
import useJobs from "../../hooks/useJobs";
import Spinner from "../../components/Spinner";

const AllJobs = () => {
  useScrollTo();

  const [sort, setSort] = useState(null);
  const [search, setSearch] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  const { jobs, loading } = useJobs(sort, search, minSalary, maxSalary);

  // Debounced search (🔥 smooth typing)
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const timeout = setTimeout(() => setSearch(debouncedSearch), 400);
    return () => clearTimeout(timeout);
  }, [debouncedSearch]);

  if (loading) return <Spinner />;

  return (
    <section className="px-4 md:px-10 lg:px-20 py-10 bg-gradient-to-b from-white via-blue-50 to-white min-h-screen">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-extrabold text-gray-800">
          🔥 All Job Listings
        </h2>
        <p className="text-gray-500 mt-2">
          Browse and filter through job openings. Land your dream job today!
        </p>
      </div>

      {/* 🔎 Filter Options */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <button
          onClick={() => setSort(!sort)}
          className={`btn w-full md:w-auto ${
            sort ? "btn-success" : "btn-outline btn-neutral"
          }`}
        >
          {sort ? "Sorted by Salary 🔽" : "Sort by Salary"}
        </button>

        <input
          type="text"
          value={debouncedSearch}
          onChange={(e) => setDebouncedSearch(e.target.value)}
          placeholder="🔍 Search by Title"
          className="input input-bordered w-full md:w-64"
        />

        <input
          type="number"
          value={minSalary}
          onChange={(e) => setMinSalary(e.target.value)}
          placeholder="💰 Min Salary"
          className="input input-bordered w-full md:w-40"
        />

        <input
          type="number"
          value={maxSalary}
          onChange={(e) => setMaxSalary(e.target.value)}
          placeholder="💰 Max Salary"
          className="input input-bordered w-full md:w-40"
        />
      </div>

      {/* 🔥 Job Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length === 0 ? (
          <p className="text-red-600 font-semibold col-span-full text-center">
            🚫 No Jobs Found!
          </p>
        ) : (
          jobs.map((job) => <FeaturedJobCard key={job._id} job={job} />)
        )}
      </div>
    </section>
  );
};

export default AllJobs;
