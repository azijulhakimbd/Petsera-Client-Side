import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AuthContext } from "../../../Context/AuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const categories = ["Cat", "Dog", "Rabbit", "Fish", "Bird", "Others"];

const UpdateMyPet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      age: "",
      category: "",
      location: "",
      shortDescription: "",
      longDescription: "",
    },
  });

  useEffect(() => {
    axiosSecure
      .get(`/pets/${id}`)
      .then((res) => {
        const data = res.data;
        reset({
          name: data.name,
          age: data.age,
          category: data.category,
          location: data.location,
          shortDescription: data.shortDescription,
          longDescription: data.longDescription,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching pet data", err);
        setLoading(false);
      });
  }, [id, axiosSecure, reset]);

  const onSubmit = async (data) => {
    try {
      await axiosSecure.put(`/pets/${id}`, {
        ...data,
        addedBy: user?.email || "unknown",
        updatedAt: new Date().toISOString(),
      });

      Swal.fire({
        icon: "success",
        title: "Pet Updated!",
        text: `${data.name} has been successfully updated.`,
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/dashboard/my-pets");
    } catch (error) {
      console.error("Update failed:", error);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong while updating the pet.",
      });
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold fredoka text-center mb-6 dark:text-white">
        Update Pet Information
      </h2>

      {loading ? (
        <div className="space-y-4">
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={80} />
          <Skeleton height={50} />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block lato mb-1 font-medium dark:text-white">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered border rounded-2xl p-2 w-full dark:bg-gray-800 dark:text-white"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Age */}
          <div>
            <label className="block lato mb-1 font-medium dark:text-white">Age</label>
            <input
              type="number"
              {...register("age", { required: "Age is required", min: 0 })}
              className="input input-bordered border rounded-2xl p-2 w-full dark:bg-gray-800 dark:text-white"
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block lato mb-1 font-medium dark:text-white">Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="select select-bordered border rounded-2xl p-2 w-full dark:bg-gray-800 dark:text-white"
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
            <label className="block lato mb-1 font-medium dark:text-white">Location</label>
            <input
              type="text"
              {...register("location", { required: "Location is required" })}
              className="input input-bordered w-full border rounded-2xl p-2 dark:bg-gray-800 dark:text-white"
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
          </div>

          {/* Short Description */}
          <div>
            <label className="block lato mb-1 font-medium dark:text-white">Short Description</label>
            <input
              type="text"
              {...register("shortDescription", {
                required: "Short description is required",
              })}
              className="input input-bordered w-full border rounded-2xl p-2 dark:bg-gray-800 dark:text-white"
            />
            {errors.shortDescription && (
              <p className="text-red-500 text-sm">{errors.shortDescription.message}</p>
            )}
          </div>

          {/* Long Description */}
          <div>
            <label className="block mb-1 lato font-medium dark:text-white">Long Description</label>
            <textarea
              rows="4"
              {...register("longDescription", {
                required: "Long description is required",
              })}
              className="textarea textarea-bordered w-full border rounded-2xl p-2 dark:bg-gray-800 dark:text-white"
            />
            {errors.longDescription && (
              <p className="text-red-500 text-sm">{errors.longDescription.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn hover:bg-green-500 fredoka bg-amber-300 w-full p-3 rounded-2xl text-blue-600"
          >
            {isSubmitting ? "Updating..." : "Update Pet"}
          </button>
        </form>
      )}
    </section>
  );
};

export default UpdateMyPet;
