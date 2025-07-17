import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

const MyAddedPets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: pets = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pets", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get("/pets", {
        params: { email: user.email },
      });
      return res.data;
    },
    enabled: !!user?.email,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/pets/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets", user.email] });
      Swal.fire("Deleted!", "Pet has been deleted.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete pet.", "error");
    },
  });

  const adoptMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/pets/adopt/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets", user.email] });
      Swal.fire("Success!", "Pet marked as adopted.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to mark adopted.", "error");
    },
  });

  const handleDelete = (id, petName) => {
    Swal.fire({
      title: `Delete pet "${petName}"?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleAdopt = (id, adopted) => {
    if (adopted) {
      Swal.fire("Info", "Pet is already adopted.", "info");
      return;
    }
    adoptMutation.mutate(id);
  };

  const columns = useMemo(
    () => [
      {
        header: "S/N",
        accessorKey: "serial",
        cell: (info) => info.row.index + 1,
      },
      {
        header: "Pet Name",
        accessorKey: "name",
        cell: (info) => info.getValue() || <Skeleton width={80} />,
      },
      {
        header: "Category",
        accessorKey: "category",
        cell: (info) => info.getValue() || <Skeleton width={60} />,
      },
      {
        header: "Image",
        accessorKey: "image",
        cell: (info) => {
          const url = info.getValue();
          return url ? (
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={url}
              alt={info.row.original.name}
              className="w-20 h-20 object-cover rounded"
            />
          ) : (
            <Skeleton width={80} height={80} />
          );
        },
        enableSorting: false,
      },
      {
        header: "Adoption Status",
        accessorKey: "adopted",
        cell: (info) =>
          info.getValue() ? (
            <span className="text-green-500 inter font-semibold">Adopted</span>
          ) : (
            <span className="text-yellow-500 inter font-medium">Not Adopted</span>
          ),
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: (info) => {
          const pet = info.row.original;
          return (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex gap-2 justify-center"
            >
              <button
                onClick={() => navigate(`/dashboard/update-pet/${pet._id}`)}
                className="text-yellow-400 lato flex items-center gap-1"
                title="Update"
              >
                <FaEdit /> Update
              </button>
              <button
                onClick={() => handleDelete(pet._id, pet.name)}
                className="text-red-500 lato flex items-center gap-1"
                title="Delete"
              >
                <FaTrash /> Delete
              </button>
              <button
                onClick={() => handleAdopt(pet._id, pet.adopted)}
                className="text-green-500 lato flex items-center gap-1"
                disabled={pet.adopted}
                title="Mark as Adopted"
              >
                <FaCheck /> Adopted
              </button>
            </motion.div>
          );
        },
        enableSorting: false,
      },
    ],
    [navigate]
  );

  const table = useReactTable({
    data: pets,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10, pageIndex: 0 } },
  });

  return (
    <div className="max-w-7xl mx-auto p-4 min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl fredoka font-bold">My Added Pets</h2>
      </div>

      {isLoading ? (
        <Skeleton height={40} count={5} className="mb-2" />
      ) : isError ? (
        <div className="text-red-600 dark:text-red-400 lato text-center p-4">
          Error: {error.message}
        </div>
      ) : (
        <>
          <table className="min-w-full border border-gray-300 rounded overflow-hidden dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 cursor-pointer text-center"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center justify-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() === "asc"
                          ? " 🔼"
                          : header.column.getIsSorted() === "desc"
                          ? " 🔽"
                          : ""}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-4 fredoka dark:text-gray-400"
                  >
                    No pets added yet.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="border-b border-gray-200 lato dark:border-gray-700 px-4 py-3 text-center"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>

          {pets.length > 10 && (
            <div className="flex justify-between items-center mt-4 text-gray-700 dark:text-gray-300">
              <div>
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>
              <div className="flex gap-2">
                <button
                  className="btn inter hover:bg-green-400 lato bg-green-600 rounded p-1 btn-sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Prev
                </button>
                <button
                  className="btn inter hover:bg-green-400 lato bg-green-600 rounded p-1 btn-sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyAddedPets;
