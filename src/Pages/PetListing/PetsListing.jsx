import React, { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaBirthdayCake, FaPaw } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const PetListing = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const axiosSecure = useAxiosSecure();

  const fetchPets = async ({ pageParam = 1 }) => {
    const res = await axiosSecure.get(
      `/pets-list?search=${search}&category=${category}&page=${pageParam}&limit=6`
    );
    return res.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["pets", search, category],
    queryFn: fetchPets,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  useEffect(() => {
    refetch();
  }, [search, category]);

  const loadingSkeletons = Array(6).fill(0);

  return (
    <section className="max-w-7xl mx-auto px-4 py-25">
      <h2 className="text-2xl md:text-3xl font-bold Poppins text-center mb-8 text-gray-800 dark:text-white flex items-center justify-center gap-2">
        <FaPaw className="text-blue-600" />
        Available Pets for Adoption
      </h2>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by pet name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full Poppins sm:w-1/2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full sm:w-1/4 px-4 py-2 Poppins rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        >
          <option value="">All Categories</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bird">Bird</option>
          <option value="Rabbit">Rabbit</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? loadingSkeletons.map((_, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-md">
                <Skeleton height={160} />
                <Skeleton count={3} className="mt-4" />
              </div>
            ))
          : data?.pages.map((page) =>
              page.data.map((pet) => (
                <motion.div
                  key={pet._id}
                  className="bg-white dark:bg-gray-900 shadow-md rounded-xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl Poppins font-semibold text-gray-900 dark:text-white">
                      {pet.name}
                    </h3>
                    <p className="text-sm text-gray-600 inter dark:text-gray-400 flex items-center gap-1">
                      <FaBirthdayCake className="text-pink-500" /> Age: {pet.age} {pet.age === 1 ? "Year" : "Years"}
                    </p>
                    <p className="text-sm text-gray-600 inter dark:text-gray-400 flex items-center gap-1">
                      <FaMapMarkerAlt className="text-red-500" /> Location: {pet.location}
                    </p>
                    <Link
                      to={`/pet/${pet._id}`}
                      className="inline-block mt-3 Poppins px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))
            )}
      </div>

      <div ref={ref} className="flex justify-center items-center mt-8">
        {isFetchingNextPage && (
          <span className="loading loading-spinner loading-lg text-primary"></span>
        )}
      </div>

      {!isFetching && !data?.pages[0]?.data.length && (
        <p className="text-center text-gray-600 inter dark:text-gray-300 mt-10">
          No pets found.
        </p>
      )}
    </section>
  );
};

export default PetListing;
