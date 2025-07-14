import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import { AuthContext } from "../../../Context/AuthContext";

const steps = [
  {
    id: 1,
    title: "Search Pet",
    description:
      "Find your furry companion by searching on our app. Use filters to narrow down your search and find a match for your lifestyle.",
    iconPath:
      "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    bg: "bg-pink-500 text-white",
  },
  {
    id: 2,
    title: "Connect with Pet Parent",
    description:
      "Learn more about the pet's personality, history, and specific care needs by connecting with their current parent.",
    iconPath:
      "M8 10h.01M12 10h.01M16 10h.01M9 16h6m2 0a2 2 0 002-2v-4a6 6 0 10-12 0v4a2 2 0 002 2z",
    bg: "bg-yellow-400 text-gray-900",
  },
  {
    id: 3,
    title: "Adopt Love",
    description:
      "When it’s the right fit, start your journey with your new pet. Filled with love, companionship, and unforgettable moments.",
    iconPath:
      "M4.318 6.318a4.5 4.5 0 010 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    bg: "bg-green-400 text-gray-900",
  },
];

const HowItsWork = () => {
  const { loading } = useContext(AuthContext);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Title */}
      <h2 className="text-3xl fredoka font-semibold text-center mb-16 text-gray-800 dark:text-white">
        <span className="inline-block border-b-2 border-pink-500 pb-1">
          {loading ? <Skeleton width={200} /> : "HOW IT WORKS?"}
        </span>
      </h2>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-14">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="flex items-start gap-6"
          >
            {/* Icon */}
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${step.bg}`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={step.iconPath}
                />
              </svg>
            </div>

            {/* Text Content */}
            <div>
              <h3 className="text-lg font-semibold Poppins text-gray-800  dark:text-white">
                {loading ? <Skeleton width={180} /> : step.title}
              </h3>
              <p className="text-gray-600 inter dark:text-gray-400 mt-2 text-sm">
                {loading ? <Skeleton count={2} /> : step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItsWork;
