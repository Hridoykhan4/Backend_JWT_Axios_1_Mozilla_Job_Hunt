import { useLoaderData } from "react-router-dom";
import FeaturedJobCard from "../Home/FeaturedJobCard";
import useScrollTo from "../../hooks/useScrollTo";

const AllJobs = () => {
    useScrollTo()
  const jobs = useLoaderData();

  return (
    <section className="px-4 md:px-10 lg:px-20 py-8 bg-gradient-to-b from-white via-blue-50 to-white">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-gray-800">All Job Listings</h2>
        <p className="text-gray-500 mt-2">
          Browse through all active job opportunities and apply today!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs?.map((job) => (
          <FeaturedJobCard key={job?._id} job={job} />
        ))}
      </div>
    </section>
  );
};

export default AllJobs;
