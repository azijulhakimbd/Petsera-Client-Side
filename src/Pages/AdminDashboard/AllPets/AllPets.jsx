import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllPets = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: pets = [], isLoading, error } = useQuery({
    queryKey: ["allPets"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pets/all`);
      return res.data;
    },
  });

  const deletePetMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/pets/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["allPets"]);
      Swal.fire("Deleted!", "Pet has been deleted.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete pet.", "error");
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, adopted }) =>
      axiosSecure.patch(`/pets/${id}/status`, { adopted }),
    onSuccess: () => {
      queryClient.invalidateQueries(["allPets"]);
      Swal.fire("Updated!", "Pet status updated.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to update status.", "error");
    },
  });

  const updatePetMutation = useMutation({
    mutationFn: ({ id, updateData }) =>
      axiosSecure.patch(`/pets/${id}`, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries(["allPets"]);
      Swal.fire("Updated!", "Pet details updated.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to update pet.", "error");
    },
  });

  const [editingPet, setEditingPet] = useState(null);
  const [editedName, setEditedName] = useState("");

  const startEditing = (pet) => {
    setEditingPet(pet);
    setEditedName(pet.name);
  };

  const cancelEditing = () => {
    setEditingPet(null);
    setEditedName("");
  };

  const saveEditing = () => {
    updatePetMutation.mutate({
      id: editingPet._id,
      updateData: { name: editedName },
    });
    cancelEditing();
  };

  if (isLoading) {
    return (
      <div className="p-4 max-w-7xl mx-auto space-y-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} height={40} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 dark:text-red-400">
        Error loading pets.
      </p>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center fredoka dark:text-white">
        All Pets (Admin)
      </h2>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full border border-gray-300 dark:border-gray-600">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              <th className="p-2 inter border">Name</th>
              <th className="p-2 inter border">Type</th>
              <th className="p-2 inter border">Age</th>
              <th className="p-2 inter border">Status</th>
              <th className="p-2 inter border">Added By</th>
              <th className="p-2 inter border">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {pets.map((pet) => (
                <motion.tr
                  key={pet._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="border p-2">
                    {editingPet?._id === pet._id ? (
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="border lato px-2 py-1 rounded w-full dark:bg-gray-900 dark:text-white"
                      />
                    ) : (
                      <span className="dark:text-white">{pet.name}</span>
                    )}
                  </td>
                  <td className="border lato p-2 dark:text-white">{pet.type}</td>
                  <td className="border lato p-2 dark:text-white">{pet.age}</td>
                  <td className="border lato p-2">
                    {pet.adopted ? (
                      <span className="text-green-600 lato font-semibold">Adopted</span>
                    ) : (
                      <span className="text-red-600 lato font-semibold">Available</span>
                    )}
                  </td>
                  <td className="border p-2 lato dark:text-white">
                    {pet.addedBy}
                  </td>
                  <td className="border p-2 flex gap-2 justify-center">
                    {editingPet?._id === pet._id ? (
                      <>
                        <button
                          onClick={saveEditing}
                          className="text-green-600 lato hover:text-green-800"
                          title="Save"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="text-red-600 lato hover:text-red-800"
                          title="Cancel"
                        >
                          <FaTimes />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(pet)}
                          className="text-blue-600 lato hover:text-blue-800"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() =>
                            Swal.fire({
                              title: "Are you sure?",
                              text: "This will delete the pet permanently!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                deletePetMutation.mutate(pet._id);
                              }
                            })
                          }
                          className="text-red-600 lato hover:text-red-800"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                        <button
                          onClick={() =>
                            updateStatusMutation.mutate({
                              id: pet._id,
                              adopted: !pet.adopted,
                            })
                          }
                          className={`${
                            pet.adopted
                              ? "text-yellow-600 lato"
                              : "text-green-600 lato"
                          } hover:text-yellow-800 lato`}
                          title={pet.adopted ? "Mark as Not Adopted" : "Mark as Adopted"}
                        >
                          {pet.adopted ? <FaTimes /> : <FaCheck />}
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

export default AllPets;
