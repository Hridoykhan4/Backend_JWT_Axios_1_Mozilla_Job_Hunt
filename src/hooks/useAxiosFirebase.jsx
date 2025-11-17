import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosFirebaseInstance = axios.create({
  baseURL: "https://job-portal-server-eight-iota.vercel.app",
  headers: {
    authorization: "",
  },
});
const useAxiosFirebase = () => {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  axiosFirebaseInstance.interceptors.request.use((config) => {
    if (user) {
      const accessToken = user.accessToken;
      config.headers.authorization = `Bearer ${accessToken}`;
      return config;
    }
  });

  axiosFirebaseInstance.interceptors.response.use(
    (res) => res,
    (error) => {
      console.log(error, "Interceptor Error ------");

      if (error.status === 401 || error.status === 403) {
        logout(() => {
          nav("/signIn");
        });
      }

      Promise.reject(error);
    }
  );

  return axiosFirebaseInstance;
};

export default useAxiosFirebase;
