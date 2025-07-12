import React, { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const fetchPets = async ({ pageParam = 1, queryKey }) => {
  const [_key, search, category] = queryKey;
  const res = await fetch(
    `http://localhost:3000/pets-list?search=${search}&category=${category}&page=${pageParam}&limit=6`
  );
  return res.json();
};

const PetListing = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["pets", search, category],
    queryFn: fetchPets,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  const { ref, inView } = useInView();

  // Fetch more when inView changes
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  // Refetch when search/category changes
  useEffect(() => {
    refetch();
  }, [search, category]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        🐾 Available Pets for Adoption
      </h2>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by pet name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full sm:w-1/4 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        >
          <option value="">All Categories</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bird">Bird</option>
          <option value="Rabbit">Rabbit</option>
        </select>
      </div>

      {/* Pet Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.pages.map((page) =>
          page.data.map((pet) => (
            <div
              key={pet._id}
              className="bg-white dark:bg-gray-900 shadow-md rounded-xl overflow-hidden"
            >
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {pet.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Age: {pet.age} Years
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Location: {pet.location}
                </p>
                <Link
                  to={`/pet/${pet._id}`}
                  className="inline-block mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Infinite Scroll Trigger */}
      <div ref={ref} className="flex justify-center items-center mt-8">
        {isFetchingNextPage && (
          <span className="loading loading-spinner loading-lg text-primary"></span>
        )}
      </div>

      {!isFetching && !data?.pages[0].data.length && (
        <p className="text-center text-gray-600 dark:text-gray-300 mt-10">
          No pets found.
        </p>
      )}
    </section>
  );
};

export default PetListing;
