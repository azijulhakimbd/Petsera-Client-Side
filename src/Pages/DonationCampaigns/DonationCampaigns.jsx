import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";

import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PAGE_SIZE = 6;

const DonationCampaigns = () => {
  const axiosSecure = useAxiosSecure();
  const [campaigns, setCampaigns] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  // Fetch campaigns paginated & sorted by date descending
  const fetchCampaigns = async () => {
    const res = await axiosSecure.get(
      `/donations?page=${page}&limit=${PAGE_SIZE}&sort=desc`
    );
    const newCampaigns = res.data;

    if (newCampaigns.length < PAGE_SIZE) {
      setHasMore(false);
    }

    setCampaigns((prev) => [...prev, ...newCampaigns]);
    setPage((prev) => prev + 1);
    setInitialLoading(false);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-8">Donation Campaigns</h2>

      {initialLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
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
            <p className="text-center text-gray-500 mt-6">🎉 You've reached the end!</p>
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
                <div className="p-4">
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Max Amount: <strong>${campaign.maxAmount.toFixed(2)}</strong>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Donated: <strong>${campaign.totalDonated || 0}</strong>
                  </p>

                  <progress
                    className="progress progress-success w-full mb-3"
                    value={campaign.totalDonated || 0}
                    max={campaign.maxAmount}
                  ></progress>

                  <Link
                    to={`/donations/${campaign._id}`}
                    className="btn bg-blue-500 rounded-2xl p-2 hover:bg-amber-300 btn-sm btn-primary w-full"
                  >
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
