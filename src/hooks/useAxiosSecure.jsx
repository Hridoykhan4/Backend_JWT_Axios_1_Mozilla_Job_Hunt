import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

// 1. Create the axios instance outside the hook (singleton)
const axiosInstance = axios.create({
  baseURL: `https://job-portal-server-eight-iota.vercel.app`,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logout } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          logout().then(() => {
            nav("/signIn");
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [logout, nav]);

  return axiosInstance;
};

export default useAxiosSecure;
