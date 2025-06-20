import { Link, useLoaderData } from "react-router-dom";
import useScrollTo from "../../hooks/useScrollTo";

const JobDetails = () => {
  const job = useLoaderData();
  useScrollTo();
  const {
    title,
    location,
    jobType,
    category,
    applicationDeadline,
    salaryRange,
    description,
    company,
    requirements,
    responsibilities,
    hr_email,
    hr_name,
    company_logo,
    _id,
  } = job || {};

  return (
    <div className="bg-gray-50 py-10 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        {/* Company Banner */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-8 flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={company_logo}
              alt={company}
              className="w-20 h-20 rounded-md object-contain border p-2"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
              <p className="text-gray-600">
                {company} — {location}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">
              Deadline: {applicationDeadline}
            </p>
            <Link
              to={`/jobApply/${_id}`}
              className="mt-2 px-5 block py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
            >
              Apply Now
            </Link>
          </div>
        </div>

        {/* Job Details Section */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side */}
          <div className="lg:col-span-2 bg-white shadow-md rounded-xl p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                Job Description
              </h2>
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                Responsibilities
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {responsibilities?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                Requirements
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {requirements?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side / Sidebar */}
          <div className="bg-white shadow-md rounded-xl p-6 space-y-5">
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">Job Type</h3>
              <p className="text-gray-800">{jobType}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-1">Category</h3>
              <p className="text-gray-800">{category}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-1">Salary Range</h3>
              <p className="text-gray-800">
                {salaryRange?.min} - {salaryRange?.max}{" "}
                {salaryRange?.currency?.toUpperCase()}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-1">HR Contact</h3>
              <p className="text-gray-800">{hr_name}</p>
              <a
                href={`mailto:${hr_email}`}
                className="text-blue-600 hover:underline"
              >
                {hr_email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
