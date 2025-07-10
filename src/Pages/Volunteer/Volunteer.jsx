import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaHeart, FaUsers } from "react-icons/fa";

const Volunteer = () => {
  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-25 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold text-pink-600 dark:text-pink-400">
            Become a Volunteer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            At <span className="font-semibold text-pink-500 dark:text-pink-300">Petsera</span>, volunteers are the heartbeat of our mission. From playing with pets to promoting adoption—you make a difference.
          </p>
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <FaHeart className="text-3xl text-pink-600 dark:text-pink-400 mx-auto mb-3" />,
              title: "Make an Impact",
              desc: "Help us provide care and love to rescued animals awaiting adoption.",
            },
            {
              icon: <FaUsers className="text-3xl text-pink-600 dark:text-pink-400 mx-auto mb-3" />,
              title: "Join Our Community",
              desc: "Be part of a team filled with compassion and shared purpose.",
            },
            {
              icon: <FaMapMarkerAlt className="text-3xl text-pink-600 dark:text-pink-400 mx-auto mb-3" />,
              title: "Local & Remote Roles",
              desc: "Opportunities available at our shelters or from your home.",
            },
          ].map(({ icon, title, desc }, i) => (
            <div
              key={i}
              className="bg-pink-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition"
            >
              {icon}
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h2 className="text-2xl font-bold">Want to Volunteer?</h2>
          <p className="text-gray-600 dark:text-gray-300">Reach out to us—we’d love to hear from you!</p>

          <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-12 items-center space-y-3 sm:space-y-0 text-gray-700 dark:text-gray-300 text-md mt-4">
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-pink-500" />
              <span>volunteer@petsera.org</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-pink-500" />
              <span>+880 1234 567890</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-pink-500" />
              <span>Petsera HQ, Dhaka, Bangladesh</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Volunteer;
