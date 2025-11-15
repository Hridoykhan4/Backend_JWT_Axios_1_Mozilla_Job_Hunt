import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useScrollTo from "../../hooks/useScrollTo";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const JobApply = () => {
  const [error, setError] = useState("");
  const nav = useNavigate();
  const { user } = useAuth();

  useScrollTo();
  const { id } = useParams();
  const submitJobApplication = (e) => {
    e.preventDefault();
    const form = e.target;

    const applicationData = {
      job_id: id,
      email: user?.email,
      linkedin: form.linkedin.value,
      github: form.github.value,
      resume: form.resume.value,
      description: form.description.value,
      agreed: form.agree.checked,
      appliedTime: new Date().toISOString(),
    };
    // Simple validation
    if (!applicationData.agreed) {
      setError("You must agree to the terms and conditions to proceed.");
      return;
    }
    setError("");

    // Check whether the same job applied by the user
    axios
      .get(
        `http://localhost:5000/applications/check?id=${id}&email=${user?.email}`
      )
      .then((res) => {
        if (res.data.exists) {
          Swal.fire({
            icon: "info",
            title: "Already Applied",
            text: "You've already applied for this job.",
            confirmButtonColor: "#3B82F6",
            confirmButtonText: "Okay",
          });
          return;
        } else {
          axios
            .post("http://localhost:5000/job-applications", applicationData)
            .then((res) => {
              if (res.data.insertedId) {
                Swal.fire({
                  icon: "success",
                  title: "Application Submitted!",
                  text: "Your job application has been received. We'll be in touch soon.",
                  confirmButtonColor: "#2563EB",
                });
                form.reset();
                nav("/myApplications");
              }
            })
            .catch((err) => {
              console.error(err);
              Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text: "Something went wrong. Please try again later.",
                confirmButtonColor: "#DC2626",
              });
            });
          setError("");
          form.reset();
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Something went wrong while checking your application status.",
          confirmButtonColor: "#EF4444", // Tailwind red-500
        });
      });
  };

  return (
    <div className="bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Job Application Form
        </h2>

        <form onSubmit={submitJobApplication} className="space-y-5">
          <div>
            <label
              htmlFor="linkedin"
              className="block font-medium text-gray-700"
            >
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              name="linkedin"
              required
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://www.linkedin.com/in/yourprofile"
            />
          </div>

          <div>
            <label htmlFor="github" className="block font-medium text-gray-700">
              GitHub Profile URL
            </label>
            <input
              type="url"
              name="github"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://github.com/yourusername"
            />
          </div>

          <div>
            <label htmlFor="resume" className="block font-medium text-gray-700">
              Resume URL (Google Drive, Dropbox, etc.)
            </label>
            <input
              type="url"
              name="resume"
              required
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://drive.google.com/..."
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block font-medium text-gray-700"
            >
              Why should we hire you?
            </label>
            <textarea
              name="description"
              rows="4"
              required
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tell us about your strengths, motivation, or relevant experience in under 30 words."
            ></textarea>
          </div>

          <div className="flex items-start gap-2">
            <input type="checkbox" name="agree" className="mt-1" required />
            <p className="text-sm text-gray-600">
              I agree to the terms and conditions, and confirm that the
              information provided is accurate.
            </p>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApply;
