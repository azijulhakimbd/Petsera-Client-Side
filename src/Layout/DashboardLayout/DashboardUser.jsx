import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { Link, NavLink, Outlet } from "react-router";
import {
  FaPlusCircle,
  FaPaw,
  FaClipboardList,
  FaDonate,
  FaHandHoldingHeart,
  FaGift,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

const DashboardUser = () => {
  const { user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newMode ? "dark" : "light");
      }
      return newMode;
    });
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gray-200 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 flex flex-col transform transition-transform duration-300 ease-in-out z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:flex`}
      >
        <div className="px-6 py-4 border-b border-gray-300 dark:border-gray-700 font-bold text-xl flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://i.postimg.cc/yNj7nhmJ/Petsera.png"
              alt="Petsera logo"
              className="w-16"
            />
            <span className="hidden sm:block text-xl font-bold text-primary dark:text-primary-light">
              Petsera
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            aria-label="Close sidebar"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {user ? (
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <NavLink
              to="/dashboard/add-pet"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900 ${
                  isActive
                    ? "bg-blue-200 dark:bg-blue-700 font-semibold"
                    : "dark:text-gray-300 text-gray-800"
                }`
              }
            >
              <FaPlusCircle
                size={24}
                className="text-blue-600 dark:text-blue-400"
              />
              Add a Pet
            </NavLink>
            <NavLink
              to="/dashboard/my-pets"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded hover:bg-green-100 dark:hover:bg-green-900 ${
                  isActive
                    ? "bg-green-200 dark:bg-green-700 font-semibold"
                    : "dark:text-gray-300 text-gray-800"
                }`
              }
            >
              <FaPaw
                size={24}
                className="text-green-600 dark:text-green-400"
              />
              My Added Pets
            </NavLink>
            <NavLink
              to="/dashboard/adoption-requests"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded hover:bg-yellow-100 dark:hover:bg-yellow-900 ${
                  isActive
                    ? "bg-yellow-200 dark:bg-yellow-700 font-semibold"
                    : "dark:text-gray-300 text-gray-800"
                }`
              }
            >
              <FaClipboardList
                size={24}
                className="text-yellow-600 dark:text-yellow-400"
              />
              Adoption Requests
            </NavLink>
            <NavLink
              to="/dashboard/create-campaign"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded hover:bg-purple-100 dark:hover:bg-purple-900 ${
                  isActive
                    ? "bg-purple-200 dark:bg-purple-700 font-semibold"
                    : "dark:text-gray-300 text-gray-800"
                }`
              }
            >
              <FaDonate
                size={24}
                className="text-purple-600 dark:text-purple-400"
              />
              Create Donation Campaign
            </NavLink>
            <NavLink
              to="/dashboard/my-campaigns"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded hover:bg-red-100 dark:hover:bg-red-900 ${
                  isActive
                    ? "bg-red-200 dark:bg-red-700 font-semibold"
                    : "dark:text-gray-300 text-gray-800"
                }`
              }
            >
              <FaHandHoldingHeart
                size={24}
                className="text-red-600 dark:text-red-400"
              />
              My Donation Campaigns
            </NavLink>
            <NavLink
              to="/dashboard/my-donations"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded hover:bg-pink-100 dark:hover:bg-pink-900 ${
                  isActive
                    ? "bg-pink-200 dark:bg-pink-700 font-semibold"
                    : "dark:text-gray-300 text-gray-800"
                }`
              }
            >
              <FaGift
                size={24}
                className="text-pink-600 dark:text-pink-400"
              />
              My Donations
            </NavLink>
          </nav>
        ) : (
          <SkeletonTheme baseColor="#2d3748" highlightColor="#4a5568">
            <div className="space-y-3 px-4 py-6">
              <Skeleton height={30} />
              <Skeleton height={30} />
              <Skeleton height={30} />
              <Skeleton height={30} />
            </div>
          </SkeletonTheme>
        )}
      </aside>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
          aria-hidden="true"
        />
      )}

      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mr-4"
            aria-label="Open sidebar"
          >
            <FaBars size={24} />
          </button>

          <div className="font-semibold text-lg text-gray-900 dark:text-gray-100">
            Dashboard
          </div>

          <div className="flex items-center gap-4">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
            >
              {darkMode ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
            </button>

            {/* Avatar */}
            {user ? (
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="relative flex items-center gap-2 focus:outline-none"
              >
                {user?.photoURL ? (
                  <motion.img
                    src={user?.photoURL}
                    alt={user?.displayName || "User"}
                    className="w-9 h-9 rounded-full object-cover border border-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <motion.div
                    className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-white font-bold"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {user?.displayName?.charAt(0).toUpperCase() || "U"}
                  </motion.div>
                )}
              </button>
            ) : (
              <Skeleton circle height={36} width={36} />
            )}
          </div>
        </header>

        {/* Main content */}
        <motion.main
          className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};

export default DashboardUser;
