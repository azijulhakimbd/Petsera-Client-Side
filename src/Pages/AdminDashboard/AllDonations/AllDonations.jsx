import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaCheck, FaTimes, FaPause, FaPlay } from "react-icons/fa";

const AllDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // State for inline editing
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["allDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/all`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/donations/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["allDonations"]);
      Swal.fire("Deleted!", "Donation campaign has been deleted.", "success");
    },
  });

  const updatePauseMutation = useMutation({
    mutationFn: ({ id, paused }) =>
      axiosSecure.patch(`/donations/${id}/pause`, { paused }),
    onSuccess: () => {
      queryClient.invalidateQueries(["allDonations"]);
      Swal.fire("Updated!", "Pause status updated.", "success");
    },
  });

  const updateTitleMutation = useMutation({
    mutationFn: ({ id, title }) =>
      axiosSecure.patch(`/donations/${id}`, { title }),
    onSuccess: () => {
      queryClient.invalidateQueries(["allDonations"]);
      Swal.fire("Updated!", "Campaign title updated.", "success");
    },
  });

  const startEditing = (donation) => {
    setEditingId(donation._id);
    setEditedTitle(donation.petName);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditedTitle("");
  };

  const saveEditing = () => {
    updateTitleMutation.mutate({ id: editingId, title: editedTitle });
    cancelEditing();
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} height={40} />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white fredoka">All Donation Campaigns (Admin)</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <tr>
              <th className="p-2 lato border">Title</th>
              <th className="p-2 lato border">Total Amount</th>
              <th className="p-2 lato border">Status</th>
              <th className="p-2 lato border">Created By</th>
              <th className="p-2 lato border">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {donations.map((donation) => (
                <motion.tr
                  key={donation._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="border hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="border p-2">
                    {editingId === donation._id ? (
                      <input
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="w-full px-2 py-1 border rounded dark:bg-gray-900 dark:text-white"
                      />
                    ) : (
                      <span className="dark:text-white inter">{donation.petName}</span>
                    )}
                  </td>
                  <td className="border p-2 dark:text-white inter">${donation.maxAmount}</td>
                  <td className="border p-2">
                    {donation.paused ? (
                      <span className="text-yellow-500 font-medium inter">Paused</span>
                    ) : (
                      <span className="text-green-600 font-semibold inter">Active</span>
                    )}
                  </td>
                  <td className="border p-2 dark:text-white inter">{donation.createdBy}</td>
                  <td className="border p-2 flex flex-wrap gap-2 justify-center">
                    {editingId === donation._id ? (
                      <>
                        <button
                          onClick={saveEditing}
                          className="text-green-600 inter hover:text-green-800"
                          title="Save"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="text-red-600 inter hover:text-red-800"
                          title="Cancel"
                        >
                          <FaTimes />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(donation)}
                          className="text-blue-600 inter hover:text-blue-800"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() =>
                            Swal.fire({
                              title: "Are you sure?",
                              text: "This will permanently delete the campaign!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                deleteMutation.mutate(donation._id);
                              }
                            })
                          }
                          className="text-red-600 inter hover:text-red-800"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                        <button
                          onClick={() =>
                            updatePauseMutation.mutate({
                              id: donation._id,
                              paused: !donation.paused,
                            })
                          }
                          className={`${
                            donation.paused
                              ? "text-green-500 inter hover:text-green-700"
                              : "text-yellow-600 inter hover:text-yellow-800"
                          }`}
                          title={donation.paused ? "Unpause" : "Pause"}
                        >
                          {donation.paused ? <FaPlay /> : <FaPause />}
                        </button>
                      </>
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

export default AllDonations;
