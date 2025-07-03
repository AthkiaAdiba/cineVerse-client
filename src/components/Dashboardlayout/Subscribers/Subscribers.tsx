// components/NewsletterSubscribers.tsx
"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useGetAllSubscribersQuery } from "@/components/redux/features/subscribers/subscribersApi";

interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
}

const NewsletterSubscribers = () => {
  const {
    data: subscribersData,
    isLoading: subscribersLoading,
    error: subscribersError,
  } = useGetAllSubscribersQuery([]);

  const subscribers = subscribersData?.data || [];

  const displayError = subscribersError
    ? "An error occurred while fetching subscribers. Please try again later."
    : null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const SingleSubscriberSkeleton = () => {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6 flex items-center gap-3 animate-pulse">
        <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 h-12 w-12 flex-shrink-0"></div>{" "}
        <div className="flex-grow">
          <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>{" "}
          <div className="h-3 bg-white/10 rounded w-1/2"></div>{" "}
        </div>
      </div>
    );
  };

  const SubscribersListSkeleton = ({ count = 8 }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mx-auto">
      {Array.from({ length: count }).map((_, index) => (
        <SingleSubscriberSkeleton key={index} />
      ))}
    </div>
  );

  return (
    <motion.section
      className="py-5 "
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto" >
        <motion.h2
          className="text-xl md:text-4xl font-bold text-white mb-12 text-left"
          variants={itemVariants}
        >
          Our Newsletter Subscribers
        </motion.h2>

        {displayError && (
          <motion.div
            className="text-center text-red-500 text-lg"
            variants={itemVariants}
          >
            Error: {displayError}
          </motion.div>
        )}

        {subscribersLoading && !displayError && (
          <SubscribersListSkeleton count={12} /> // Show 12 skeletons
        )}

        {!subscribersLoading && !displayError && subscribers.length === 0 && (
          <motion.div
            className="text-center text-gray-400 text-lg"
            variants={itemVariants}
          >
            No subscribers yet. Be the first to join!
          </motion.div>
        )}

        {!subscribersLoading && !displayError && subscribers.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mx-auto"
            variants={containerVariants}
          >
            {subscribers.map((subscriber: Subscriber) => (
              <motion.div
                key={subscriber.id}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4 md:p-6 flex items-center gap-3 hover:border-purple-400/30 transition duration-300"
                variants={itemVariants}
              >
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                  <EnvelopeIcon className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-white text-[16px]  md:text-lg truncate font-semibold">
                    {subscriber.email}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Subscribed:
                    {new Date(subscriber?.createdAt).toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default NewsletterSubscribers;
