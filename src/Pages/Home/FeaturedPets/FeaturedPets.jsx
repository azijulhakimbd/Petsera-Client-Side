import React from "react";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { BsWhatsapp, BsMessenger } from "react-icons/bs";

const pets = [
  {
    name: "Bagira",
    breed: "Labrador",
    gender: "Male",
    age: "5 Months Old",
    location: "Bangalore",
    uploader: "Ashwini",
    image: "https://i.postimg.cc/J73cyB2n/pexels-tdcat-59523.jpg",
  },
  {
    name: "Kitty",
    breed: "Indian",
    gender: "Male",
    age: "5 Months Old",
    location: "Bangalore",
    uploader: "Ramesh",
    image: "https://i.postimg.cc/8PtR4gDg/pexels-hnoody93-58997.jpg",
  },
  {
    name: "Hancock",
    breed: "Indie",
    gender: "Male",
    age: "5 Months Old",
    location: "Bangalore",
    uploader: "Swalin",
    image: "https://i.postimg.cc/HntQFfy5/pexels-pixabay-164186.jpg",
  },
  {
    name: "Shadow",
    breed: "Indie",
    gender: "Male",
    age: "5 Months Old",
    location: "Bangalore",
    uploader: "Molina",
    image: "https://i.postimg.cc/x8Qvx0cn/pexels-charlesdeluvio-1851164.jpg",
  },
];

const FeaturedPets = () => {
  return (
    <section className="py-16 px-4 mx-auto bg-gradient-to-b  bg-[url('https://i.postimg.cc/P5QMBv19/paw-print-background-pattern-78370-3263-removebg-preview.png')] bg-cover">
      <div className="max-w-7xl rounded-2xl mx-auto dark:bg-gray-600/40 bg-gray-50 text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 dark:text-white">
          Looking to Adopt a Pet?
        </h2>
        <p className="text-blue-800 dark:text-gray-300 mt-2">
          Explore pets up for adoption and bring your new companion home!
        </p>
      </div>

      {/* Pet Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-90 overflow-x-auto sm:overflow-visible pb-6">
        {pets.map((pet, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition hover:shadow-xl"
          >
            <img
              src={pet.image}
              alt={pet.name}
              className="h-60 w-full object-cover rounded-t-2xl"
            />
            <div className="p-4 text-gray-800 dark:text-gray-100">
              <h3 className="text-lg font-semibold">{pet.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{pet.breed}</p>

              <div className="flex flex-wrap gap-2 my-2 text-sm">
                <span className="bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-1">{pet.gender}</span>
                <span className="bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-1">{pet.age}</span>
              </div>

              <div className="text-sm flex items-center gap-1 text-gray-600 dark:text-gray-300">
                <FaMapMarkerAlt className="text-blue-500" />
                {pet.location}
              </div>
              <div className="text-sm flex items-center gap-1 mt-1 text-gray-600 dark:text-gray-300">
                <FaUser className="text-pink-500" />
                {pet.uploader}
              </div>

              <div className="flex gap-4 mt-3 text-xl">
                <a href="#" className="text-green-600 hover:text-green-700">
                  <BsWhatsapp />
                </a>
                <a href="#" className="text-blue-600 hover:text-blue-700">
                  <BsMessenger />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Explore Now Button */}
      <div className="text-center mt-10">
        <a
          href="/adopt"
          className="inline-block bg-white dark:bg-gray-700 dark:text-white text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-600 font-medium px-6 py-3 rounded-full shadow-md transition"
        >
          Explore Now!
        </a>
      </div>
    </section>
  );
};

export default FeaturedPets;
