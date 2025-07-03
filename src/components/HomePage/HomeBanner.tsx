"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import { FaRegCirclePlay } from "react-icons/fa6";
import { LuPlus } from "react-icons/lu";
import { BiMoviePlay } from "react-icons/bi";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/thumbs";

type Slide = {
  title: string;
  desc: string;
  image: string;
  trailer: string;
};

const slides: Slide[] = [
  {
    title: "Almost Adults",
    desc: "This comedy feature follows two best friends in their final year of college while they transition into adulthood. One embraces her sexuality and...",
    image: "/image1.jpg",
    trailer: "#",
  },
  {
    title: "Almost Adults",
    desc: "This comedy feature follows two best friends in their final year of college while they transition into adulthood. One embraces her sexuality and...",
    image: "/image2.jpg",
    trailer: "#",
  },
  {
    title: "Almost Adults",
    desc: "This comedy feature follows two best friends in their final year of college while they transition into adulthood. One embraces her sexuality and...",
    image: "/image3.jpg",
    trailer: "#",
  },
  {
    title: "Almost Adults",
    desc: "This comedy feature follows two best friends in their final year of college while they transition into adulthood. One embraces her sexuality and...",
    image: "/image4.jpg",
    trailer: "#",
  },
  {
    title: "Almost Adults",
    desc: "This comedy feature follows two best friends in their final year of college while they transition into adulthood. One embraces her sexuality and...",
    image: "/image5.jpg",
    trailer: "#",
  },
];

const HomeBanner = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative min-h-[80vh] w-full overflow-hidden">
      {/* Background with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bg_playlist.webp')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#181c2e] via-[#181c2e]/95 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#181c2e] via-transparent to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Text Content */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {slides[activeIndex].title}
            </motion.h1>
            <motion.p 
              className="text-base md:text-lg text-gray-300 mb-6 md:mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {slides[activeIndex].desc}
            </motion.p>
            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button className="px-6 py-3 md:px-8 md:py-4 cursor-pointer flex gap-2 items-center rounded-xl font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300 text-base md:text-lg">
                <FaRegCirclePlay className="text-xl md:text-2xl" /> Play Now
              </button>
              <button className="bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white w-12 h-12 md:w-14 md:h-14 rounded-xl text-xl md:text-2xl flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10">
                <LuPlus className="text-2xl md:text-3xl" />
              </button>
            </motion.div>
          </motion.div>

          {/* Swiper Section */}
          <div className="w-full lg:w-1/2">
            {/* Main Swiper */}
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
              <Swiper
                loop={true}
                speed={800}
                modules={[Thumbs]}
                thumbs={{ swiper: thumbsSwiper }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="w-full h-full"
              >
                {slides.map((slide, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="relative w-full h-full">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <a
                        href={slide.trailer}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all duration-300 flex flex-col items-center gap-2 group"
                      >
                        <BiMoviePlay className="text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-300" />
                        <p className="text-base md:text-lg font-semibold">Watch Trailer</p>
                      </a>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Thumbnails */}
            <div className="mt-4 md:mt-6">
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={12}
                slidesPerView={4}
                watchSlidesProgress={true}
                className="w-full"
                breakpoints={{
                  320: {
                    slidesPerView: 3,
                    spaceBetween: 8,
                  },
                  480: {
                    slidesPerView: 4,
                    spaceBetween: 8,
                  },
                  768: {
                    slidesPerView: 5,
                    spaceBetween: 12,
                  },
                }}
              >
                {slides.map((slide, idx) => (
                  <SwiperSlide key={idx}>
                    <div 
                      className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer group transition-all duration-300 ${
                        activeIndex === idx 
                          ? "border-4 border-blue-500" 
                          : "border border-blue-300/30"
                      }`}
                    >
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className={`w-full h-full object-cover transition-all duration-300 ${
                          activeIndex === idx
                            ? "opacity-100 scale-105"
                            : "opacity-70 group-hover:opacity-100"
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
