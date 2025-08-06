import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useJobs = (sort, search, minSalary, maxSalary) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure(
      `/jobs?sort=${sort}&search=${search}&minSalary=${minSalary}&maxSalary=${maxSalary}`
    ).then((data) => {
      setJobs(data.data);
      setLoading(false);
    });
  }, [sort, axiosSecure, search, minSalary, maxSalary]);

  return {
    jobs,
    loading,
  };
};

export default useJobs;
