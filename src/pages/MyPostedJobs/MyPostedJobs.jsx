import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/Spinner";
import ErrorPage from "../../components/ErrorPage";
import useScrollTo from "../../hooks/useScrollTo";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyPostedJobs = () => {
  useScrollTo();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    isPending,
    error,
    data: jobs = [],
  } = useQuery({
    queryKey: ["HrPostedJobs", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      // const res = await axiosSecure(`/posted-jobs/${user?.email}`);
      const res = await axiosSecure(
        `/jobs/applicationsCount?email=${user?.email}`,{
          headers: {
            authorization: `Bearer ${user?.accessToken}`
          }
        }
      );
      return res.data;
    },
  });

  if (isPending) return <Spinner />;
  if (error) return <ErrorPage />;

  return (
    <section className="px-4 md:px-10 lg:px-20 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        My Posted Jobs <span className="text-blue-600">({jobs.length})</span>
      </h2>

      <div className="overflow-x-auto bg-white shadow-xl rounded-lg border border-gray-100">
        <table className="min-w-full text-sm text-left text-gray-800">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4 font-semibold">Serial</th>
              <th className="px-6 py-4 font-semibold">Title</th>
              <th className="px-6 py-4 font-semibold">Applications</th>
              <th className="px-6 py-4 font-semibold">Deadline</th>
              <th className="px-6 py-4 font-semibold">Applications</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {jobs.map((job, i) => (
              <tr
                key={job._id}
                className="hover:bg-gray-50 odd:bg-gray-50/50 transition-all"
              >
                <td className="px-6 py-4 text-gray-500 font-mono">{i + 1}</td>
                <td className="px-6 py-4 font-medium">{job.title}</td>
                <td className="px-6 py-4 text-center">
                  {job?.totalCount || 0}
                </td>
                <td className="px-6 py-4">{job.applicationDeadline}</td>
                <td>
                  <Link
                    to={`/viewApplications/${job._id}`}
                    className="btn btn-link"
                  >
                    View Applications
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {jobs.length === 0 && (
        <p className="text-center text-gray-400 text-sm mt-6">
          You haven’t posted any jobs yet.
        </p>
      )}
    </section>
  );
};

export default MyPostedJobs;
