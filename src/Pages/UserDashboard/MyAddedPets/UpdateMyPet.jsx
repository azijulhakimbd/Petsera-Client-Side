import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const categories = ["Cat", "Dog", "Rabbit", "Fish", "Bird", "Others"];

const UpdateMyPet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);
  const [petImageUrl, setPetImageUrl] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      age: "",
      category: "",
      location: "",
      description: "",
    },
  });

  // Watch image input to preview new image
  const watchImage = watch("image");

  useEffect(() => {
    axiosSecure
      .get(`/pets/${id}`)
      .then((res) => {
        const data = res.data;
        setPetImageUrl(data.image);
        reset({
          name: data.name,
          age: data.age,
          category: data.category,
          location: data.location,
          description: data.description,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching pet data", err);
        setLoading(false);
      });
  }, [id, axiosSecure, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("age", data.age);
    formData.append("category", data.category);
    formData.append("location", data.location);
    formData.append("description", data.description);

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    try {
      await axiosSecure.put(`/pets/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        icon: "success",
        title: "Pet Updated!",
        text: `${data.name} has been successfully updated.`,
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/dashboard/my-added-pets");
    } catch (error) {
      console.error("Update failed:", error);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong while updating the pet.",
      });
    }
  };

  if (loading) return <p className="text-center py-10">Loading pet data...</p>;

  return (
    <section className="max-w-3xl mx-auto p-4 py-10">
      <h2 className="text-2xl font-semibold text-center mb-6 dark:text-white">
        Update Pet Information
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium dark:text-white">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="input input-bordered w-full dark:bg-gray-800 dark:text-white"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Age */}
        <div>
          <label className="block mb-1 font-medium dark:text-white">Age</label>
          <input
            type="number"
            {...register("age", { required: "Age is required", min: 0 })}
            className="input input-bordered w-full dark:bg-gray-800 dark:text-white"
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium dark:text-white">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="select select-bordered w-full dark:bg-gray-800 dark:text-white"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium dark:text-white">Location</label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className="input input-bordered w-full dark:bg-gray-800 dark:text-white"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium dark:text-white">Description</label>
          <textarea
            rows="4"
            {...register("description", { required: "Description is required" })}
            className="textarea textarea-bordered w-full dark:bg-gray-800 dark:text-white"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium dark:text-white">New Image (Optional)</label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            className="file-input file-input-bordered w-full dark:bg-gray-800 dark:text-white"
          />

          {/* Show current image */}
          {petImageUrl && (
            <div className="mt-3">
              <p className="text-sm dark:text-white mb-1">Current Image:</p>
              <img src={petImageUrl} alt="Current Pet" className="h-32 rounded shadow" />
            </div>
          )}

          {/* Preview new image */}
          {watchImage?.[0] && (
            <div className="mt-3">
              <p className="text-sm dark:text-white mb-1">New Image Preview:</p>
              <img
                src={URL.createObjectURL(watchImage[0])}
                alt="Preview"
                className="h-32 rounded shadow"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full"
        >
          {isSubmitting ? "Updating..." : "Update Pet"}
        </button>
      </form>
    </section>
  );
};

export default UpdateMyPet;
