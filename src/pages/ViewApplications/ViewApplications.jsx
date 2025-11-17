import { useLoaderData } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFileAlt, FaClock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const ViewApplications = () => {
  const loadedAllApplicants = useLoaderData();
  const [applicants, setApplicants] = useState(loadedAllApplicants);

  const handleStatusChange = async (id, newStatus) => {
    const updatedApplicants = applicants.map((app) =>
      app._id === id ? { ...app, status: newStatus, saving: true } : app
    );
    setApplicants(updatedApplicants);

    try {
      await axios.patch(
        `https://job-portal-server-eight-iota.vercel.app/job-applications/${id}`,
        {
          status: newStatus,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Status Updated",
        text: `Applicant status set to ${newStatus}`,
        timer: 1500,
        showConfirmButton: false,
      });

      setApplicants((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status: newStatus, saving: false } : app
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      Swal.fire("Error", "Failed to update status", "error");

      setApplicants((prev) =>
        prev.map((app) => (app._id === id ? { ...app, saving: false } : app))
      );
    }
  };

  const statusOptions = ["Under Review", "Interview", "Hired", "Rejected"];

  return (
    <section className="px-4 md:px-10 lg:px-20 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Applicants <span className="text-blue-600">({applicants.length})</span>
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {applicants.map((applicant) => (
          <div
            key={applicant._id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-all"
          >
            <div className="mb-3">
              <p className="flex items-center gap-2 text-gray-700">
                <MdEmail className="text-blue-500" /> {applicant.email}
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <FaClock className="text-gray-400" />
                Applied {formatDistanceToNow(
                  new Date(applicant.appliedTime)
                )}{" "}
                ago
              </p>
            </div>

            <div className="flex flex-col gap-2 text-sm mt-2">
              <a
                href={applicant.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:underline"
              >
                <FaLinkedin /> LinkedIn
              </a>

              <a
                href={applicant.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-800 hover:underline"
              >
                <FaGithub /> GitHub
              </a>

              <a
                href={applicant.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-700 hover:underline"
              >
                <FaFileAlt /> Resume
              </a>
            </div>

            <div className="mt-4 text-sm text-gray-700">
              <p className="font-medium text-gray-900 mb-1">Cover Letter:</p>
              <p className="bg-gray-50 p-3 rounded border border-gray-200 line-clamp-5">
                {applicant.description}
              </p>
            </div>

            <div className="mt-4">
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Status
              </label>
              <select
                value={applicant.status || "Under Review"}
                onChange={(e) =>
                  handleStatusChange(applicant._id, e.target.value)
                }
                disabled={applicant.saving}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {applicant.saving && (
                <p className="text-xs text-blue-500 mt-1">Saving...</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {applicants.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No applicants found for this job.
        </p>
      )}
    </section>
  );
};

export default ViewApplications;
