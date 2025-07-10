import React from "react";
import { motion } from "framer-motion";
import { FaCat, FaDog, FaFish, FaPaw, FaHorse, FaCrow } from "react-icons/fa";

const categories = [
  { name: "Cats", icon: <FaCat /> },
  { name: "Dogs", icon: <FaDog /> },
  { name: "Rabbits", icon: <FaPaw /> },
  { name: "Fish", icon: <FaFish /> },
  { name: "Horses", icon: <FaHorse /> },
  { name: "Birds", icon: <FaCrow /> },
];

const PetsCategory = () => {
  return (
    <section className="py-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
         Categories
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-2xl p-5 flex flex-col items-center shadow-md hover:shadow-lg transition"
          >
            <div className="text-4xl mb-3">{cat.icon}</div>
            <p className="text-lg font-semibold">{cat.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PetsCategory;
