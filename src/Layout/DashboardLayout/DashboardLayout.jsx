import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  FaPlusCircle,
  FaPaw,
  FaClipboardList,
  FaDonate,
  FaHandHoldingHeart,
  FaGift,
  FaBars,
  FaTimes,
  FaUsers,
  FaHome,
  FaUserCircle,
} from "react-icons/fa";
import { MdDarkMode, MdLightMode, MdVolunteerActivism } from "react-icons/md";
import useAuth from "../../Hooks/useAuth";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DashboardLayout = () => {
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
            <span className="hidden sm:block fredoka text-xl font-bold text-primary dark:text-primary-light">
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

        {/* Sidebar content */}
        {user ? (
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {/* Home */}
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-2 fredoka px-4 py-2 rounded hover:bg-green-300 dark:hover:bg-green-700 ${
                  isActive ? "bg-gray-300 dark:bg-gray-700 font-semibold" : "dark:text-gray-300 text-gray-800"
                }`
              }
            >
              <FaHome size={24} className="text-green-600" />
              Home
            </NavLink>

            {/* Profile */}
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `flex items-center gap-2 fredoka px-4 py-2 rounded hover:bg-green-300 dark:hover:bg-green-700 ${
                  isActive ? "bg-gray-300 dark:bg-gray-700 font-semibold" : "dark:text-gray-300 text-gray-800"
                }`
              }
            >
              <FaUserCircle size={24} className="text-green-700" />
              Profile
            </NavLink>

            {/* Other existing links */}
            {[
              {
                to: "/dashboard/add-pet",
                icon: <FaPlusCircle className="text-blue-600 dark:text-blue-400" size={24} />,
                label: "Add a Pet",
                bg: "blue",
              },
              {
                to: "/dashboard/my-pets",
                icon: <FaPaw className="text-green-600 dark:text-green-400" size={24} />,
                label: "My Added Pets",
                bg: "green",
              },
              {
                to: "/dashboard/adoption-requests",
                icon: <FaClipboardList className="text-yellow-600 dark:text-yellow-400" size={24} />,
                label: "Adoption Requests",
                bg: "yellow",
              },
              {
                to: "/dashboard/create-campaign",
                icon: <FaDonate className="text-purple-600 dark:text-purple-400" size={24} />,
                label: "Create Donation Campaign",
                bg: "purple",
              },
              {
                to: "/dashboard/my-campaigns",
                icon: <FaHandHoldingHeart className="text-red-600 dark:text-red-400" size={24} />,
                label: "My Donation Campaigns",
                bg: "red",
              },
              {
                to: "/dashboard/my-donations",
                icon: <FaGift className="text-green-600 dark:text-green-400" size={24} />,
                label: "My Donations",
                bg: "pink",
              },
              {
                to: "/dashboard/all-users",
                icon: <FaUsers className="text-blue-700 dark:text-blue-400" size={24} />,
                label: "All Users",
                bg: "pink",
              },
              {
                to: "/dashboard/all-pets",
                icon: <FaPaw className="text-pink-600 dark:text-pink-400" size={24} />,
                label: "All Pets",
                bg: "red",
              },
              {
                to: "/dashboard/all-donations",
                icon: <MdVolunteerActivism className="text-green-600 dark:text-green-400" size={24} />,
                label: "All Donations",
                bg: "pink",
              },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 fredoka px-4 py-2 rounded hover:bg-${item.bg}-100 dark:hover:bg-${item.bg}-900 ${
                    isActive
                      ? `bg-${item.bg}-200 dark:bg-${item.bg}-700 font-semibold`
                      : "dark:text-gray-300 text-gray-800"
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>
        ) : (
          <SkeletonTheme baseColor="#2d3748" highlightColor="#4a5568">
            <div className="space-y-3 px-4 py-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} height={32} />
              ))}
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

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mr-4"
            aria-label="Open sidebar"
          >
            <FaBars size={24} />
          </button>

          <div className="font-semibold fredoka text-lg text-gray-900 dark:text-gray-100">
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
                  <img
                    src={user?.photoURL}
                    alt={user?.displayName || "User"}
                    className="w-9 h-9 rounded-full object-cover border border-primary"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-white font-bold">
                    {user?.displayName?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </button>
            ) : (
              <Skeleton circle height={36} width={36} />
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
