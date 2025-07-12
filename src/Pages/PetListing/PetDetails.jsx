import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

const PetDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [pet, setPet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/pets/${id}`)
      .then((res) => res.json())
      .then((data) => setPet(data));
  }, [id]);

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

    const res = await fetch("http://localhost:3000/adoptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adoptionData),
    });

    if (res.ok) {
      Swal.fire("Success", "Adoption request submitted!", "success");
      setShowModal(false);
      setPhone("");
      setAddress("");
    } else {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  if (!pet) return <p className="text-center mt-10">Loading pet...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-25">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden">
        <img src={pet.image} alt={pet.name} className="w-full h-80 object-cover" />
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {pet.name}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300"> {pet.longDescription}Years</p>
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
      </div>

      {/* Adoption Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-background/10 backdrop-blur-md shadow-sm flex justify-center items-start pt-20 z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-3 text-2xl"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4">
              Adopt: {pet.name}
            </h3>
            <form onSubmit={handleAdopt} className="space-y-4">
              {/* User Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  value={user?.displayName || ""}
                  disabled
                  className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white"
                />
              </div>

              {/* Email */}
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

              {/* Phone */}
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

              {/* Address */}
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

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
              >
                Submit Adoption Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetDetails;
