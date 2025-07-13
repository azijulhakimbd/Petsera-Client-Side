import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaUserShield, FaBan } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Make Admin Mutation
  const makeAdminMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.patch(`/users/admin/${id}`),
    onSuccess: () => {
      Swal.fire("Success", "User promoted to admin", "success");
      queryClient.invalidateQueries(["allUsers"]);
    },
  });

  // Ban User Mutation
  const banUserMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.patch(`/users/ban/${id}`),
    onSuccess: () => {
      Swal.fire("User Banned", "The user can no longer log in.", "warning");
      queryClient.invalidateQueries(["allUsers"]);
    },
  });

  return (
    <motion.div
      className="overflow-x-auto p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      <table className="min-w-full table-auto rounded">
        <thead className="bg-pink-100 dark:bg-pink-900 text-left">
          <tr>
            <th className="p-3">Profile</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="border-t dark:border-gray-700">
                  <td className="p-3">
                    <Skeleton circle width={40} height={40} />
                  </td>
                  <td className="p-3">
                    <Skeleton width={100} />
                  </td>
                  <td className="p-3">
                    <Skeleton width={150} />
                  </td>
                  <td className="p-3">
                    <Skeleton width={70} />
                  </td>
                  <td className="p-3">
                    <Skeleton width={120} height={30} />
                  </td>
                </tr>
              ))
            : users.map((user) => (
                <motion.tr
                  key={user._id}
                  className="border-t dark:border-gray-700 hover:bg-pink-50 dark:hover:bg-gray-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <td className="p-3">
                    <img
                      src={user.photoURL}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 capitalize">{user.role}</td>
                  <td className="p-3 flex flex-wrap gap-2">
                    {user.role !== "admin" && (
                      <button
                        onClick={() => makeAdminMutation.mutate(user._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1"
                      >
                        <FaUserShield /> Make Admin
                      </button>
                    )}
                    {user.status !== "banned" && (
                      <button
                        onClick={() => banUserMutation.mutate(user._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                      >
                        <FaBan /> Ban
                      </button>
                    )}
                    {user.status === "banned" && (
                      <span className="text-red-500 font-semibold">Banned</span>
                    )}
                  </td>
                </motion.tr>
              ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default AllUsers;
