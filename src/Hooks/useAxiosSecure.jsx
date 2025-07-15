// useAxiosSecure.js
import axios from "axios";
import { getAuth } from "firebase/auth";

const axiosSecure = axios.create({
  baseURL: `http://localhost:3000`,
});

axiosSecure.interceptors.request.use(
  async (config) => {
    const storedToken = localStorage.getItem("access-token");
    if (storedToken) {
      config.headers.Authorization = `Bearer ${storedToken}`;
      return config;
    }

   
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        
        localStorage.setItem("access-token", token);
      }
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
