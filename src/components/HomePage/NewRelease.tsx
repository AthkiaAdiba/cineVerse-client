"use client";
import { motion, useInView } from "framer-motion";
import { PlayIcon, ClockIcon, TicketIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useGetAllContentQuery } from "../redux/features/content/contentApi";
import { Movie } from "@/types";
import Link from "next/link";

const NewReleases = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { data, isLoading } = useGetAllContentQuery([
    // { name: "sortBy", value: "rating" },
    {
      name: "createdAt",
      value: "asc",
    },
  ]);

  const moviesData: Movie[] = data?.data?.slice(0, 6);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 1, ease: "easeOut" },
    }),
  };

  const hoverVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <section className="py-10" id="new-releases">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 flex items-end justify-between"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            New Releases
            <span className="ml-4 text-blue-500">
              {new Date().getFullYear()}
            </span>
          </h2>
          
        </motion.div>

        <div className=" pb-8 ">
          <Swiper
            loop={true}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            className="w-full"
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: ".prev",
              nextEl: ".next",
            }}
          >
            {isLoading &&
              [...Array(4)].map((_, index) => (
                <SwiperSlide key={index}>
                  <div
                    key={index}
                    className="w-full h-[500px]  bg-gray-700 animate-pulse rounded-xl"
                  ></div>
                </SwiperSlide>
              ))}
            {moviesData?.map((movie: Movie, index: number) => (
              <SwiperSlide key={movie.id}>
                <Link href={`/movies/${movie.id}`}>
                  <motion.div
                    className="group relative cursor-pointer"
                    variants={cardVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    custom={index}
                  >
                    <motion.div
                      variants={hoverVariants}
                      className="relative h-[500px] overflow-hidden rounded-3xl shadow-2xl"
                    >
                      <img
                        src={movie.thumbnail}
                        alt={movie.title}
                        className="h-full w-full object-cover object-center"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0  bg-gradient-to-t  from-black  via-slate-900/60 to-transparent" />

                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1 text-xs font-bold text-white">
                          NEW
                        </span>
                        <span className="flex items-center gap-1 rounded-full bg-black/20 px-3 py-1 text-xs text-white backdrop-blur-sm">
                          <ClockIcon className="h-4 w-4" />
                          {movie.duration}
                        </span>
                      </div>

                      <motion.div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                          transition: { delay: 0.3 + index * 0.1 },
                        }}
                      >
                        <div className="rounded-full bg-white/10 p-4 backdrop-blur-md transition-all group-hover:bg-gradient-to-r from-blue-500 to-purple-500 group-hover:scale-110">
                          <PlayIcon className="h-10 w-10 text-white/90" />
                        </div>
                      </motion.div>

                      <div className="absolute bottom-0 left-0 right-0 space-y-4 p-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: { delay: 0.4 + index * 0.1 },
                          }}
                        >
                          <h3 className="text-xl truncate font-bold text-white">
                            {movie.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-300">
                            <span>{movie?.releaseYear}</span>
                            <span className="h-1 w-1 rounded-full bg-gray-400" />
                            <span>{movie?.genre?.genreName}</span>
                          </div>
                        </motion.div>

                        {/* Rating Progress */}
                        <motion.div
                          className="flex items-center gap-3"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: 1,
                            transition: { delay: 0.5 + index * 0.1 },
                          }}
                        >
                          <div className="relative h-2 w-full rounded-full bg-white/10">
                            <div
                              className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                              style={{
                                width: `${(movie?.averageRating as number / 10) * 100}%`,}}
                            />
                          </div>
                          <span className="text-sm font-semibold text-yellow-500">
                            {movie?.averageRating?.toFixed(1)}/10
                          </span>
                        </motion.div>

                        <motion.p
                          className="text-sm text-gray-300 line-clamp-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: { delay: 0.6 + index * 0.1 },
                          }}
                        >
                          {movie.synopsis}
                        </motion.p>
                      </div>
                    </motion.div>
                  </motion.div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default NewReleases;
