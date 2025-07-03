"use client";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useRef } from "react";

const topNews = [
  {
    id: 1,
    newsImage: "/news1.jpg",
    newsTitle: "Movies That Will Make Your Holidays The Best",
    newsDescription:
      "Discover heartwarming and exciting movies that will turn your holidays into a magical and memorable experience.",
    newsDate: "April 26, 2025",
    writer: "Jane Doe",
    category: "Drama",
  },
  {
    id: 2,
    newsImage: "/news2.jpg",
    newsTitle: "Must Watch Web Series On CineVerse",
    newsDescription:
      "Explore the top trending web series on CineVerse that you simply can't miss — from thrillers to heartfelt dramas.",
    newsDate: "April 26, 2025",
    writer: "Jane Doe",
    category: "Entertainment",
  },
  {
    id: 3,
    newsImage: "/news3.jpg",
    newsTitle: "Best Movies To Cheer Your Mood Up In 2022",
    newsDescription:
      "Feeling down? These uplifting movies from 2022 are guaranteed to boost your spirits and bring a smile to your face.",
    newsDate: "April 26, 2025",
    writer: "Jane Doe",
    category: "Entertainment",
  },
  {
    id: 4,
    newsImage: "/news3.jpg",
    newsTitle: "Best Movies To Cheer Your Mood Up In 2022",
    newsDescription:
      "Feeling down? These uplifting movies from 2022 are guaranteed to boost your spirits and bring a smile to your face.",
    newsDate: "April 26, 2025",
    writer: "Jane Doe",
    category: "Entertainment",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren",
    },
  },
};

const slideVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const imageVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const TopNews = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      variants={containerVariants}
       className="md:w-[90%] w-[95%] mx-auto  "
    >
      <div className="container mx-auto px-2 sm:px-4" ref={ref}>
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-8"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Top News
        </motion.h2>

        <Swiper
          modules={[Autoplay]}
          speed={1200}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 8,
            },
            480: {
              slidesPerView: 1,
              spaceBetween: 8,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1536: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
          className="news-swiper"
        >
          {topNews.map((item, index) => (
            <SwiperSlide key={index}>
              <motion.div
                variants={slideVariants}
                className="flex flex-col sm:flex-row gap-3 text-white p-3 sm:p-4 lg:p-5 cursor-pointer rounded-xl bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-black/30 transition-all duration-300 group"
              >
                {/* Image wrapper with motion */}
                <motion.div
                  className="w-full sm:w-[45%] h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] overflow-hidden rounded-lg"
                  whileHover="hover"
                  initial="visible"
                >
                  <motion.img
                    src={item.newsImage}
                    alt={item.newsTitle}
                    variants={imageVariants}
                    className="w-full h-full object-cover"
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>

                {/* Text Content */}
                <motion.div className="w-full sm:w-[55%] flex flex-col justify-between" variants={textVariants}>
                  <div>
                    <motion.h3
                      className="text-base sm:text-lg md:text-xl font-semibold line-clamp-2 group-hover:text-blue-400 transition-colors duration-300"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.newsTitle}
                    </motion.h3>

                    <motion.p
                      className="text-xs sm:text-sm md:text-base text-gray-400 mt-1.5 line-clamp-2 md:line-clamp-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {item.newsDescription}
                    </motion.p>
                  </div>

                  <motion.div
                    className="text-xs sm:text-sm mt-3 flex flex-wrap gap-1.5 text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {[item.newsDate, "•", item.writer, "•", item.category].map(
                      (text, i) => (
                        <motion.span
                          key={i}
                          className="hover:text-white transition-colors duration-200"
                          whileHover={{ color: "#ffffff" }}
                          transition={{ duration: 0.2 }}
                        >
                          {text}
                        </motion.span>
                      )
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .news-swiper {
          padding: 10px 0;
        }
      `}</style>
    </motion.div>
  );
};

export default TopNews;
