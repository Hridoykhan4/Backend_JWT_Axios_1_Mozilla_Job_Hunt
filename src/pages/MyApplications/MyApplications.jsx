import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import useScrollTo from "../../hooks/useScrollTo";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyApplications = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const axiosSecure = useAxiosSecure();
  useScrollTo();
  // Fetch all job applications for current user
  useEffect(() => {
    axiosSecure
      .get(`/appliedData?email=${user.email}`)
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [user.email, axiosSecure]);

  // Delete application
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove your application from the list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/job-application/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              setJobs(jobs.filter((job) => job._id !== id));
              Swal.fire(
                "Deleted!",
                "Your application has been removed.",
                "success"
              );
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire(
              "Error!",
              "Something went wrong. Try again later.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="bg-gray-50 py-10 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          My Job Applications ({jobs.length})
        </h2>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-white uppercase bg-blue-600">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Job Title</th>
                <th className="px-6 py-3">Company</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Applied On</th>
                <th className="px-6 py-3">Resume</th>
                <th className="px-6 py-3">LinkedIn</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr
                  key={job._id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="px-6 py-4">{index + 1}</td>

                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={job.company_logo}
                      alt={job.company}
                      className="w-10 h-10 object-contain rounded"
                    />
                    <span className="font-medium">{job.title}</span>
                  </td>

                  <td className="px-6 py-4">{job.company}</td>

                  <td className="px-6 py-4">{job.location}</td>

                  <td className="px-6 py-4">
                    {new Date(job.appliedTime).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <a
                      href={job.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </a>
                  </td>

                  <td className="px-6 py-4">
                    <a
                      href={job.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Profile
                    </a>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {jobs.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    You haven’t applied to any jobs yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
