import { useEffect } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const axiosSecure = axios.create({
  baseURL: `https://petsera-server-side.vercel.app`,
});

const useAxiosSecureRefresh = () => {
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken(true);
        localStorage.setItem("access-token", token);
      }
    });

    return () => unsubscribe();
  }, []);

  axiosSecure.interceptors.request.use(
    async (config) => {
      const storedToken = localStorage.getItem("access-token");

      if (storedToken) {
        config.headers.Authorization = `Bearer ${storedToken}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  return axiosSecure;
};

export default useAxiosSecureRefresh;
