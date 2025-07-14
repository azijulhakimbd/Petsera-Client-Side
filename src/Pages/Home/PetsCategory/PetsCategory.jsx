import React, { useContext } from "react";
import { motion } from "framer-motion";
import {
  FaCat,
  FaDog,
  FaFish,
  FaPaw,
  FaHorse,
  FaCrow,
} from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const categories = [
  { name: "Cats", icon: <FaCat /> },
  { name: "Dogs", icon: <FaDog /> },
  { name: "Rabbits", icon: <FaPaw /> },
  { name: "Fish", icon: <FaFish /> },
  { name: "Horses", icon: <FaHorse /> },
  { name: "Birds", icon: <FaCrow /> },
];

const PetsCategory = () => {
  const { loading } = useContext(AuthContext);

  return (
    <section className="py-10 px-4 max-w-6xl mx-auto">
      {/* Section Title */}
      <h2 className="text-3xl pb-1 fredoka text-center mx-auto font-bold mb-8">
        <span className="inline-block border-b-2 border-pink-500 pb-1">
          {loading ? <Skeleton width={150} height={30} /> : "Categories"}
        </span>
      </h2>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-5 flex flex-col items-center shadow-md"
                >
                  <Skeleton
                    circle
                    height={50}
                    width={50}
                    className="mb-3"
                  />
                  <Skeleton width={80} height={20} />
                </div>
              ))
          : categories.map((cat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer bg-white dark:bg-gray-800 text-pink-500 border-b-2 border-yellow-500 rounded-2xl p-5 flex flex-col items-center shadow-md hover:shadow-lg transition"
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <p className="text-lg inter font-semibold">{cat.name}</p>
              </motion.div>
            ))}
      </div>
    </section>
  );
};

export default PetsCategory;
