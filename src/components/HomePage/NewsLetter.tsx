"use client";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useCreateSubscriberMutation } from "../redux/features/subscribers/subscribersApi";
import { useState } from "react";
import { toast } from "sonner";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [addSubscribe, { isLoading }] = useCreateSubscriberMutation();

  const faqVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const handleSubscribe = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const res = await addSubscribe({ email });

      if ("error" in res) {
        const errorMessage =
          (typeof res.error === "object" &&
            "data" in res.error &&
            (res.error as any).data?.message) ||
          "Something went wrong";
        toast.error(errorMessage);
      } else {
        setEmail("");
        toast.success(res?.data?.message || "Successfully subscribed!");
      }
    } catch (error: any) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <motion.div
        className="py-12 md:py-16 lg:py-20 text-center container mx-auto px-2"
        variants={faqVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-500/20 rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-xl border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <div className="absolute -top-32 -left-32 w-48 sm:w-64 h-48 sm:h-64 bg-purple-500/30 rounded-full blur-[100px]" />
            <div className="absolute -bottom-32 -right-32 w-48 sm:w-64 h-48 sm:h-64 bg-blue-500/30 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 space-y-4 sm:space-y-6">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
              What's New & What's Next
            </h3>

            <p className="text-gray-300/90 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Join our elite newsletter for exclusive streaming insights, early
              access to new features, and members-only content straight to your
              inbox.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 sm:px-6 py-3 sm:py-3.5 focus:outline-none rounded-xl bg-black/30 border border-white/20 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-500/20 backdrop-blur-sm text-white placeholder-gray-400 transition-all text-sm sm:text-base"
              />
              <button
                onClick={handleSubscribe}
                disabled={isLoading}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold text-white transition-transform duration-300 flex items-center justify-center gap-2 text-sm sm:text-base hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                Subscribe
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </motion.div>

            <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-4 sm:gap-6">
              {["Weekly Updates", "Exclusive Content", "No Spam"].map(
                (text) => (
                  <motion.div
                    key={text}
                    className="flex items-center gap-2 sm:gap-3"
                  >
                    <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7a42da] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#7841d7]"></span>
                    </span>
                    <span className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400 text-xs sm:text-sm uppercase tracking-wider">
                      {text}
                    </span>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NewsLetter;
