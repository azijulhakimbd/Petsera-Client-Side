import React from "react";
import { useQuery } from "@tanstack/react-query";

import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import "react-loading-skeleton/dist/skeleton.css";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const MyDonations = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: donations = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myDonations", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/mine?email=${user.email}`);
      return res.data;
    },
  });

  const handleRefund = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to refund this donation?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, refund it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/donations/refund/${id}`, {
          email: user.email,
        });
        if (res.data.modifiedCount || res.data.acknowledged) {
          Swal.fire("Refunded!", "Your donation has been removed.", "success");
          refetch();
        }
      } catch (error) {
        console.error("Refund failed", error);
        Swal.fire("Error", "Refund failed. Try again.", "error");
      }
    }
  };

  if (loading || isLoading) {
    return (
      <div className="p-4 sm:p-6">
        <Skeleton height={30} width={200} className="mb-4" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} height={60} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="p-4 sm:p-6 text-gray-800 dark:text-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-center sm:text-left">
        My Donations
      </h2>

      {donations.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No donations found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm sm:text-base bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">Pet Image</th>
                <th className="px-4 py-3 text-left">Pet Name</th>
                <th className="px-4 py-3 text-left">Donated Amount</th>
                <th className="px-4 py-3 text-left">Refund</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <motion.tr
                  key={donation._id || index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-3">
                    <img
                      src={donation.image}
                      alt={donation.petName}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">{donation.petName}</td>
                  <td className="px-4 py-3">
                    {donation.amount !== undefined
                      ? `$${Number(donation.amount).toFixed(2)}`
                      : "N/A"}
                  </td>
                  <td className="px-4  py-3">
                    <button
                      onClick={() => handleRefund(donation._id)}
                      className="bg-yellow-500 btn hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                    >
                      Ask for Refund
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default MyDonations;
