import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AdoptCallToAction = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (e.g. API call)
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 px-6 bg-base-200 dark:bg-gray-750">
      <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Text Content */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left flex-1 space-y-4"
        >
          {loading ? (
            <>
              <Skeleton height={40} width="80%" />
              <Skeleton count={2} />
              <Skeleton width={160} height={44} borderRadius={12} />
            </>
          ) : (
            <>
              <h2 className="text-4xl fredoka font-bold text-gray-800 dark:text-white mb-4">
                Give Them a Home. <br /> Give Them a Life.
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg inter">
                Every pet deserves love, care, and a family. Adopt today and change a life forever.
                Be the hero they’ve been waiting for.
              </p>
              <Link to="/pets">
                <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 inter rounded-xl shadow-lg transition">
                  🐾 Adopt a Pet Now
                </button>
              </Link>
            </>
          )}
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex-1 w-full"
        >
          {loading ? (
            <Skeleton height={300} className="rounded-3xl" />
          ) : (
            <img
              src="https://i.postimg.cc/t4ch0dYr/pexels-pixabay-57416.jpg"
              alt="Adopt a pet"
              className="rounded-3xl shadow-xl w-full"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AdoptCallToAction;
