import { useEffect, useState } from "react";
import FeaturedJobCard from "./FeaturedJobCard";
import Spinner from "../../components/Spinner";

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`http://localhost:5000/jobs`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      });
  }, [jobs]);

  return (
    <div className="py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Featured Jobs</h2>
          <p className="text-gray-500 mt-2">
            Explore hand-picked opportunities from top companies
          </p>
        </div>

        {/* Job Grid */}

        {loading ? (
          <Spinner></Spinner>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {jobs?.map((job) => (
              <FeaturedJobCard key={job?._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedJobs;
