import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AdoptCallToAction = () => {
  return (
    <section className="py-16 px-6 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Text Content */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left flex-1"
        >
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Give Them a Home. Give Them a Life.
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
            Every pet deserves love, care, and a family. Adopt today and change a life forever.
            Be the hero they’ve been waiting for.
          </p>
          <Link to="/adopt">
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl shadow-lg transition">
              🐾 Adopt a Pet Now
            </button>
          </Link>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <img
            src="https://i.postimg.cc/t4ch0dYr/pexels-pixabay-57416.jpg"
            alt="Adopt a pet"
            className="rounded-3xl shadow-xl w-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AdoptCallToAction;
