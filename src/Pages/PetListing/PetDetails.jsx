import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Context/AuthContext";

const PetDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [pet, setPet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    axiosSecure.get(`/pets/${id}`)
      .then((res) => setPet(res.data))
      .catch((err) => console.error(err));
  }, [id, axiosSecure]);

  const handleAdopt = async (e) => {
    e.preventDefault();

    const adoptionData = {
      petId: pet._id,
      petName: pet.name,
      petImage: pet.image,
      userName: user?.displayName,
      email: user?.email,
      phone,
      address,
      requestDate: new Date(),
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/adoptions", adoptionData);

      if (res.status === 201) {
        Swal.fire("Success", "Adoption request submitted!", "success");
        setShowModal(false);
        setPhone("");
        setAddress("");
      } else {
        Swal.fire("Error", "Something went wrong", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to send request", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-25">
      {pet ? (
        <motion.div
          className="bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={pet.image} alt={pet.name} className="w-full h-80 object-cover" />
          <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              {pet.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{pet.longDescription}</p>
            <p className="text-gray-600 dark:text-gray-300">Age: {pet.age} Years</p>
            <p className="text-gray-600 dark:text-gray-300">Category: {pet.category}</p>
            <p className="text-gray-600 dark:text-gray-300">Location: {pet.location}</p>
            <p className="mt-4 text-gray-700 dark:text-gray-200">{pet.description}</p>

            <button
              onClick={() => setShowModal(true)}
              className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Adopt
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-4">
          <Skeleton height={320} />
          <Skeleton height={40} width={300} />
          <Skeleton count={4} />
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-start pt-20 z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-md relative"
            >
              <button
                className="absolute top-2 right-3 text-2xl"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
              <h3 className="text-xl font-bold mb-4">Adopt: {pet?.name}</h3>
              <form onSubmit={handleAdopt} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    value={user?.displayName}
                    disabled
                    className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Address
                  </label>
                  <textarea
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
                >
                  Submit Adoption Request
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PetDetails;
