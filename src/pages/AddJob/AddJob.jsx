import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import useScrollTo from "../../hooks/useScrollTo";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  useScrollTo();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [jobData, setJobData] = useState({
    title: "",
    location: "",
    jobType: "",
    category: "",
    applicationDeadline: "",
    salaryMin: "",
    salaryMax: "",
    currency: "bdt",
    description: "",
    company: "",
    company_logo: "",
    requirements: "",
    responsibilities: "",
    status: "active",
    hr_email: `${user?.email}`,
    hr_name: user?.displayName,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      title: jobData.title,
      location: jobData.location,
      jobType: jobData.jobType,
      category: jobData.category,
      applicationDeadline: jobData.applicationDeadline,
      salaryRange: {
        min: parseInt(jobData.salaryMin),
        max: parseInt(jobData.salaryMax),
        currency: jobData.currency,
      },
      description: jobData.description,
      company: jobData.company,
      company_logo: jobData.company_logo || "",
      requirements: jobData.requirements
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      responsibilities: jobData.responsibilities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      status: "active",
      hr_email: user?.email,
      hr_name: user?.displayName,
    };

    axios
      .post(
        "https://job-portal-server-eight-iota.vercel.app/jobs",
        formattedData
      )
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire("Success", "Job posted successfully!", "success");
          setJobData({
            title: "",
            location: "",
            jobType: "",
            category: "",
            applicationDeadline: "",
            salaryMin: "",
            salaryMax: "",
            currency: "bdt",
            description: "",
            company: "",
            company_logo: "",
            requirements: "",
            responsibilities: "",
            status: "active",
            hr_name: "",
          });
          navigate(`/myPostedJobs`);
        }
      })
      .catch(() => {
        Swal.fire("Error", "Something went wrong. Please try again.", "error");
      });
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
        📝 Post a New Job
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {[
          { name: "title", placeholder: "Job Title" },
          { name: "location", placeholder: "Job Location" },
          {
            name: "jobType",
            placeholder: "Job Type (Full-Time, Part-Time, etc.)",
          },
          {
            name: "category",
            placeholder: "Category (Engineering, Marketing, etc.)",
          },
          { name: "applicationDeadline", type: "date" },
          { name: "salaryMin", placeholder: "Salary Minimum", type: "number" },
          { name: "salaryMax", placeholder: "Salary Maximum", type: "number" },
          {
            name: "currency",
            placeholder: "Currency (e.g., BDT)",
            defaultValue: "bdt",
          },
          { name: "company", placeholder: "Company Name" },
          { name: "company_logo", placeholder: "Company Logo URL" },
        ].map((input, idx) => (
          <input
            key={idx}
            type={input.type || "text"}
            name={input.name}
            placeholder={input.placeholder}
            value={jobData[input.name]}
            onChange={handleChange}
            className="input input-bordered w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        ))}

        <input
          type="email"
          defaultValue={user?.email}
          readOnly
          className="input input-bordered w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          defaultValue={user?.displayName}
          readOnly
          className="input input-bordered w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold text-gray-700">
            Job Description
          </label>
          <textarea
            name="description"
            value={jobData.description}
            onChange={handleChange}
            placeholder="Write a clear and attractive job description..."
            className="textarea textarea-bordered w-full min-h-[100px] rounded-md"
            required
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold text-gray-700">
            Requirements (comma separated)
          </label>
          <textarea
            name="requirements"
            value={jobData.requirements}
            onChange={handleChange}
            placeholder="e.g., JavaScript, React, MongoDB"
            className="textarea textarea-bordered w-full min-h-[80px] rounded-md"
            required
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold text-gray-700">
            Responsibilities (comma separated)
          </label>
          <textarea
            name="responsibilities"
            value={jobData.responsibilities}
            onChange={handleChange}
            placeholder="e.g., Maintain code, Collaborate with team"
            className="textarea textarea-bordered w-full min-h-[80px] rounded-md"
            required
          ></textarea>
        </div>

        <div className="md:col-span-2 text-center mt-4">
          <button
            type="submit"
            className="btn btn-primary px-8 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition"
          >
            🚀 Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
