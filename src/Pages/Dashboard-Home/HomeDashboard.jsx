"use client";
import React, { useEffect, useState, useContext } from "react";
import { FaUsers, FaPaw, FaHandHoldingHeart, FaDollarSign } from "react-icons/fa";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAxiosSecureRefresh from "../../Hooks/useAxiosSecureRefresh";
import { AuthContext } from "../../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";

const HomeDashboard = () => {
  const axiosSecure = useAxiosSecureRefresh();
  const { user, loading: authLoading } = useContext(AuthContext);
  const [stats, setStats] = useState(null);

  // Fetch user role using React Query
  const { data: role = "user", isLoading: roleLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data?.role || "user";
    },
  });

  // Fetch dashboard stats based on role
  useEffect(() => {
    if (!user || roleLoading) return;

    const fetchStats = async () => {
      try {
        const { data } = await axiosSecure.get("/dashboard-stats", {
          params: { role, email: user.email },
        });
        setStats(data);
      } catch (err) {
        console.error("❌ Error fetching stats:", err);
      }
    };
    fetchStats();
  }, [user, role, roleLoading, axiosSecure]);

  // Prepare cards dynamically
  const cards = stats
    ? role === "admin"
      ? [
          {
            title: "Total Users",
            value: stats.totalUsers,
            icon: <FaUsers className="h-10 w-10 text-white" />,
            gradient: "from-purple-500 via-pink-500 to-red-500",
          },
          {
            title: "Total Pets",
            value: stats.totalPets,
            icon: <FaPaw className="h-10 w-10 text-white" />,
            gradient: "from-green-500 via-emerald-500 to-teal-500",
          },
          {
            title: "Active Campaigns",
            value: stats.activeCampaigns,
            icon: <FaHandHoldingHeart className="h-10 w-10 text-white" />,
            gradient: "from-blue-500 via-indigo-500 to-purple-600",
          },
          {
            title: "Total Donations",
            value: `$${stats.totalDonations}`,
            icon: <FaDollarSign className="h-10 w-10 text-white" />,
            gradient: "from-yellow-500 via-orange-500 to-red-500",
          },
        ]
      : [
          {
            title: "My Pets",
            value: stats.myPets,
            icon: <FaPaw className="h-10 w-10 text-white" />,
            gradient: "from-green-500 via-emerald-500 to-teal-500",
          },
          {
            title: "My Donations",
            value: stats.myDonations,
            icon: <FaHandHoldingHeart className="h-10 w-10 text-white" />,
            gradient: "from-blue-500 via-indigo-500 to-purple-600",
          },
          {
            title: "Total Donated",
            value: `$${stats.myTotalDonations}`,
            icon: <FaDollarSign className="h-10 w-10 text-white" />,
            gradient: "from-yellow-500 via-orange-500 to-red-500",
          },
        ]
    : new Array(role === "admin" ? 4 : 3).fill(null); // skeleton placeholders

  if (authLoading || roleLoading) {
    // show loading skeleton
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {[...new Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 dark:bg-gray-800 p-6 rounded-2xl shadow-md flex flex-col items-center justify-center"
          >
            <Skeleton circle width={40} height={40} />
            <Skeleton height={40} width={80} className="mt-3" />
            <Skeleton height={20} width={100} className="mt-2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        📊 Dashboard Overview
      </h2>

      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${cards.length} gap-6`}>
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: stats ? 1.05 : 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`rounded-2xl shadow-md p-6 flex flex-col items-center justify-center ${
              card?.gradient
                ? `bg-gradient-to-r ${card.gradient} text-white`
                : "bg-gray-200 dark:bg-gray-800"
            }`}
          >
            {card ? (
              <>
                <div className="mb-2">{card.icon}</div>
                <h2 className="text-3xl font-bold">{card.value}</h2>
                <p className="text-lg mt-2">{card.title}</p>
              </>
            ) : (
              <>
                <Skeleton circle width={40} height={40} />
                <Skeleton height={40} width={80} className="mt-3" />
                <Skeleton height={20} width={100} className="mt-2" />
              </>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HomeDashboard;
