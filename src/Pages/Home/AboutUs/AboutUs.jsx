import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AboutUs = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 px-6 bg-base-100 dark:bg-gray-750">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {loading ? (
            <>
              <Skeleton height={40} width="60%" className="mb-4" />
              <Skeleton count={2} className="mb-4" />
              <Skeleton width="90%" height={20} />
            </>
          ) : (
            <>
              <h2 className="text-4xl fredoka font-bold text-gray-800 dark:text-white mb-4">
                About Petsera
              </h2>
              <p className="text-gray-700 dark:text-gray-300 inter text-lg mb-4">
                Petsera is a platform built with love to connect abandoned and
                rescued pets with kind humans who can give them a forever home.
                Whether you're looking to adopt, donate, or volunteer — we've
                made it simple, secure, and heartfelt.
              </p>
              <p className="text-gray-700 inter dark:text-gray-300 text-lg">
                We created Petsera because every animal deserves a chance at
                love and safety. With real-time pet listings, verified adoption
                processes, and community-driven support, we’re making the world
                better — one paw at a time.
              </p>
            </>
          )}
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {loading ? (
            <Skeleton height={350} className="rounded-3xl" />
          ) : (
            <img
              src="https://i.postimg.cc/yNwXRhKJ/pexels-pixabay-45170.jpg"
              alt="About Petsera"
              className="rounded-3xl shadow-lg w-full"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
