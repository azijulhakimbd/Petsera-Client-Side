import React, { useContext, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { AuthContext } from "../../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(name, photoURL);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const isLoading = !user;

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-base-200 transition-colors duration-300">
      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-base-300 rounded-lg shadow-lg p-6 max-w-xl w-full text-center"
      >
        {/* Profile Picture */}
        <div className="flex justify-center">
          {isLoading ? (
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-400 animate-pulse" />
          ) : (
            <motion.img
              key={user?.photoURL}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              src={user?.photoURL || "https://via.placeholder.com/150"}
              alt="User"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-blue-500"
            />
          )}
        </div>

        {/* User Info */}
        {isLoading ? (
          <>
            <div className="mt-4 h-6 bg-gray-400 animate-pulse rounded w-40 mx-auto" />
            <div className="mt-2 h-4 bg-gray-400 animate-pulse rounded w-60 mx-auto" />
          </>
        ) : (
          <>
            <h2 className="text-xl sm:text-2xl text-yellow-500 font-bold mt-4 truncate">
              Name: {user?.displayName || "No Name"}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 truncate">
              Email: {user?.email || "No Email"}
            </p>
          </>
        )}

        {/* Edit Button */}
        {!isLoading && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="mt-6 inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition duration-300 max-w-full mx-auto"
            aria-label="Edit Profile"
          >
            <FiEdit className="text-lg" />
            <span className="text-sm sm:text-base">Edit Profile</span>
          </motion.button>
        )}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md transition-colors duration-300"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                Edit Profile
              </h2>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Photo URL
                  </label>
                  <input
                    type="text"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter photo URL"
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-900 dark:text-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                  >
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;