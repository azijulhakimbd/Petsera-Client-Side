import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPaw } from "react-icons/fa";

const NotFound = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-yellow-100 text-gray-800 text-center px-6"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <FaPaw className="text-6xl text-pink-500 mb-4 animate-bounce" />
      <h1 className="text-6xl font-bold mb-4 fredoka">404</h1>
      <p className="inter text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="bg-pink-500 hover:bg-pink-600 text-white fredoka font-semibold py-2 px-4 rounded-full transition duration-300"
      >
        Go Home
      </Link>
    </motion.div>
  );
};

export default NotFound;
