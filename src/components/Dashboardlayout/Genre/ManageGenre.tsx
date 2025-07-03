"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { MdDeleteOutline } from "react-icons/md";
import { FaPen } from "react-icons/fa6";
import { useState } from "react";
import {
  useCreateGenreMutation,
  useDeleteGenreMutation,
  useGetAllGenresQuery,
} from "@/components/redux/features/genre/genreApi";
import { TGenre } from "@/components/types/genre";
import LoadingSpinner from "@/components/ui/loading-spinner";
import UpdateGenreModal from "@/components/modals/UpdateGenreModal";

export interface GenreName {
  id: string;
  genreName: string;
}

const ManageGenre = () => {
  const { register, handleSubmit, reset } = useForm<GenreName>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [genreToDelete, setGenreToDelete] = useState<GenreName | null>(null);
  const [isUpdateGenreModalOpen, setUpdateGenreModalOpen] = useState(false);
  const [genre, setGenre] = useState<{} | null>(null);
  const { data: genres, isLoading } = useGetAllGenresQuery(undefined);
  const [addGenres] = useCreateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const genresData = genres?.data;

  const onSubmit: SubmitHandler<GenreName> = async (data) => {
    const toastId = toast.loading("Adding Genre....", { duration: 2000 });

    try {
      const res = await addGenres({ genreName: data.genreName });
      if ("error" in res && res.error) {
        const errorMessage =
          (res.error as any)?.data?.message || "An error occurred";
        toast.error(errorMessage, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId });
    }

    setIsModalOpen(false);
    reset();
  };

  const handleGenreDelete = async (genreId: string) => {
    const toastId = toast.loading("Deleting Genre...", { duration: 2000 });

    try {
      const res = await deleteGenre(genreId);
      if ("error" in res && res.error) {
        const errorMessage =
          (res.error as any)?.data?.message || "An error occurred";
        toast.error(errorMessage, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
      setIsDeleteModalOpen(false);
      setGenreToDelete(null);
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-[#00031b] ">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center md:pt-4 mb-8">
          <h1 className="lg:text-3xl text-2xl font-bold  text-white">
            Genre
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg transition-all"
          >
            Add Genre
          </button>
        </div>

        <div className="flex  mb-4 justify-between items-center border border-[#1a2d6d] p-4 rounded-lg  bg-[#000a3a] transition-colors">
          <h1 className=" text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Name
          </h1>
          <h1 className=" text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Action
          </h1>
        </div>
        {/* Genres List */}
        {isLoading ? (
          <div className="text-center text-white">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="space-y-4">
            {genresData?.map((genre: TGenre) => (
              <motion.div
                key={genre.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex  justify-between items-center border border-[#1a2d6d] p-6 rounded-lg hover:bg-[#000a3a]/50 transition-colors"
              >
                <div>
                  <h2 className="text-lg font-semibold">{genre.genreName}</h2>
                </div>
                <div className="flex gap-4 mt-2 sm:mt-0">
                  <MdDeleteOutline
                    className="cursor-pointer w-6 h-6 hover:text-red-500 transition-colors"
                    onClick={() => {
                      setGenreToDelete(genre);
                      setIsDeleteModalOpen(true);
                    }}
                  />
                  <FaPen
                    className="cursor-pointer w-5 h-5 hover:text-blue-500 transition-colors"
                    onClick={() => {
                      setUpdateGenreModalOpen(true);
                      setGenre(genre);
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Add Genre Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 mx-4 backdrop-blur-lg z-50"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-[#000a3a] border border-[#1a2d6d] rounded-xl overflow-hidden"
              >
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="p-8 max-h-[90vh] overflow-y-auto"
                >
                  <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Add New Genre
                  </h2>
                  <input
                    {...register("genreName", { required: true })}
                    placeholder="Genre Name"
                    className="w-full bg-[#00031b] px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                  <div className="mt-6 flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        reset();
                      }}
                      className="px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      Add Genre
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Update Genre Modal */}
        <UpdateGenreModal
          isUpdateGenreModalOpen={isUpdateGenreModalOpen}
          setUpdateGenreModalOpen={setUpdateGenreModalOpen}
          genre={genre}
        />

        {/* Delete Genre Modal */}
        <AnimatePresence>
          {isDeleteModalOpen && genreToDelete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-lg z-50"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-[#000a3a] border border-[#1a2d6d] rounded-xl overflow-hidden p-6"
              >
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Delete Genre
                </h2>
                <p className="text-gray-300 mb-6">
                  Are you sure you want to delete the genre "
                  {genreToDelete.genreName}"? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setIsDeleteModalOpen(false);
                      setGenreToDelete(null);
                    }}
                    className="px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleGenreDelete(genreToDelete.id)}
                    className="hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ManageGenre;
