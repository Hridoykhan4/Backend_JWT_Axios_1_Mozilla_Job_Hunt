/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import FeaturedJobCard from "./FeaturedJobCard";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure(`/jobs?fromFeatured=featureTrue`).then((data) => {
      setJobs(data.data);
      setLoading(false);
    });
  }, [axiosSecure]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 2, delay: 0.2 } }}
      className="py-10 bg-gray-50"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
            className="text-3xl font-bold text-gray-800"
          >
            Featured Jobs
          </motion.h2>
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
    </motion.div>
  );
};

export default FeaturedJobs;
