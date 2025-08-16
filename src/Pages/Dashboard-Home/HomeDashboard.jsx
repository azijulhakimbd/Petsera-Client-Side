import React from "react";
import { FaUsers, FaPaw, FaHandHoldingHeart, FaDollarSign } from "react-icons/fa";
import { motion } from "framer-motion";

const stats = [
  {
    title: "Total Users",
    value: "1,250",
    icon: <FaUsers className="h-10 w-10 text-blue-500 dark:text-blue-400" />,
    color: "bg-blue-100 dark:bg-blue-900",
  },
  {
    title: "Total Pets",
    value: "320",
    icon: <FaPaw className="h-10 w-10 text-green-500 dark:text-green-400" />,
    color: "bg-green-100 dark:bg-green-900",
  },
  {
    title: "Active Campaigns",
    value: "15",
    icon: <FaHandHoldingHeart className="h-10 w-10 text-pink-500 dark:text-pink-400" />,
    color: "bg-pink-100 dark:bg-pink-900",
  },
  {
    title: "Donations",
    value: "$12,450",
    icon: <FaDollarSign className="h-10 w-10 text-yellow-500 dark:text-yellow-400" />,
    color: "bg-yellow-100 dark:bg-yellow-900",
  },
];

const HomeDashboard = () => {
  return (
    <motion.div
      className="p-8 max-w-6xl mx-auto font-sans"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        📊 Dashboard Overview
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="rounded-2xl shadow-md hover:shadow-lg transition p-6 flex items-center justify-between 
                       bg-white dark:bg-gray-800"
          >
            <div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-xl ${stat.color} flex items-center justify-center`}>
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HomeDashboard;
