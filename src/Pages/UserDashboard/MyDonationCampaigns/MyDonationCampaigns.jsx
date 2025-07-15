import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Modal from "react-modal";
import {
  FaPauseCircle,
  FaPlayCircle,
  FaCheckCircle,
} from "react-icons/fa";

Modal.setAppElement("#root");

const MyDonationCampaigns = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  const [loadingPauseId, setLoadingPauseId] = useState(null);

  const { data: campaigns = [], isLoading } = useQuery({
    queryKey: ["myDonations", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/users?email=${user.email}`);
      return res.data;
    },
  });

  const pauseMutation = useMutation({
    mutationFn: async ({ id, paused }) => {
      return axiosSecure.patch(`/donations/pause/${id}`, { paused });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myDonations", user.email]);
      Swal.fire("Updated!", "Pause status updated", "success");
      setLoadingPauseId(null);
    },
    onError: (error) => {
      console.error("Error updating pause status:", error);
      Swal.fire("Error", "Could not update pause status", "error");
      setLoadingPauseId(null);
    },
  });

  const handlePauseToggle = (id, currentStatus) => {
    setLoadingPauseId(id);
    pauseMutation.mutate({ id, paused: !currentStatus });
  };

  if (isLoading)
    return <div className="text-center mt-10">Loading campaigns...</div>;

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        My Donation Campaigns
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white">
            <tr>
              <th>Pet Name</th>
              <th>Max Amount</th>
              <th>Progress</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => {
              const donated = campaign.totalDonated || 0;
              const paused = campaign.paused ?? false;
              const isLoadingPause = loadingPauseId === campaign._id;

              return (
                <tr key={campaign._id}>
                  <td>{campaign.petName || "N/A"}</td>
                  <td>
                    {typeof campaign.maxAmount === "number"
                      ? `$${campaign.maxAmount.toFixed(2)}`
                      : "N/A"}
                  </td>
                  <td>
                    <progress
                      className="progress progress-success w-40"
                      value={donated}
                      max={campaign.maxAmount || 1} // max 0 হলে 1 set করা হয়েছে
                    />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                      ${donated} / {campaign.maxAmount || "N/A"}
                    </span>
                  </td>
                  <td className="flex items-center gap-1">
                    {paused ? (
                      <>
                        <FaPauseCircle className="text-yellow-500" />
                        <span className="badge badge-warning">Paused</span>
                      </>
                    ) : (
                      <>
                        <FaCheckCircle className="text-green-500" />
                        <span className="badge badge-success">Active</span>
                      </>
                    )}
                  </td>
                  <td className="space-x-2 text-center">
                    <button
                      disabled={isLoadingPause}
                      className={`btn btn-outline border p-1 rounded ${
                        isLoadingPause
                          ? "opacity-50 cursor-not-allowed"
                          : paused
                          ? "hover:bg-green-600"
                          : "hover:bg-red-600"
                      }`}
                      onClick={() => handlePauseToggle(campaign._id, paused)}
                    >
                      {paused ? (
                        <>
                          <FaPlayCircle className="inline mr-1" />
                          Unpause
                        </>
                      ) : (
                        <>
                          <FaPauseCircle className="inline mr-1" />
                          Pause
                        </>
                      )}
                    </button>
                    <button
                      className="btn btn-outline hover:bg-yellow-400 border p-1 rounded btn-info"
                      onClick={() =>
                        navigate(`/dashboard/edit-donation/${campaign._id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline hover:bg-blue-600 border p-1 rounded btn-secondary"
                      onClick={() => {
                        setSelectedCampaign(campaign);
                        setModalOpen(true);
                      }}
                    >
                      View Donators
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* View Donators Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="bg-white dark:bg-gray-900 p-6 max-w-lg mx-auto mt-20 rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black/80 bg-opacity-50 flex items-start justify-center"
      >
        <h3 className="text-xl font-semibold mb-4">Donators</h3>
        {selectedCampaign?.donators?.length > 0 ? (
          <ul className="space-y-2">
            {selectedCampaign.donators.map((donator, idx) => (
              <li
                key={idx}
                className="flex justify-between border-b pb-1 text-sm"
              >
                <span>{donator.name || donator.email}</span>
                <span>${donator.amount}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No donations yet.</p>
        )}
        <div className="mt-4 text-right">
          <button
            onClick={() => setModalOpen(false)}
            className="btn btn-sm btn-error border p-1 rounded"
          >
            Close
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default MyDonationCampaigns;
