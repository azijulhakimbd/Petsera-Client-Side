import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const DonationCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);

  const fetchCampaigns = async (pageNumber) => {
    try {
      const res = await axios.get(`/api/donations?page=${pageNumber}&limit=6`);
      console.log("API Response:", res.data); // Debugging line

      const campaignArray = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      if (!Array.isArray(campaignArray) || campaignArray.length === 0) {
        setHasMore(false);
        return;
      }

      const sorted = campaignArray.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setCampaigns((prev) => [...prev, ...sorted]);
    } catch (err) {
      console.error("Failed to fetch campaigns:", err);
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchCampaigns(page);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [hasMore]);

  return (
    <section className="max-w-7xl min-h-screen mx-auto px-6 py-25">
      <h2 className="text-3xl font-bold text-pink-600 mb-10">Donation Campaigns</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((item) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden"
          >
            <img
              src={item.petImage}
              alt={item.petName}
              className="w-full h-52 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold">{item.petName}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Max Donation: <span className="font-bold">${item.maxDonation}</span>
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Donated: <span className="font-bold">${item.donatedAmount}</span>
              </p>
              <Link
                to={`/donation-campaign/${item._id}`}
                className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Infinite Scroll Loader */}
      {hasMore && (
        <div ref={loader} className="text-center mt-10 text-gray-500 dark:text-gray-400">
          Loading more campaigns...
        </div>
      )}
      {!hasMore && campaigns.length > 0 && (
        <p className="text-center mt-10 text-gray-500 dark:text-gray-400">
          You've reached the end.
        </p>
      )}
    </section>
  );
};

export default DonationCampaigns;
