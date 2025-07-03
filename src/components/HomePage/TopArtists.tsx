"use client";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type TArtistSlide = {
  id: number;
  artistName: string;
  image: string;
};

const artistsSlides: TArtistSlide[] = [
  {
    id: 1,
    artistName: "Alaya Pacheco",
    image: "/artist1.jpg",
  },
  {
    id: 2,
    artistName: "Sarah Neal",
    image: "/artist2.jpg",
  },
  {
    id: 3,
    artistName: "Emma Narburgh",
    image: "/artist3.jpg",
  },
  {
    id: 4,
    artistName: "Richard Cant",
    image: "/artist4.jpg",
  },
  {
    id: 5,
    artistName: "David Horovitch",
    image: "/artist5.jpg",
  },
  {
    id: 6,
    artistName: "Emily Carey",
    image: "/artist6.jpg",
  },
  {
    id: 7,
    artistName: "Harry Styles",
    image: "/artist7.jpg",
  },
  {
    id: 8,
    artistName: "Jefferson Hall",
    image: "/artist8.jpg",
  },
  {
    id: 9,
    artistName: "Brooke Mulford",
    image: "/artist9.jpg",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const slideVariants = {
  hidden: { opacity: 0, y: 20 },
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
      duration: 0.3,
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
      delay: 0.2,
      ease: "easeOut",
    },
  },
};

const TopArtists = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section id="top-artists">
      <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      variants={containerVariants}
      className="md:w-[90%] w-[95%] mx-auto pt-32 pb-20"
    >
       <div className="container mx-auto px-4" ref={ref}>
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-white mb-8"
        initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
      >
        Top Artists
      </motion.h2>

      <Swiper
        navigation={{
          prevEl: ".prevArtist",
          nextEl: ".nextArtist",
        }}
        loop={true}
        speed={600}
        modules={[Navigation]}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 8,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 8,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 12,
          },
          1400: {
            slidesPerView: 7,
            spaceBetween: 14,
          },
        }}
        style={{ padding: "40px 0" }}
      >
        {artistsSlides.map((artist, index) => (
          <SwiperSlide key={artist.id}>
            <motion.div
              variants={slideVariants}
              custom={index}
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <motion.div
                className="relative"
                whileHover="hover"
                initial="visible"
              >
                <motion.div
                  variants={imageVariants}
                  className="rounded-full overflow-hidden  "
                >
                  <Image
                    src={artist.image}
                    alt={artist.artistName}
                    height={180}
                    width={180}
                    className="rounded-full border-4 border-violet-500 shadow-lg shadow-violet-400/30 object-cover w-[180px] h-[180px] bg-[#181a2a] transition-shadow duration-300 hover:shadow-violet-500/80"
                  />
                </motion.div>
              </motion.div>

              <motion.div
                variants={textVariants}
                className="mt-4 text-white font-bold text-lg text-center tracking-wide"
              >
                {artist.artistName}
              </motion.div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className=" flex justify-between   ">
        <div className=" md:flex justify-center mb-3">
          <div className="prevArtist   hover:bg-gradient-to-r -translate-y-[190px]   -translate-x-5   transition-all duration-300 bg-gray-300/30 backdrop:blur-lg   from-blue-500 to-purple-500 w-28 h-8 rounded-lg z-50 flex items-center justify-center cursor-pointer rotate-90">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 fill-white"
              viewBox="0 0 24 24"
            >
              <path d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z" />
            </svg>
          </div>
        </div>
        <div className="nextArtist   hover:bg-gradient-to-r -translate-y-[190px] translate-x-5  transition-all duration-300 bg-gray-300/30 backdrop:blur-lg   from-blue-500 to-purple-500 w-28 h-8 rounded-lg z-50 flex items-center justify-center cursor-pointer -rotate-90">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 fill-white"
            viewBox="0 0 24 24"
          >
            <path d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z" />
          </svg>
        </div>
        </div>
      </div>
    </motion.div>
    </section>
  );
};

export default TopArtists;
