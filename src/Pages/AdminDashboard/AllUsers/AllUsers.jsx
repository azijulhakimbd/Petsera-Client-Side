import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Swal from "sweetalert2";
import { FaShieldAlt, FaBan } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const makeAdminMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/users/admin/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
      Swal.fire("Success!", "User has been made admin.", "success");
    },
  });

  const banUserMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/users/ban/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
      Swal.fire("Banned!", "User has been banned.", "warning");
    },
  });

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton
          count={5}
          height={40}
          className="my-2 rounded-md"
          baseColor="#e2e8f0"
          highlightColor="#f8fafc"
          // automatically adapts to dark mode if your tailwind config enables it
        />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        All Users
      </h2>

      <div className="overflow-x-auto rounded-md border border-gray-300 dark:border-gray-700">
        <table className="table-auto w-full min-w-[600px] border-collapse text-gray-800 dark:text-gray-200">
          <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
            <tr>
              <th className="px-3 py-2 text-left text-sm font-medium">#</th>
              <th className="px-3 py-2 text-left text-sm font-medium">Profile</th>
              <th className="px-3 py-2 text-left text-sm font-medium">Name</th>
              <th className="px-3 py-2 text-left text-sm font-medium">Email</th>
              <th className="px-3 py-2 text-left text-sm font-medium">Role</th>
              <th className="px-3 py-2 text-left text-sm font-medium">Status</th>
              <th className="px-3 py-2 text-center text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {users.map((user, idx) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <td className="px-3 py-2">{idx + 1}</td>
                  <td className="px-3 py-2">
                    <img
                      src={user.photoURL || "/default-avatar.png"}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-3 py-2">{user.name || "Unknown"}</td>
                  <td className="px-3 py-2 break-all">{user.email}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200"
                          : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    {user.status === "banned" ? (
                      <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200">
                        Banned
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-center space-x-2">
                    {user.role !== "admin" && (
                      <button
                        onClick={() => makeAdminMutation.mutate(user._id)}
                        className="inline-flex items-center btn p-2 rounded-2xl text-white bg-green-600 btn-xs btn-outline btn-success hover:bg-green-300 hover:text-white dark:hover:bg-green-500"
                        disabled={makeAdminMutation.isLoading}
                        aria-label={`Make ${user.name} an admin`}
                      >
                        <FaShieldAlt className="mr-1" /> Make Admin
                      </button>
                    )}
                    {user.status !== "banned" && (
                      <button
                        onClick={() => banUserMutation.mutate(user._id)}
                        className="inline-flex items-center bg-yellow-600 btn rounded-2xl p-2 btn-xs btn-outline btn-error hover:bg-red-600 hover:text-white dark:hover:bg-red-500"
                        disabled={banUserMutation.isLoading}
                        aria-label={`Ban ${user.name}`}
                      >
                        <FaBan className="mr-1" /> Ban
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
