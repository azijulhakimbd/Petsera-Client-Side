import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { BsWhatsapp, BsMessenger } from "react-icons/bs";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const mockPets = [
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
    breed: "India",
    gender: "Male",
    age: "5 Months Old",
    location: "Bangalore",
    uploader: "Swalin",
    image: "https://i.postimg.cc/HntQFfy5/pexels-pixabay-164186.jpg",
  },
  {
    name: "Shadow",
    breed: "India",
    gender: "Male",
    age: "5 Months Old",
    location: "Bangalore",
    uploader: "Molina",
    image: "https://i.postimg.cc/x8Qvx0cn/pexels-charlesdeluvio-1851164.jpg",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

const FeaturedPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPets(mockPets);
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <motion.section
      className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl fredoka font-bold text-pink-600">
          Looking to Adopt a Pet?
        </h2>
        <p className="text-gray-700 inter dark:text-gray-300 mt-2 text-sm sm:text-base md:text-lg">
          Explore pets up for adoption and bring your new companion home!
        </p>
      </div>

      {/* Pet Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
        {(loading ? Array(4).fill({}) : pets).map((pet, idx) => (
          <motion.div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md transition hover:shadow-lg overflow-hidden flex flex-col"
            custom={idx}
            variants={cardVariants}
          >
            {loading ? (
              <Skeleton height={220} className="rounded-t-2xl" />
            ) : (
              <img
                src={pet.image}
                alt={pet.name}
                className="h-48 sm:h-56 md:h-60 w-full object-cover rounded-t-2xl"
              />
            )}
            <div className="p-4 flex-1 flex flex-col justify-between text-gray-800 dark:text-gray-100 space-y-2">
              <div>
                <h3 className="text-lg sm:text-xl Poppins font-semibold">
                  {loading ? <Skeleton width={100} /> : pet.name}
                </h3>
                <p className="text-sm sm:text-base inter text-gray-500 dark:text-gray-400">
                  {loading ? <Skeleton width={60} /> : pet.breed}
                </p>

                <div className="flex flex-wrap gap-2 mt-2 text-xs sm:text-sm">
                  {loading ? (
                    <>
                      <Skeleton width={50} height={20} borderRadius={999} />
                      <Skeleton width={70} height={20} borderRadius={999} />
                    </>
                  ) : (
                    <>
                      <span className="bg-gray-200 inter dark:bg-gray-700 rounded-full px-2 py-1">
                        {pet.gender}
                      </span>
                      <span className="bg-gray-200 inter dark:bg-gray-700 rounded-full px-2 py-1">
                        {pet.age}
                      </span>
                    </>
                  )}
                </div>

                <div className="text-sm flex items-center gap-1 text-gray-600 dark:text-gray-300 mt-2">
                  <FaMapMarkerAlt className="text-blue-500" />
                  {loading ? <Skeleton width={80} /> : pet.location}
                </div>
                <div className="text-sm flex items-center gap-1 text-gray-600 dark:text-gray-300">
                  <FaUser className="text-pink-500" />
                  {loading ? <Skeleton width={60} /> : pet.uploader}
                </div>
              </div>

              <div className="flex gap-4 mt-4 text-lg sm:text-xl">
                {loading ? (
                  <>
                    <Skeleton circle width={24} height={24} />
                    <Skeleton circle width={24} height={24} />
                  </>
                ) : (
                  <>
                    <a
                      href="wa.me/8801758524125"
                      className="text-green-600 hover:text-green-700"
                    >
                      <BsWhatsapp />
                    </a>
                    <a
                      href="m.me/azijulhakimbd"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <BsMessenger />
                    </a>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Explore Now Button */}
      {!loading && (
        <div className="text-center mt-10">
          <motion.a
            href="/pets"
            className="inline-block text-sm sm:text-base md:text-lg bg-white dark:bg-gray-700 dark:text-white text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-600 font-medium px-6 py-3 rounded-full shadow-md transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Now!
          </motion.a>
        </div>
      )}
    </motion.section>
  );
};

export default FeaturedPets;
