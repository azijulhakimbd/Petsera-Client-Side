import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

import {
  FaHandHoldingHeart,
  FaPaw,
  FaDollarSign,
  FaCoins,
  FaInfoCircle,
} from "react-icons/fa";

const PAGE_SIZE = 6;

const DonationCampaigns = () => {
  const axiosSecure = useAxiosSecure();
  const [campaigns, setCampaigns] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchCampaigns = async () => {
    try {
      const res = await axiosSecure.get(
        `/donations?page=${page}&limit=${PAGE_SIZE}&sort=desc`
      );
      const newCampaigns = res.data;

      if (newCampaigns.length < PAGE_SIZE) setHasMore(false);

      setCampaigns((prev) => {
        const existingIds = new Set(prev.map((c) => c._id));
        const uniqueNew = newCampaigns.filter((c) => !existingIds.has(c._id));
        return [...prev, ...uniqueNew];
      });

      setPage((prev) => prev + 1);
      setInitialLoading(false);
    } catch (err) {
      console.error("Error fetching campaigns:", err);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-25">
      <h2 className="text-2xl font-bold text-center mb-8 fredoka flex items-center justify-center gap-2 text-gray-800 dark:text-white">
        <FaHandHoldingHeart className="text-red-500" />
        Donation Campaigns
      </h2>

      {initialLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(PAGE_SIZE)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden p-4"
            >
              <Skeleton height={180} />
              <Skeleton height={20} className="my-2" />
              <Skeleton width={120} />
              <Skeleton width={180} />
              <Skeleton height={10} className="my-2" />
              <Skeleton height={30} />
            </div>
          ))}
        </div>
      ) : (
        <InfiniteScroll
          dataLength={campaigns.length}
          next={fetchCampaigns}
          hasMore={hasMore}
          loader={<p className="text-center mt-4">Loading more...</p>}
          endMessage={
            <p className="text-center text-gray-500 mt-6">
              🎉 You've reached the end!
            </p>
          }
        >
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            {campaigns.map((campaign) => (
              <motion.div
                key={campaign._id}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden border"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <img
                  src={campaign.image}
                  alt={campaign.petName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold fredoka text-gray-800 dark:text-white flex items-center gap-2">
                    <FaPaw className="text-blue-500" />
                    {campaign.petName || "Unnamed Pet"}
                  </h3>

                  <p className="text-sm lato text-gray-600 dark:text-gray-300 flex items-center gap-2">
                    <FaDollarSign className="text-green-600" />
                    Max Amount:{" "}
                    <strong>${campaign.maxAmount.toFixed(2)}</strong>
                  </p>
                  <p className="text-sm lato text-gray-600 dark:text-gray-300 flex items-center gap-2 mb-2">
                    <FaCoins className="text-yellow-500" />
                    Donated: <strong>${campaign.totalDonated || 0}</strong>
                  </p>

                  <progress
                    className="progress progress-success w-full mb-3"
                    value={campaign.totalDonated || 0}
                    max={campaign.maxAmount}
                  ></progress>

                  <Link
                    to={`/donations/${campaign._id}`}
                    className="flex items-center justify-center fredoka gap-2 bg-yellow-500 hover:bg-green-800 text-white py-2 rounded-2xl text-sm font-semibold transition"
                  >
                    <FaInfoCircle />
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </InfiniteScroll>
      )}
    </section>
  );
};

export default DonationCampaigns;
