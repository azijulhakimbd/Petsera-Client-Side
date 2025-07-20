import axios from "axios";

const axiosSecure = axios.create({
  baseURL: `https://petsera-server-side.vercel.app`,
  withCredentials: true,
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
