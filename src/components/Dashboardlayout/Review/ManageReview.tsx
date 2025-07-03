"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGetAllReviewQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} from "@/components/redux/features/review/reviewApi";
import { MdDeleteOutline } from "react-icons/md";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { toast } from "sonner";
import { Review, ReviewStatus } from "@/components/types/review";

const ManageReview = () => {
  const { data: reviews, isLoading, error } = useGetAllReviewQuery(undefined);
  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleStatusChange = async (
    reviewId: string,
    newStatus: ReviewStatus
  ) => {
    try {
      await updateReview({
        id: reviewId,
        status: newStatus,
      }).unwrap();
      toast.success("Review status updated successfully");
    } catch (error: any) {
      // Handle specific error message from API
      const errorMessage =
        error?.data?.message || "Failed to update review status";
      toast.error(errorMessage);
      // console.error("Error updating review:", error);
    }
  };

  const handleDelete = async (reviewId: string) => {
    try {
      await deleteReview(reviewId).unwrap();
      toast.success("Review deleted successfully");
      setIsDeleteModalOpen(false);
      setReviewToDelete(null);
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Failed to delete review";
      toast.error(errorMessage);
      // console.error("Error deleting review:", error);
    }
  };

  const openDeleteModal = (review: Review) => {
    setReviewToDelete(review);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setReviewToDelete(null);
  };

  const getStatusColor = (status: ReviewStatus) => {
    switch (status) {
      case "PUBLISHED":
        return "border-green-500/50 text-green-400";
      case "PENDING":
        return "border-yellow-500/50 text-yellow-400";
      default:
        return "border-gray-500/50 text-gray-400";
    }
  };

  const renderStatusOptions = (currentStatus: ReviewStatus) => {
    return (
      <>
        <option value="PUBLISHED" className="bg-[#000a3a] text-green-400">
          Published
        </option>
        <option value="PENDING" className="bg-[#000a3a] text-yellow-400">
          Pending
        </option>
      </>
    );
  };

  // Handle error state
  if (error) {
    // console.error("Error fetching reviews:", error);
    toast.error("Failed to fetch reviews. Please try again later.");
    return (
      <div className="min-h-screen bg-[#00031b] p-2 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">
            Error Loading Reviews
          </h2>
          <p className="text-gray-400">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  const reviewsList = reviews?.data || [];

  // Calculate pagination
  const totalPages = Math.ceil(reviewsList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReviews = reviewsList.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen bg-[#00031b]">
      <div className="max-w-full mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="lg:text-3xl text-xl font-bold text-white">
            Review Management
          </h1>
        </div>

        {/* Review Table */}
        {isLoading ? (
          <p className="text-white text-5xl font-bold text-center">
            <LoadingSpinner />
          </p>
        ) : reviewsList.length > 0 ? (
          <>
            <div className="rounded-xl border border-[#1a2d6d] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#000a3a]">
                    <tr>
                      <th className="px-6 py-4 text-left">User</th>
                      <th className="px-6 py-4 text-left">Content</th>
                      <th className="px-6 py-4 text-left">Review</th>
                      <th className="px-6 py-4 text-left">Rating</th>
                      <th className="px-6 py-4 text-left">Status</th>
                      <th className="px-6 py-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentReviews.map((review: Review) => (
                      <motion.tr
                        key={review.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-t border-[#1a2d6d] hover:bg-[#000a3a]/50 transition-colors"
                      >
                        <td className="px-2 md:px-6 py-4">
                          <div>
                            <p className="font-medium">{review.user.name}</p>
                            <p className="text-sm text-gray-400">
                              {review.user.email}
                            </p>
                          </div>
                        </td>
                        <td className="px-2 md:px-6 py-4">{review.content.title?.length > 20 ? review.content.title.slice(0, 20) + "..." : review.content.title}</td>
                        <td className="px-6 py-4 max-w-md truncate">
                          {review.reviewText?.length > 25 ? review.reviewText.slice(0, 25) + "..." : review.reviewText}
                        </td>
                        <td className="px-2 md:px-6 py-4">
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400 text-xl">★</span>
                            <span>{review.rating}/10</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {review.status === "PENDING" ? (
                            <select
                              value={review.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  review.id,
                                  e.target.value as ReviewStatus
                                )
                              }
                              className={`px-3 py-1 rounded-full text-sm bg-transparent border ${getStatusColor(
                                review.status
                              )} focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                            >
                              {renderStatusOptions(review.status)}
                            </select>
                          ) : (
                            <p
                              className={`text-sm rounded-full bg-transparent border ${getStatusColor(
                                review.status
                              )} focus:outline-none focus:ring-2 w-fit px-3 py-1 text-center focus:ring-blue-500/50`}
                            >
                              PUBLISHED
                            </p>
                          )}
                        </td>
                        <td className="px-6 py-4 text-2xl">
                          <MdDeleteOutline
                            className="cursor-pointer hover:text-red-500 transition-colors"
                            onClick={() => openDeleteModal(review)}
                          />
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-[#000a3a] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#001366] transition-colors"
              >
                Previous
              </button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 rounded-lg ${currentPage === index + 1
                        ? "bg-gradient-to-r from-blue-500 to-purple-400"
                        : "bg-[#000a3a] text-white hover:bg-[#001366]"
                      } transition-colors`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-[#000a3a] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#001366] transition-colors"
              >
                Next
              </button>
            </div>
          </>
        ) : <div className="text-center py-8">
          <p className="text-gray-400 text-lg">No pending reviews found</p>
        </div>}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {isDeleteModalOpen && reviewToDelete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-[#000a3a] p-6 rounded-xl border border-[#1a2d6d] max-w-md w-full mx-4"
              >
                <motion.h3
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl font-semibold text-white mb-4"
                >
                  Confirm Delete
                </motion.h3>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-300 mb-6"
                >
                  Are you sure you want to delete this review? This action
                  cannot be undone.
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-end gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeDeleteModal}
                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(reviewToDelete.id)}
                    className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    Delete
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ManageReview;
