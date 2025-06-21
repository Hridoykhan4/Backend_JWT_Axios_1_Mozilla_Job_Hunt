import { FaMapMarkerAlt } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { Link } from "react-router-dom";

const FeaturedJobCard = ({ job }) => {
  const {
    title,
    location,
    jobType,
    category,
    description,
    company,
    salaryRange,
    requirements,
    company_logo,
    _id
  } = job || {};

  return (
    <div className="bg-white rounded-xl shadow-md p-5 w-full max-w-md mx-auto flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
      {/* Top Section */}
      <div className="flex flex-col gap-3 flex-grow">
        {/* Category */}
        <div className="flex justify-between  items-center">
          <img
            src={company_logo}
            alt={company}
            className="w-10 h-10 object-contain rounded-full"
          />
          <p className="text-sm badge  text-blue-600 font-medium">{category}</p>
        </div>
        {/* Title + Company */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-600">{company}</p>
        </div>

        {/* Location and Job Type */}
        <div className="flex items-center text-gray-500 text-sm gap-4 flex-wrap">
          <span className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-gray-400" />
            {location}
          </span>
          <span className="flex items-center gap-1">
            <BsClock className="text-gray-400" />
            {jobType}
          </span>
        </div>

        {/* Salary */}
        <p className="text-sm font-medium text-gray-700">
          ৳ {salaryRange.min.toLocaleString()} –{" "}
          {salaryRange.max.toLocaleString()}{" "}
          {salaryRange.currency.toUpperCase()}
        </p>

        {/* Requirements */}
        <div className="flex flex-wrap gap-2">
          {requirements.slice(0, 4).map((req, index) => (
            <span
              key={index}
              className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
            >
              {req}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
      </div>

      {/* Bottom Section: Logo aligned to bottom-right */}
      <div className="flex justify-end mt-4">
        <Link to={`/jobs/${_id}`} className="bg-blue-600 btn hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-md shadow-md transition duration-300">
          Apply 
        </Link>
      </div>
    </div>
  );
};

export default FeaturedJobCard;
