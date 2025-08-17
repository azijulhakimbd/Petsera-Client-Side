import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const banners = [
  {
    id: 1,
    image: "https://i.postimg.cc/DwcRJwWL/Hero-slider.jpg",
    title: "Adopt, Don’t Shop!",
    subtitle: "Find your new best friend today.",
  },
  {
    id: 2,
    image: "https://i.postimg.cc/dVFzVy0J/Hero-Slider-05.jpg",
    title: "Every Pet Deserves a Home",
    subtitle: "Browse loving pets ready to be adopted.",
  },
  {
    id: 3,
    image: "https://i.postimg.cc/X7dRW842/Hero-Slider-04.jpg",
    title: "Love Starts with a Paw",
    subtitle: "Give a pet a second chance at life.",
  },
  {
    id: 4,
    image: "https://i.postimg.cc/kM6r1CZP/Hero-Slider-02.jpg",
    title: "Rescue. Foster. Adopt.",
    subtitle: "Be the hero a homeless pet needs.",
  },
  {
    id: 5,
    image: "https://i.postimg.cc/NGW3ZVq9/Hero-Slider-03.jpg",
    title: "Open Your Heart & Home",
    subtitle: "Change a life forever by adopting today.",
  },
];

const HeroSlider = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
      {loading ? (
        <div className="h-[400px] sm:h-[450px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
          <Skeleton height={500} className="w-full rounded-2xl" />
        </div>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop
          className="rounded-2xl overflow-hidden shadow-lg"
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div
                className="relative h-[400px] sm:h-[450px] md:h-[500px] bg-cover bg-center flex items-center justify-start px-4 sm:px-6 lg:px-12"
                style={{ backgroundImage: `url(${banner.image})` }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="bg-black/15 backdrop-blur p-4 sm:p-6 rounded-xl max-w-md sm:max-w-lg md:max-w-xl"
                >
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-xl sm:text-3xl md:text-5xl font-bold fredoka 
             bg-gradient-to-r from-pink-700 to-pink-500 
             bg-clip-text text-transparent mb-3"
                  >
                    {banner.title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-sm sm:text-lg md:text-xl text-pink-300 lato"
                  >
                    {banner.subtitle}
                  </motion.p>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default HeroSlider;
