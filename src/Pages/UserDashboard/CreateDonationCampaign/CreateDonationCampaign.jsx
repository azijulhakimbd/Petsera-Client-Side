import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { AuthContext } from "../../../Context/AuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const CreateDonationCampaign = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [uploading, setUploading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setUploading(true);

      // Upload image to imgbb
      const formData = new FormData();
      formData.append("image", data.picture[0]);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );

      const imageUrl = imgRes.data.data.url;

      // Prepare donation campaign object
      const newCampaign = {
        petName: data.petName,
        image: imageUrl,
        maxAmount: parseFloat(data.maxAmount),
        lastDate: data.lastDate,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        createdAt: new Date().toISOString(),
        createdBy: user?.email,
      };

      // Post to backend
      const res = await axiosSecure.post("/donations", newCampaign);

      if (res.data.insertedId) {
        Swal.fire("Success!", "Donation campaign created successfully!", "success");
        reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Something went wrong while creating the campaign.", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.section
      className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl fredoka font-bold mb-6 text-center text-gray-800 dark:text-white">
        Create Donation Campaign
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Pet Name */}
        <div>
          <label className="block inter font-medium mb-1 text-gray-700 dark:text-gray-200">
            Pet Name
          </label>
          {uploading ? (
            <Skeleton height={40} />
          ) : (
            <>
              <input
                type="text"
                {...register("petName", { required: "Pet name is required" })}
                className="input border rounded input-bordered w-full"
              />
              {errors.petName && (
                <p className="text-red-500">{errors.petName.message}</p>
              )}
            </>
          )}
        </div>

        {/* Pet Picture */}
        <div>
          <label className="block inter font-medium mb-1 text-gray-700 dark:text-gray-200">
            Pet Picture
          </label>
          {uploading ? (
            <Skeleton height={40} />
          ) : (
            <>
              <input
                type="file"
                accept="image/*"
                {...register("picture", { required: "Pet picture is required" })}
                className="file-input border rounded file-input-bordered w-full"
              />
              {errors.picture && (
                <p className="text-red-500">{errors.picture.message}</p>
              )}
            </>
          )}
        </div>

        {/* Max Donation Amount */}
        <div>
          <label className="block inter font-medium mb-1 text-gray-700 dark:text-gray-200">
            Maximum Donation Amount ($)
          </label>
          {uploading ? (
            <Skeleton height={40} />
          ) : (
            <>
              <input
                type="number"
                step="0.01"
                {...register("maxAmount", { required: "Maximum amount is required" })}
                className="input border rounded input-bordered w-full"
              />
              {errors.maxAmount && (
                <p className="text-red-500">{errors.maxAmount.message}</p>
              )}
            </>
          )}
        </div>

        {/* Last Date */}
        <div>
          <label className="block inter font-medium mb-1 text-gray-700 dark:text-gray-200">
            Last Date of Donation
          </label>
          {uploading ? (
            <Skeleton height={40} />
          ) : (
            <>
              <input
                type="date"
                {...register("lastDate", { required: "Last date is required" })}
                className="input border rounded input-bordered w-full"
              />
              {errors.lastDate && (
                <p className="text-red-500">{errors.lastDate.message}</p>
              )}
            </>
          )}
        </div>

        {/* Short Description */}
        <div>
          <label className="block inter font-medium mb-1 text-gray-700 dark:text-gray-200">
            Short Description
          </label>
          {uploading ? (
            <Skeleton height={40} />
          ) : (
            <>
              <input
                type="text"
                {...register("shortDescription", {
                  required: "Short description is required",
                })}
                className="input border rounded input-bordered w-full"
              />
              {errors.shortDescription && (
                <p className="text-red-500">{errors.shortDescription.message}</p>
              )}
            </>
          )}
        </div>

        {/* Long Description */}
        <div>
          <label className="block inter font-medium mb-1 text-gray-700 dark:text-gray-200">
            Long Description
          </label>
          {uploading ? (
            <Skeleton height={100} />
          ) : (
            <>
              <textarea
                rows={4}
                {...register("longDescription", {
                  required: "Long description is required",
                })}
                className="textarea textarea-bordered border rounded w-full"
              ></textarea>
              {errors.longDescription && (
                <p className="text-red-500">{errors.longDescription.message}</p>
              )}
            </>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <motion.button
            type="submit"
            className="btn bg-yellow-500 text-shadow-fuchsia-500 border p-2 rounded-2xl hover:bg-green-500 btn-primary w-full"
            disabled={isSubmitting || uploading}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
          >
            {uploading ? "Uploading..." : "Create Campaign"}
          </motion.button>
        </div>
      </form>
    </motion.section>
  );
};

export default CreateDonationCampaign;
