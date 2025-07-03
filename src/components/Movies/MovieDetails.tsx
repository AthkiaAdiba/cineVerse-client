"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useParams } from "next/navigation";
import {
  useGetAllContentQuery,
  useGetContentQuery,
} from "../redux/features/content/contentApi";
import MovieDetailsSkeleton from "./MovieDetailsSkeleton";
import { useGetUserQuery } from "../redux/features/user/userApi";
import {
  useCreateReviewMutation,
  useGetAllReviewByContentIdQuery,
} from "../redux/features/review/reviewApi";
import { toast } from "sonner";
import Link from "next/link";
import ReviewCard from "../modules/Reviews/ReviewCard";
import { useCreatePaymentMutation } from "../redux/features/payment/paymentApi";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  addToWatchList,
  watchListSelector,
} from "../redux/features/watchListSlice";
import { Movie } from "@/types";
import { verifyToken } from "@/utils/verifyToken";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import { TMovie } from "../types/movie";
import WatchlistButton from "../Shared/WatchlistButton";
import { RatioIcon, Star, StarIcon } from "lucide-react";
import { Md18UpRating } from "react-icons/md";
import { useValidateCuponMutation } from "../redux/features/cupon/cuponApi";

interface ReviewFormData {
  rating: number;
  reviewText: string;
  tags: string;
}

const MovieDetails = () => {
  const [createPayment] = useCreatePaymentMutation();
  const [showModal, setShowModal] = useState(false);
  const [cupon, setCoupon] = useState('');
  const [validateCupon, {isLoading: isCuponLoading}] = useValidateCuponMutation();
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const movieList = useAppSelector(watchListSelector);

  const router = useRouter();
  const { id } = useParams();
  const token = useAppSelector(selectCurrentToken);
  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  const { data: movieDetails, isLoading, refetch: refetchMovieDetails } = useGetContentQuery(id);

  const { data: allMovies, isLoading: isMoviesLoading } =
    useGetAllContentQuery(undefined);
  const { data: SingleUser } = useGetUserQuery(user?.id);
  const { data: reviews, refetch: refetchReviews } = useGetAllReviewByContentIdQuery(id);

  const [recommendedMovies, setRecommendedMovies] = useState<TMovie[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewFormData>();
  const [addReview] = useCreateReviewMutation();
  const contentId = movieDetails?.data.id;

  // const { data: allReview } = useGetAllReviewByContentIdQuery(contentId);

  const handleCouponValidation = async () => {
    if (!cupon.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    try {
      const result = await validateCupon({
        code: cupon,
      }).unwrap();

      if (result?.success) {
        setAppliedCoupon(result.data?.coupon);
        toast.success(result?.message || "Coupon applied successfully!");
        setCoupon('');
      } else {
        toast.error(result?.message || "Invalid coupon code");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to validate coupon");
    }
  };

  // Calculate discounted price
  const calculateDiscountedPrice = (originalPrice: number) => {
    if (appliedCoupon?.discount) {
      const discountAmount = (originalPrice * appliedCoupon.discount) / 100;
      return (originalPrice - discountAmount).toFixed(2);
    }
    return originalPrice.toFixed(2);
  };

  useEffect(() => {
    if (allMovies?.data && movieDetails?.data) {
      const currentGenre = movieDetails?.data?.genre?.genreName;
      // console.log("Current Genre:", currentGenre);

      if (currentGenre) {
        // First try to find exact genre matches
        let filteredMovies = allMovies?.data?.filter((movie: TMovie) => {
          return (
            movie?.genre?.genreName === currentGenre &&
            movie?.id !== movieDetails?.data?.id
          );
        });

        // If we don't have enough movies with exact genre match, try to find similar genres
        if (filteredMovies.length < 4) {
          const similarGenres = allMovies?.data?.filter((movie: TMovie) => {
            // Exclude the current movie and already filtered movies
            return (
              movie.id !== movieDetails?.data?.id &&
              !filteredMovies?.some((fm: TMovie) => fm.id === movie?.id) &&
              movie.genre?.genreName
            );
          });

          // Add similar genre movies until we have 4 recommendations
          filteredMovies = [
            ...filteredMovies,
            ...similarGenres.slice(0, 4 - filteredMovies.length),
          ];
        }

        // Ensure we only show 4 recommendations
        filteredMovies = filteredMovies.slice(0, 4);
        // console.log("Recommended Movies:", filteredMovies);
        setRecommendedMovies(filteredMovies);
      } else {
        // console.log("No current genre found");
        setRecommendedMovies([]);
      }
    } else {
      // console.log("No movies data available");
      setRecommendedMovies([]);
    }
  }, [allMovies, movieDetails]);

  const [rating, setRating] = useState(0);

  if (isLoading) {
    return <MovieDetailsSkeleton />;
  }

  const onSubmit = async (data: ReviewFormData) => {
    const toastId = toast.loading("Adding Review...");
    if (!user.id) {
      toast.error("User information not available. Please try again later.", {
        id: toastId,
      });
      return;
    }

    try {
      const reviewData = {
        rating: rating,
        reviewText: data.reviewText,
        contentId: movieDetails.data.id,
        userId: user.id,
        tags: data.tags || "CLASSIC",
      };

      const res = await addReview(reviewData).unwrap();

      if (res?.success) {
        toast.success(res?.message || "Your review is Pending", {
          id: toastId,
        });
        reset();
        setRating(0);
        refetchMovieDetails();
      } else {
        toast.error(res?.message || "Failed to add review", { id: toastId });
      }
    } catch (error: any) {
      console.error("Review submission error:", error);
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  // Purchasing
  const handleOptionSelect = async (data: Movie, option: string) => {
    if (!user) {
      router.push("/login"); // redirect to login page
    } else {
      const toastId = toast.loading("Loading Payment Page...");
      // console.log(data)
      const paymentData = {
        couponCode: appliedCoupon?.code,
        contentId: data?.id,
        status: option,
      };

      const payment = await createPayment(paymentData);
      // console.log(payment?.data?.paymentUrl);
      if (payment?.data?.success) {
        toast.success("Redirecting to payment page...", { id: toastId });
      } else {
        toast.error("Failed to create payment", { id: toastId });
      }
      setShowModal(false);
      window.open(payment?.data?.data?.paymentUrl);
    }
  };


  return (
    <div className="min-h-screen container mx-auto text-white p-6 pt-24">
      {/* 🎬 Trial Video Section */}

      <div className="w-full  mb-10 hidden md:block">
        <div className="relative w-full   rounded-xl overflow-hidden">
          {typeof movieDetails?.data?.contentBanner === "string" &&
            movieDetails.data.contentBanner.trim() !== "" &&
            (movieDetails.data.contentBanner.startsWith("http") ||
              movieDetails.data.contentBanner.startsWith("https") ||
              movieDetails.data.contentBanner.startsWith("/")) ? (
            <Image
              src={movieDetails.data.contentBanner}
              alt="Banner"
              width={600}
              height={400}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : null}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-8">
        <motion.div
          className="w-full md:w-1/4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Image
            src={movieDetails?.data?.thumbnail}
            alt="Spider Man Memo Poster"
            width={600}
            height={400}
            className="rounded-xl"
          />
          <div className="flex justify-center mt-4 ">
            <WatchlistButton data={movieDetails.data} />
          </div>
        </motion.div>

        <motion.div
          className="w-full md:w-3/4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-2">
            {movieDetails?.data?.title}
          </h1>

          <div className="text-sm md:text-lg text-gray-400 mb-2 flex  lg:flex-row flex-col gap-1 lg:items-center ">
            <div className="flex lg:flex-row gap-1">
              <div className="flex items-center gap-1">
                <Rating items={1} value={1} style={{ maxWidth: 20 }} />
                <p>{movieDetails?.data?.averageRating}/10 | {" "}</p>
              </div>
              <div className="flex gap-1">
                📅
                <p>{movieDetails?.data?.releaseYear} | </p>
              </div>
            </div>

            <div className="flex lg:flex-row gap-1">
              ⏱️{" "}
              <p>{movieDetails?.data?.duration} |{" "}</p>
              <span className="flex gap-1">
                <Image
                  src={movieDetails?.data?.platform?.platformLogo}
                  width={20}
                  height={20}
                  alt="sds"
                />
                {movieDetails?.data?.platform?.platformName}
              </span>{" "}
            </div>


          </div>

          <p className="mb-4 text-sm md:text-lg text-gray-300">
            {movieDetails?.data?.genre?.genreName}
          </p>
          <p className="mb-4 text-sm md:text-lg text-gray-300">
            {movieDetails?.data?.synopsis}
          </p>
          <div className="space-y-3">
            <div className="flex gap-2">
              <p className="text-sm md:text-lg text-gray-400">
                Cast:{" "}
                <span className="text-white">{movieDetails?.data?.actor},</span>
              </p>
              <p className="text-sm md:text-lg text-gray-400">
                <span className="text-white">
                  {movieDetails?.data?.actress}
                </span>
              </p>
            </div>
            <p className="text-sm md:text-lg text-gray-400">
              Producer:{" "}
              <span className="text-white">
                {" "}
                {movieDetails?.data?.producer}
              </span>
            </p>
            <p className="text-sm md:text-lg text-gray-400">
              Director:{" "}
              <span className="text-white">{movieDetails?.data?.director}</span>
            </p>
            {movieDetails?.data?.spoilerWarning && (
              <p className="text-sm md:text-lg text-gray-400">
                Spoiler Warning:{" "}
                <span className="text-white">
                  {movieDetails?.data?.spoilerWarning}
                </span>
              </p>
            )}

            <p className="text-sm md:text-lg font-semibold text-gray-400">
              One Time Purchase:
              {movieDetails?.data?.discount?.isActive ? (
                <>
                  <span className="text-white font-bold ml-2 text-xl">
                    ${(movieDetails.data.price - (movieDetails.data.price * movieDetails.data.discount.percentage) / 100).toFixed(2)}
                  </span>
                  <del className="ml-2 text-red-400">${movieDetails.data.price}</del>
                </>
              ) : (
                <span className="text-white font-bold ml-2 text-xl">
                  ${movieDetails?.data?.price}
                </span>
              )}
            </p>

            <p className="text-sm md:text-lg font-semibold text-gray-400">
              Rental Price:
              <span className="text-white text-xl">
                {" "}
                ${movieDetails?.data?.rentprice}
              </span>
            </p>
          </div>

          <div className="py-5">
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2 mt-5 cursor-pointer flex gap-2 items-center rounded-xl font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-md hover:opacity-90 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/40 text-sm md:text-lg   duration-300"
            >
              Purchase Movie
            </button>
          </div>

          {/*****************Purchase Modal************ */}
          {showModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 cursor-pointer overflow-y-auto"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ 
                  type: 'spring',
                  duration: 0.5,
                  bounce: 0.2,
                  damping: 20,
                  stiffness: 100
                }}
                className="bg-gradient-to-b from-[#1e2433] to-[#151b2b] rounded-2xl shadow-2xl p-3 sm:p-6 w-full max-w-[800px] text-center relative border border-gray-700/50"
              >
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setShowModal(false)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-gray-800/30 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>

                {movieDetails?.data?.discount?.isActive && (
                  <motion.div 
                    initial={{ y: -40, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 0.2,
                      duration: 0.5,
                      type: 'spring',
                      bounce: 0.3,
                      damping: 15
                    }}
                    className="bg-gradient-to-r from-red-500 to-pink-500 absolute -translate-y-10 sm:-translate-y-14 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium shadow-lg border border-red-400/20"
                  >
                    <span className="ml-2">
                      {movieDetails?.data?.discount?.percentage}% Off For One Time Purchase
                    </span>
                  </motion.div>
                )}
                <motion.h2 
                  className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8 text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                >
                  Choose Your Purchase Option
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                  <motion.div 
                    className="bg-gray-800/30 rounded-xl p-4 sm:p-8 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
                  >
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                      <span className="p-2 sm:p-3 rounded-lg bg-blue-500/10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                        </svg>
                      </span>
                      One Time Purchase
                    </h3>
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <span className="text-gray-400">Price:</span>
                      <div className="text-right">
                        {appliedCoupon ? (
                          <>
                            <div className="flex items-center gap-2">
                              <span className="text-green-400 text-sm font-medium">
                                {appliedCoupon.discount}% OFF
                              </span>
                              <span className="text-white font-bold text-2xl">
                                ${calculateDiscountedPrice(movieDetails.data.price)}
                              </span>
                              <del className="ml-2 text-red-400">${movieDetails.data.price}</del>
                            </div>
                          </>
                        ) : movieDetails?.data?.discount?.isActive ? (
                          <>
                            <div className="flex items-center gap-2">
                              <span className="text-green-400 text-sm font-medium">
                                {movieDetails.data.discount.percentage}% OFF
                              </span>
                              <span className="text-white font-bold text-2xl">
                                ${(movieDetails.data.price - (movieDetails.data.price * movieDetails.data.discount.percentage) / 100).toFixed(2)}
                              </span>
                              <del className="ml-2 text-red-400">${movieDetails.data.price}</del>
                            </div>
                          </>
                        ) : (
                          <span className="text-white font-bold text-2xl">${movieDetails.data.price}</span>
                        )}
                      </div>
                    </div>
                    <motion.button
                      onClick={() => handleOptionSelect(movieDetails?.data, 'BOUGHT')}
                      className="w-full py-2 sm:py-4 px-2 sm:px-4 cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm sm:text-base hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5"
                    >
                      Buy Now
                    </motion.button>
                  </motion.div>
                  <motion.div 
                    className="bg-gray-800/30 rounded-xl p-4 sm:p-8 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300"
                  >
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                      <span className="p-2 sm:p-3 rounded-lg bg-purple-500/10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Rent Movie
                    </h3>
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <span className="text-gray-400">Price:</span>
                      <span className="text-white font-bold text-lg sm:text-2xl">${movieDetails?.data?.rentprice}</span>
                    </div>
                    <motion.button
                      onClick={() => handleOptionSelect(movieDetails?.data, 'RENTED')}
                      className="w-full py-2 sm:py-4 px-2 sm:px-4 cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-sm sm:text-base hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:-translate-y-0.5"
                    >
                      Rent Now
                    </motion.button>
                  </motion.div>
                </div>
                {!movieDetails?.data?.discount?.isActive && (
                  <motion.div 
                    className="mt-6 sm:mt-8 bg-gray-800/30 rounded-xl p-4 sm:p-8 border border-gray-700/50"
                  >
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                      <span className="p-2 sm:p-3 rounded-lg bg-green-500/10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Apply Coupon
                    </h3>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={cupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700/30 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-sm sm:text-base"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleCouponValidation}
                        disabled={isCuponLoading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-500/10 text-green-400 rounded-lg text-xs sm:text-sm font-medium hover:bg-green-500/20 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isCuponLoading ? 'Applying...' : 'Apply'}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}

          <h2 className="mt-8 text-xl font-semibold text-white">
            Recommended For You
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {recommendedMovies.map((movie) => (
              <Link key={movie.id} href={`/movies/${movie.id}`}>
                <motion.div
                  key={movie.id}
                  className="relative w-full h-64 bg-gray-900 rounded-lg overflow-hidden shadow-lg cursor-pointer"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <img
                    src={movie.thumbnail}
                    alt={movie.title}
                    className="w-full h-40 object-cover"
                  />

                  <div className="p-2 h-16 flex items-center">
                    <h3 className="text-white text-sm font-semibold line-clamp-2">
                      {movie.title}
                    </h3>
                  </div>

                  <motion.div
                    variants={{
                      rest: { x: "100%", opacity: 0 },
                      hover: { x: "0%", opacity: 1 },
                    }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-[#0f172a] text-white p-4 flex flex-col justify-center pointer-events-none"
                  >
                    <div>
                      <h3 className="text-lg font-semibold">{movie.title}</h3>

                      <p className="text-sm md:text-lg text-gray-400 mt-1">
                        {movie.releaseYear} ・ {movie.duration}
                      </p>
                      <p className="text-sm md:text-lg mt-2 text-gray-300">
                        {movie.genre.genreName}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </Link>
            ))}
          </div>

          {SingleUser?.data ? <>
            <h2 className="mt-10 text-xl font-semibold">Add a review</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">


              {/* Rating Component */}
              <div className="flex items-center gap-1">
                <Rating
                  items={10}
                  style={{ maxWidth: 200 }}
                  value={rating}
                  onChange={setRating}
                  halfFillMode="box"
                  transition="colors"
                />
                <span className="text-yellow-400">{rating}/10</span>
              </div>
              {/* Review Textarea */}
              <textarea
                className="w-full mt-4 p-2 outline-none focus:border-blue-500 transition-all duration-300  bg-gray-800 border border-gray-600 rounded"
                rows={4}
                placeholder="Your review *"
                {...register("reviewText", { required: "Review is required" })}
              />
              <select
                className="mt-4 p-2 text-white border border-gray-500 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                {...register("tags")}
              >
                <option className="bg-slate-900 text-white" value="CLASSIC">
                  CLASSIC
                </option>
                <option className="bg-slate-900 text-white" value="UNDERRATED">
                  UNDERRATED
                </option>
              </select>
              {errors.reviewText && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.reviewText.message}
                </p>
              )}

              {/* Checkbox for saving info */}

              {/* <div className="mt-4">
 
              <label className="text-sm">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                Save my name, email, and website in this browser for the next
                time I comment.
              </label>
 
            </div> */}

              {/* Submit Button */}
              <br />
              <button
                type="submit"
                disabled={!user?.id || !SingleUser?.data?.id || rating === 0}
                className="mt-4 px-10 py-3 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:-translate-y-1 hover:shadow-blue-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!SingleUser?.data?.id ? "Loading user data..." : "Submit"}
              </button>
            </form>
          </>: <></>}

          {/* Display Submitted Review */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">User Reviews</h2>
            <ReviewCard 
              ReviewData={movieDetails.data.reviews} 
              UserData={user?.id ? SingleUser?.data : null}
              onReviewUpdate={refetchMovieDetails}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MovieDetails;
