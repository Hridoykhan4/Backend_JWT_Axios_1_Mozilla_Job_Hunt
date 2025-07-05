import { useEffect, useState } from "react";
import FeaturedJobCard from "./FeaturedJobCard";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`http://localhost:5000/jobs?fromFeatured=featureTrue`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      });
  }, []);

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
          <Spinner />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs?.map((job) => (
                <FeaturedJobCard key={job?._id} job={job} />
              ))}
            </div>

        
            <div className="text-center mt-10">
              <Link
                to="/allJobs"
                className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
              >
                View All Jobs →
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FeaturedJobs;
