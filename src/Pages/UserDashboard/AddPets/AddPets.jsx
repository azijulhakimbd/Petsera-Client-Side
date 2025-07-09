import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../../Context/AuthContext";

const categoryOptions = [
  { value: "Cat", label: "Cat" },
  { value: "Dog", label: "Dog" },
  { value: "Rabbit", label: "Rabbit" },
  { value: "Fish", label: "Fish" },
  { value: "Bird", label: "Bird" },
  { value: "Others", label: "Others" },
];

const AddPet = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const uploadImage = async (file) => {
    setImageError("");
    setImageUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=3314df578de5d0a3cc3382b351cd658b`,
        formData
      );
      setImageUrl(res.data.data.url);
    } catch (error) {
      setImageError("Image upload failed. Please try again.");
      setImageUrl(null);
    } finally {
      setImageUploading(false);
    }
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (petData) => {
      const res = await axiosSecure.post("/pets", petData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Pet added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
      setImageUrl(null);
      navigate("/dashboard/my-pets");
    },
    onError: () => {
      Swal.fire("Oops...", "Something went wrong while adding the pet!", "error");
    },
  });

  const onSubmit = async (data) => {
    if (!imageUrl) {
      setImageError("Please upload an image before submitting.");
      return;
    }

    const petData = {
      name: data.name,
      age: data.age,
      category: data.category.value,
      location: data.location,
      shortDescription: data.shortDescription,
      longDescription: data.longDescription,
      image: imageUrl,
      addedBy: user?.email,
      addedAt: new Date().toISOString(),
      adopted: false,
    };

    await mutateAsync(petData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 dark:text-white rounded-lg shadow mt-10"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Add a Pet</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Pet Image */}
        <div>
          <label className="block font-medium mb-1">Pet Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => uploadImage(e.target.files[0])}
            className="w-full border px-4 py-2 rounded bg-white dark:bg-gray-800 dark:text-white"
          />
          {imageError && <p className="text-red-500">{imageError}</p>}
          {imageUploading ? (
            <Skeleton height={128} width={128} className="mt-2 rounded" />
          ) : (
            imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="w-32 h-32 mt-2 object-cover rounded"
              />
            )
          )}
        </div>

        {/* Pet Name */}
        <div>
          <input
            {...register("name", { required: "Pet name is required" })}
            placeholder="Pet Name"
            className="input-field w-full px-4 py-2 rounded border dark:bg-gray-800 dark:text-white"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* Pet Age */}
        <div>
          <input
            {...register("age", { required: "Pet age is required" })}
            placeholder="Pet Age"
            className="input-field w-full px-4 py-2 rounded border dark:bg-gray-800 dark:text-white"
          />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>

        {/* Pet Category */}
        <div>
          <label className="block font-medium mb-1">Pet Category</label>
          <Controller
            name="category"
            control={control}
            rules={{ required: "Please select a category" }}
            render={({ field }) => (
              <Select
                {...field}
                options={categoryOptions}
                className="text-black"
              />
            )}
          />
          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}
        </div>

        {/* Pickup Location */}
        <div>
          <input
            {...register("location", { required: "Location is required" })}
            placeholder="Pickup Location"
            className="input-field w-full px-4 py-2 rounded border dark:bg-gray-800 dark:text-white"
          />
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
        </div>

        {/* Short Description */}
        <div>
          <input
            {...register("shortDescription", { required: "Short description is required" })}
            placeholder="Short Description"
            className="input-field w-full px-4 py-2 rounded border dark:bg-gray-800 dark:text-white"
          />
          {errors.shortDescription && (
            <p className="text-red-500">{errors.shortDescription.message}</p>
          )}
        </div>

        {/* Long Description */}
        <div>
          <textarea
            {...register("longDescription", { required: "Long description is required" })}
            placeholder="Long Description"
            rows={5}
            className="w-full px-4 py-2 rounded border dark:bg-gray-800 dark:text-white"
          />
          {errors.longDescription && (
            <p className="text-red-500">{errors.longDescription.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={isSubmitting || isPending}
          className="bg-primary dark:bg-indigo-600 text-white px-6 py-2 rounded hover:bg-primary/90 dark:hover:bg-indigo-700"
        >
          {isPending ? "Submitting..." : "Add Pet"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddPet;
