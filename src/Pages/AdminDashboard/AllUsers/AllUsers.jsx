
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Skeleton from "react-loading-skeleton";
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
    return <Skeleton count={5} height={40} className="my-2" />;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <td>{idx + 1}</td>
                <td>
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td>{user.name || "Unknown"}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge ${user.role === "admin" ? "badge-success" : "badge-ghost"}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  {user.status === "banned" ? (
                    <span className="badge badge-error">Banned</span>
                  ) : (
                    <span className="badge badge-info">Active</span>
                  )}
                </td>
                <td className="space-x-2 text-center">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => makeAdminMutation.mutate(user._id)}
                      className="btn btn-xs btn-outline btn-success"
                    >
                      <FaShieldAlt className="mr-1" /> Make Admin
                    </button>
                  )}
                  {user.status !== "banned" && (
                    <button
                      onClick={() => banUserMutation.mutate(user._id)}
                      className="btn btn-xs btn-outline btn-error"
                    >
                      <FaBan className="mr-1" /> Ban
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
