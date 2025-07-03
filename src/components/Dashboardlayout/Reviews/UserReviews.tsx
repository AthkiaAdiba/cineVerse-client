"use client";

import React from 'react';
import { useAppSelector } from '@/components/redux/hooks';
import { selectCurrentToken } from '@/components/redux/features/auth/authSlice';
import { verifyToken } from '@/utils/verifyToken';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { useGetAllReviewQuery } from '@/components/redux/features/review/reviewApi';
import { formatDate } from '@/utils/FormateDate';

const UserReviews = () => {
  const token = useAppSelector(selectCurrentToken);
  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  const { data: reviews, isLoading } = useGetAllReviewQuery(undefined);
  // console.log(reviews);

  // Filter reviews by current user ID
  const userReviews = reviews?.data?.filter((review: any) => review.userId === user?.id);
  // console.log(userReviews);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gradient-to-br from-gray-0 to-gray-0 rounded-2xl shadow-lg border border-white/20 p-6 text-white animate-pulse">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/60" />
              <div className="flex-1 min-w-0 space-y-2">
                <div className="h-4 bg-white/30 rounded w-3/4" />
                <div className="h-3 bg-white/20 rounded w-1/2" />
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-4 h-4 rounded bg-white/30" />
                  <div className="w-8 h-3 rounded bg-white/20 ml-2" />
                </div>
              </div>
            </div>
            <div className="h-4 bg-white/30 rounded mb-2 w-full" />
            <div className="h-4 bg-white/20 rounded mb-4 w-5/6" />
            <div className="flex items-center justify-between border-t border-white/20 pt-4 mt-4 text-xs">
              <div className="h-3 bg-white/20 rounded w-1/3" />
              <div className="h-3 bg-white/20 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!userReviews?.length) {
    return (
      <div className="text-center py-8 md:py-12">
        <h3 className="text-lg md:text-xl text-gray-400">No reviews yet</h3>
        <p className="text-gray-500 mt-2 text-sm md:text-base">Start reviewing movies to see them here!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {userReviews.map((review: any) => (
        <div
          key={review.id}
          className="bg-gradient-to-br from-gray-0 to-gray-0 rounded-2xl shadow-lg border border-white/20 p-6 flex flex-col justify-between  text-white hover:shadow-2xl"
        >
          <div className="flex items-center gap-4 mb-4">
            <Link href={`/movies/${review?.content?.id}`} className="flex-shrink-0">
              <Image
                src={review?.content?.thumbnail}
                alt={review?.content?.title}
                width={64}
                height={64}
                className="rounded-full object-cover w-16 h-16 border-2 border-white/60 shadow-sm bg-white/20"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Link href={`/movies/${review?.content?.id}`} className="font-semibold text-white text-lg truncate">
                    {review?.content?.title}
                </Link>
              </div>
              <div className="flex items-center gap-2 text-sm text-indigo-100/80">
                <span>{review?.user?.name || 'User'}</span>
                <span className="mx-1">·</span>
                <span>{formatDate(review?.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(1)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round((review?.rating || 0) / 2) ? 'text-yellow-300 fill-yellow-300' : 'text-white/40'}`} />
                ))}
                <span className="text-xs text-indigo-100/80 ml-2">{review?.rating}/10</span>
              </div>
            </div>
          </div>
          <p className="text-white/90 text-base leading-relaxed truncate">{review?.reviewText}</p>
          <div className="flex items-center justify-between border-t border-white/20 pt-4 mt-4 text-xs text-indigo-100/80">
            <span>Email: {review?.user?.email || 'N/A'}</span>
            <span>Status: {review?.status || 'N/A'}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserReviews; 