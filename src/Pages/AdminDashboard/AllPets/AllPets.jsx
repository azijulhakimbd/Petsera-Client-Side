import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthContext";
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";

const AllPets = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: pets = [], isLoading } = useQuery({
    queryKey: ["allPets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pets");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/pets/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allPets"]);
      Swal.fire("Deleted!", "Pet has been deleted.", "success");
    },
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/pets/${id}/status`, {
        adopted: status,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allPets"]);
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const toggleStatus = (id, currentStatus) => {
    statusMutation.mutate({ id, status: !currentStatus });
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6">All Pets (Admin)</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white">
              <th>Image</th>
              <th>Name</th>
              <th>Owner Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b">
                    <td><Skeleton circle width={64} height={64} /></td>
                    <td><Skeleton width={100} /></td>
                    <td><Skeleton width={150} /></td>
                    <td><Skeleton width={100} /></td>
                    <td><Skeleton width={80} /></td>
                  </tr>
                ))
              : pets.map((pet) => (
                  <motion.tr
                    key={pet._id}
                    className="border-b hover:bg-gray-100 dark:hover:bg-gray-900"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td>
                      <img
                        src={pet.image}
                        alt={pet.name}
                        className="w-16 h-16 rounded"
                      />
                    </td>
                    <td>{pet.name}</td>
                    <td>{pet.ownerEmail}</td>
                    <td>
                      <button
                        onClick={() => toggleStatus(pet._id, pet.adopted)}
                        className={`flex items-center gap-1 ${
                          pet.adopted ? "text-green-600" : "text-yellow-500"
                        }`}
                      >
                        {pet.adopted ? <FaToggleOn /> : <FaToggleOff />}
                        {pet.adopted ? "Adopted" : "Not Adopted"}
                      </button>
                    </td>
                    <td className="space-x-2">
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() =>
                          navigate(`/dashboard/update-pet/${pet._id}`)
                        }
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleDelete(pet._id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </motion.tr>
                ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AllPets;
