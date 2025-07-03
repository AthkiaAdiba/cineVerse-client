"use client";
import { motion, useInView } from "framer-motion";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useGetAllContentQuery } from "../redux/features/content/contentApi";
import { Movie } from "@/types";
import Link from "next/link";
import { useRef } from "react";

interface MovieCardProps {
  title: string;
  rating: number;
  description: string;
  imageUrl: string;
  genre: string;
  year: number;
  duration: string;
}

const TrendingMovies = () => {
  const { data, isLoading } = useGetAllContentQuery([
    { name: "sortBy", value: "rating" },
    { name: "sortOrder", value: "desc" },
    {
      name: "createdAt",
      value: "desc",
    },
  ]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const moviesData = data?.data?.slice(0, 4);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 1, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const overlayVariants = {
    rest: { opacity: 0 },
    hover: { opacity: 1, transition: { duration: 0.2 } },
  };

  const playIconVariants = {
    rest: { scale: 0.8, opacity: 0 },
    hover: { scale: 1, opacity: 1, transition: { delay: 0.1 } },
  };

  const infoVariants = {
    rest: { y: 100 },
    hover: {
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      className="container mx-auto px-4 py-10"
      id="trending-movies"
    >
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 flex items-end justify-between"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
          Trending Now
          </h2>
          
        </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {
          isLoading &&
          [...Array(4)].map((_, index) => (
            <div
              key={index}
              className="w-full h-96 bg-gray-700 animate-pulse rounded-3xl"
            ></div>
          ))
        }
        {moviesData?.map((movie: Movie) => (
          <Link href={`/movies/${movie?.id}`} key={movie?.id}>
            <motion.div
              className="relative group cursor-pointer"
              variants={cardVariants}
            >
              <img
                src={movie?.thumbnail}
                alt={movie?.title}
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />

              <motion.div
                className="absolute inset-0 rounded-3xl overflow-hidden"
                initial="rest"
                whileHover="hover"
                variants={overlayVariants}
              >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

                <motion.div
                  variants={playIconVariants}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <PlayIcon className="w-16 h-16 text-white/90 hover:text-white transition-colors" />
                </motion.div>

                <motion.div
                  variants={infoVariants}
                  className="absolute bottom-0 left-0 right-0 p-3"
                >
                  <div className="bg-black/50 backdrop-blur-xs rounded-xl p-3">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className=" text-lg font-bold truncate text-white">
                        {movie.title}
                      </h3>
                      <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
                        <span className="text-yellow-400 text-sm">
                          {movie?.averageRating}/10
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-blue-400 text-sm">
                        {movie?.releaseYear}
                      </span>
                      <span className="text-gray-300 text-sm">
                        {movie?.genre?.genreName}
                      </span>
                      <span className="text-gray-300 text-sm">
                        {movie.duration}
                      </span>
                    </div>

                    <p className="text-gray-300 text-sm line-clamp-2">
                      {movie.synopsis}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </Link>
        ))}
      </div>
      </div>
    </motion.div>
  );
};

export default TrendingMovies;
