'use client';

import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import Image from "next/image";
import moviePoster from "@/assets/images/movieposter.jpg"
import manvector from "@/assets/images/manvector.png"
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import ReactPlayer from 'react-player';
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import { useParams } from 'next/navigation';
import { useGetAllContentQuery, useGetContentQuery } from '../redux/features/content/contentApi';
import MovieDetailsSkeleton from '../Movies/MovieDetailsSkeleton';
import { useGetUserQuery } from '../redux/features/user/userApi';
import { useCreateReviewMutation, useGetAllReviewQuery } from '../redux/features/review/reviewApi';
import { toast } from "sonner";

interface Movie {
    id: string;
    title: string;
    thumbnail: string;
    genre: {
        genreName: string;
    };
    releaseYear: string;
    duration: string;
}

interface ReviewFormData {
    rating: number;
    reviewText: string;
    tags: string
}

const MovieDetails = ({ currentUser }: any) => {
    const router = useRouter();
    const { id } = useParams();
    const { data: mobileDetails, isLoading } = useGetContentQuery({ id })
    const { data: allMovies } = useGetAllContentQuery({ undefined })
    const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
    const { data: SingleUser } = useGetUserQuery(currentUser?.id)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ReviewFormData>();
    const [addReview] = useCreateReviewMutation();
    const { data: allReviewsdata } = useGetAllReviewQuery({ undefined })

    console.log(allReviewsdata)



    useEffect(() => {
        if (allMovies?.data && mobileDetails?.data) {
            const currentGenre = mobileDetails.data.genre?.genreName;
            if (currentGenre) {
                const filteredMovies = allMovies.data.filter((movie: Movie) =>
                    movie.genre?.genreName === currentGenre && movie.id !== mobileDetails.data.id
                );
                setRecommendedMovies(filteredMovies);
            }
        }
    }, [allMovies, mobileDetails]);

    const [rating, setRating] = useState(0);
    const [isChecked, setIsChecked] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const videoUrl =
        "https://customer-342mt1gy0ibqe0dl.cloudflarestream.com/e5fe3013604cf504ace84b84d91b1f5a/downloads/default.mp4"


    if (isLoading) {
        return <MovieDetailsSkeleton />;
    }



    const onSubmit = async (data: ReviewFormData) => {
        const toastId = toast.loading("Creating Review...");
        if (!SingleUser?.data?.id) {
            alert('User information not available. Please try again later.');
            return;
        }

        const reviewData = {
            rating: rating,
            reviewText: data.reviewText,
            contentId: mobileDetails.data.id,
            userId: SingleUser.data.id,
            tags: data.tags
        }
        console.log(reviewData)
        try {
            const res = await addReview(reviewData);
            if (res?.data?.success) {
                toast.success(res?.data?.message, { id: toastId });
            }

        } catch (error: any) {
            console.log(error);
            toast.error("Something went wrong", { id: toastId });
        }
        // Here you would typically make an API call to submit the review
        reset();
        setRating(0);
        setIsChecked(false);
        setSubmitted(true);
    };



    return (
        <div className="min-h-screen container mx-auto text-white p-6 pt-24">

            {/* 🎬 Trial Video Section */}
            <div className="w-full lg:-mb-15 md:mb-20 -mb-5">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                    <ReactPlayer
                        url={videoUrl} // Local or external (e.g. https://youtu.be/...)
                        controls
                        width="100%"
                        height="80%"
                        light="https://streamvid.jwsuperthemes.com/wp-content/uploads/2023/06/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg" // Optional: poster thumbnail before play
                    />
                </div>
            </div>


            <div className="flex flex-col md:flex-row items-start gap-8">
                <motion.div
                    className="w-full md:w-1/4"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Image
                        src={mobileDetails?.data?.thumbnail} // Replace with actual image path
                        alt="Spider Man Memo Poster"
                        width={600}
                        height={400}
                        className="rounded-xl"
                    />
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => { }}
                            className="text-sm text-gray-400 hover:text-white cursor-pointer"
                        >
                            👍 0 likes
                        </button>
                        <button
                            onClick={() => { }}
                            className="text-sm text-gray-400 hover:text-white cursor-pointer"
                        >
                            🔗 Share
                        </button>
                        <button
                            onClick={() => { }}
                            className="text-sm text-gray-400 hover:text-white cursor-pointer"
                        >
                            ⭐ Watchlist
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    className="w-full md:w-3/4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-bold mb-2">{mobileDetails?.data?.title}</h1>
                    <p className="text-sm text-gray-400 mb-2 flex gap-1 items-center">
                        <Rating
                            style={{ maxWidth: 80 }}
                            value={3}
                            onChange={setRating}
                            readOnly
                        /> 8.5 | 👁️ 2684 Views | 📅 {mobileDetails?.data?.releaseYear} | ⏱️ {mobileDetails?.data?.duration} | <span><Image src={mobileDetails?.data?.platform?.platformLogo} width={20} height={20} alt='sds' /></span> {mobileDetails?.data?.platform?.platformName}
                    </p>
                    <p className="mb-4 text-sm text-gray-300">{mobileDetails?.data?.genre?.genreName}</p>
                    <p className="mb-4 text-sm text-gray-300">
                        {mobileDetails?.data?.synopsis}
                    </p>
                    <div className='space-y-3'>
                        <div className='flex gap-2'>
                            <p className="text-sm text-gray-400">Cast: <span className="text-white">{mobileDetails?.data?.actor},</span></p>
                            <p className="text-sm text-gray-400"><span className="text-white">{mobileDetails?.data?.actress}</span></p>
                            <p className="text-sm text-gray-400"><span className="text-white">Richard Cant</span></p>
                        </div>
                        <p className="text-sm text-gray-400">Crew: <span className="text-white">Alaya Pacheco, Ricky Aleman</span></p>
                        <p className="text-sm text-gray-400">Director: <span className="text-white">{mobileDetails?.data?.director}</span></p>
                        <p className="text-sm text-gray-400">Spoiler Warning: <span className="text-white">{mobileDetails?.data?.spoilerWarning}</span></p>
                    </div>

                    <h2 className="mt-8 text-xl font-semibold text-white">Recommended For You</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        {recommendedMovies.map((movie) => (
                            <motion.div
                                key={movie.id}
                                className="relative w-full h-64 bg-gray-900 rounded-lg overflow-hidden shadow-lg cursor-pointer"
                                initial="rest"
                                whileHover="hover"
                                animate="rest"
                                onClick={() => router.push(`/movies/${movie.id}`)}
                            >
                                <img
                                    src={movie.thumbnail}
                                    alt={movie.title}
                                    className="w-full h-40 object-cover"
                                />

                                <div className="p-2 h-16 flex items-center">
                                    <h3 className="text-white text-sm font-semibold line-clamp-2">{movie.title}</h3>
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
                                        <p className="text-sm text-gray-400 mt-1">{movie.releaseYear} ・ {movie.duration}</p>
                                        <p className="text-sm mt-2 text-gray-300">{movie.genre.genreName}</p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    <h2 className="mt-10 text-xl font-semibold">Add a review</h2>
                    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                        {/* Rating Component */}
                        <Rating
                            style={{ maxWidth: 180 }}
                            value={rating}
                            onChange={setRating}
                        />

                        {/* Review Textarea */}
                        <textarea
                            className="w-full mt-4 p-2 bg-gray-800 border border-gray-600 rounded"
                            rows={4}
                            placeholder="Your review *"
                            {...register("reviewText", { required: "Review is required" })}
                        />
                        <select
                            className="
                           mt-4 p-2

                            text-white border border-gray-500 rounded-lg shadow
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            transition-all duration-300
    "
                            {...register("tags")}
                        >
                            <option className="bg-slate-900 text-white" value="CLASSIC">CLASSIC</option>
                            <option className="bg-slate-900 text-white" value="UNDERRATED">UNDERRATED</option>
                        </select>
                        {errors.reviewText && <p className="text-red-500 text-sm mt-1">{errors.reviewText.message}</p>}

                        {/* Checkbox for saving info */}
                        <div className="mt-2">
                            <label className="text-sm">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={isChecked}
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                />
                                Save my name, email, and website in this browser for the next time I comment.
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!isChecked || !SingleUser?.data?.id || rating === 0}
                            className="mt-4 px-10 py-3 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:-translate-y-1 hover:shadow-blue-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {!SingleUser?.data?.id ? 'Loading user data...' : 'Submit'}
                        </button>
                    </form>

                    {/* Display Submitted Review */}
                    <div className="mt-10">
                        <h2 className="text-xl font-semibold mb-4">User Reviews</h2>
                        <div className="bg-gray-900 rounded-lg p-6 shadow-md flex flex-col md:flex-row gap-4">
                            <div className="flex-shrink-0">
                                <Image
                                    src={manvector} // Replace with actual avatar image path
                                    alt="Reviewer Avatar"
                                    width={60}
                                    height={60}
                                    className="rounded-full"
                                />
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-center gap-2">
                                    <Rating style={{ maxWidth: 80 }} value={5} readOnly />
                                    <p className="text-sm text-gray-400">September 20, 2024</p>
                                </div>
                                <p className="font-semibold text-white mt-1">Jane Doe</p>
                                <p className="mt-2 text-gray-300 text-sm">
                                    <span className="font-medium text-white">Spider-Man: Into the Spider-Verse</span> is a visually stunning,
                                    groundbreaking animated film that redefines superhero storytelling. Its unique animation style, compelling characters,
                                    and inventive multiverse concept make it a standout. With a mix of humor, heart, and action, it's a refreshing,
                                    must-see experience for both Spider-Man fans and newcomers.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default MovieDetails