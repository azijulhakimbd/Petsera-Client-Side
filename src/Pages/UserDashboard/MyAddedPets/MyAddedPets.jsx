import React, { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import Modal from "react-modal";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContext";

Modal.setAppElement("#root");

const MyAddedPets = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sorting, setSorting] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState(null);

  const {
    data: pets = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myPets", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/api/pets?email=${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/pets/${selectedPetId}`);
      refetch();
      closeModal();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleAdopt = async (id) => {
    try {
      await axios.patch(`/api/pets/adopt/${id}`, { adopted: true });
      refetch();
    } catch (error) {
      console.error("Adoption update failed", error);
    }
  };

  const openModal = (id) => {
    setSelectedPetId(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPetId(null);
  };

  const columns = useMemo(
    () => [
      {
        header: "SL",
        accessorFn: (_, i) => i + 1,
        cell: (info) => info.getValue(),
      },
      {
        header: "Pet Name",
        accessorKey: "name",
      },
      {
        header: "Category",
        accessorKey: "category",
      },
      {
        header: "Image",
        accessorKey: "image",
        cell: ({ row }) => (
          <img
            src={row.original.image}
            alt="pet"
            className="w-16 h-16 rounded object-cover"
          />
        ),
      },
      {
        header: "Adoption Status",
        accessorKey: "adopted",
        cell: ({ getValue }) =>
          getValue() ? (
            <span className="text-green-600 font-semibold">Adopted</span>
          ) : (
            <span className="text-red-600 font-semibold">Not Adopted</span>
          ),
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/dashboard/update-pet/${row.original._id}`)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => openModal(row.original._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
            >
              <FaTrash />
            </button>
            <button
              disabled={row.original.adopted}
              onClick={() => handleAdopt(row.original._id)}
              className={`${
                row.original.adopted
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              } text-white px-2 py-1 rounded`}
            >
              <FaCheck />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: pets,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Added Pets</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border">
              <thead className="bg-gray-100">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="p-2 text-left cursor-pointer"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted()] ?? null}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-t">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-2">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {table.getPageCount() > 1 && (
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </span>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Delete Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        className="bg-white max-w-md mx-auto p-6 mt-40 rounded shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40"
      >
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-6">Are you sure you want to delete this pet?</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            No
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Yes, Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MyAddedPets;
