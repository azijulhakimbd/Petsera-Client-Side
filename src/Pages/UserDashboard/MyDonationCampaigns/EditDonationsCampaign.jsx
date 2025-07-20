import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const EditMyDonationCampaign = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      petName: "",
      description: "",
      shortDescription: "",
      maxAmount: "",
      lastDate: "",
    },
  });

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(`/donations/update-donation/${id}`);
        const donationData = response.data;

        reset({
          petName: donationData.petName || "",
          description: donationData.longDescription || "",
          shortDescription: donationData.shortDescription || "",
          maxAmount: donationData.maxAmount || "",
          lastDate: donationData.lastDate?.split("T")[0] || "", // format YYYY-MM-DD
        });
      } catch (error) {
        Swal.fire("Error", "Failed to load donation data", "error");
        navigate("/dashboard/my-donations");
      } finally {
        setLoading(false);
      }
    };

    fetchDonation();
  }, [id, reset, axiosSecure, navigate]);

  const onSubmit = async (data) => {
    try {
      await axiosSecure.put(`/donations/update-donation/${id}`, data);
      Swal.fire("Success", "Donation updated successfully", "success");
      navigate("/dashboard/my-campaigns");
    } catch (error) {
      Swal.fire("Error", "Failed to update donation", "error");
    }
  };

  const renderSkeleton = (width = "100%", height = 36) => (
    <Skeleton
      baseColor="#d1d5db"
      highlightColor="#f3f4f6"
      width={width}
      height={height}
    />
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-xl mx-auto p-6 rounded shadow bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Donation</h2>

      {loading ? (
        <div className="space-y-6">
          {renderSkeleton()}
          {renderSkeleton("100%", 80)}
          {renderSkeleton()}
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Pet Name */}
          <div>
            <label className="block mb-1 font-semibold">Pet Name</label>
            <input
              type="text"
              {...register("petName", { required: "Pet Name is required" })}
              className={`input input-bordered border rounded px-1 w-full bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-300 ${
                errors.petName ? "input-error" : ""
              }`}
              placeholder="Enter pet name"
              disabled={isSubmitting}
            />
            {errors.petName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.petName.message}
              </p>
            )}
          </div>

          {/* Short Description */}
          <div>
            <label className="block mb-1 font-semibold">
              Short Description
            </label>
            <input
              type="text"
              {...register("shortDescription", {
                required: "Short description is required",
              })}
              className={`input input-bordered border rounded px-1 w-full bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-300 ${
                errors.shortDescription ? "input-error" : ""
              }`}
              placeholder="e.g., Friendly dog looking for home"
              disabled={isSubmitting}
            />
            {errors.shortDescription && (
              <p className="text-red-500 text-sm mt-1">
                {errors.shortDescription.message}
              </p>
            )}
          </div>

          {/* Long Description */}
          <div>
            <label className="block mb-1 font-semibold">Long Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className={`textarea textarea-bordered border rounded px-1 w-full bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-300 ${
                errors.description ? "textarea-error" : ""
              }`}
              placeholder="Describe your donation campaign"
              rows={4}
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Max Amount */}
          <div>
            <label className="block mb-1 font-semibold">Max Amount ($)</label>
            <input
              type="number"
              step="0.01"
              {...register("maxAmount", {
                required: "Max Amount is required",
                min: { value: 1, message: "Amount must be at least 1" },
              })}
              className={`input input-bordered w-full border rounded px-1 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-300 ${
                errors.maxAmount ? "input-error" : ""
              }`}
              placeholder="Enter maximum amount"
              disabled={isSubmitting}
            />
            {errors.maxAmount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.maxAmount.message}
              </p>
            )}
          </div>

          {/* Last Date */}
          <div>
            <label className="block mb-1 font-semibold">Last Date</label>
            <input
              type="date"
              {...register("lastDate", { required: "Last date is required" })}
              className={`input input-bordered border rounded px-1 w-full bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-300 ${
                errors.lastDate ? "input-error" : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.lastDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastDate.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn hover:bg-green-400 bg-green-700 rounded-2xl p-2 w-full ${
                isSubmitting ? "loading" : ""
              }`}
            >
              Update Donation
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default EditMyDonationCampaign;
