"use client";
import { motion, useInView } from "framer-motion";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useGetActiveDiscountQuery } from "../redux/features/discount/discountApi";
import Link from "next/link";
import { useRef } from "react";
import { IDiscount } from "../types/discount";

const EditorsPicks = () => {
  const { data, isLoading } = useGetActiveDiscountQuery(undefined);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const moviesData = data?.data

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 10,
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
    <section className="py-10" id="editors-picks">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="container mx-auto px-4 pb-10 mb-10"
        >
          <div className="container mx-auto px-4" ref={ref}>
            <motion.div
              transition={{ duration: 0.8 }}
              className="mb-12 flex items-end justify-between"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Editor&apos;s Picks
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {isLoading &&
                [...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="w-full h-96 bg-gray-700 animate-pulse rounded-xl"
                  ></div>
                ))}

              {moviesData?.map((movie: IDiscount) => (
                <Link className="block" href={`/movies/${movie?.content?.id}`} key={movie?.content?.id}>
                  <motion.div
                    className="relative group cursor-pointer"
                    variants={cardVariants}
                  >
                    {/* Discount Badge */}
                    {movie?.percentage && (
                      <div
                        className={`absolute top-3 ${movie?.isActive ? "right-3" : "left-3"
                          } bg-red-600 px-4 py-1 rounded-full flex items-center justify-center backdrop-blur-sm z-10`}
                      >
                        <span className="text-white text-[12px] font-semibold">
                          {movie?.percentage}% OFF
                        </span>
                        <span className=" text-white text-xs"></span>
                      </div>
                    )}

                    {/* Thumbnail */}
                    <img
                      src={movie?.content?.thumbnail}
                      alt={movie?.content?.title}
                      className="w-full h-96 object-cover rounded-xl shadow-2xl"
                    />

                    {/* Overlay on Hover */}
                    <motion.div
                      className="absolute inset-0 rounded-xl overflow-hidden"
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
                            <h3 className="text-lg truncate font-bold text-white">
                              {movie?.content?.title}
                            </h3>
                          </div>

                          <div className="flex items-center gap-4 mb-4">
                            <span className="text-blue-400 text-sm">
                              {movie?.content?.releaseYear}
                            </span>
                            <span className="text-gray-300 text-sm">
                              {movie?.content?.genre?.genreName}
                            </span>
                            <span className="text-gray-300 text-sm">
                              {movie?.content?.duration}
                            </span>
                          </div>

                          <p className="text-gray-300 text-sm line-clamp-2">
                            {movie?.content?.synopsis}
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
      </div>
    </section>
  );
};

export default EditorsPicks;
