"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { z } from "zod";
import { useState } from "react";
import Link from "next/link";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { useCreateContactUsMutation } from "@/components/redux/features/contactUs/contactUsApi";

const contactSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const socialLinks = [
  {
    icon: <FaTwitter className="text-xl" />,
    name: "Twitter",
    url: "#",
    color:
      "bg-blue-400/10 hover:bg-blue-400/20 border-blue-400/20 text-blue-400 hover:text-blue-300",
  },
  {
    icon: <FaFacebookF className="text-xl" />,
    name: "Facebook",
    url: "#",
    color:
      "bg-indigo-400/10 hover:bg-indigo-400/20 border-indigo-400/20 text-indigo-400 hover:text-indigo-300",
  },
  {
    icon: <FaInstagram className="text-xl" />,
    name: "Instagram",
    url: "#",
    color:
      "bg-pink-400/10 hover:bg-pink-400/20 border-pink-400/20 text-pink-400 hover:text-pink-300",
  },
  {
    icon: <FaLinkedinIn className="text-xl" />,
    name: "LinkedIn",
    url: "#",
    color:
      "bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/20 text-blue-500 hover:text-blue-400",
  },
  {
    icon: <FaYoutube className="text-xl" />,
    name: "YouTube",
    url: "#",
    color:
      "bg-red-500/10 hover:bg-red-500/20 border-red-500/20 text-red-500 hover:text-red-400",
  },
];

const ContactUsManagement = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addContactUs, { data, error }] = useCreateContactUsMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Sending your message...");

    try {
      const res = await addContactUs(data);
      console.log(res);
      if ("error" in res && res.error) {
        const errorMessage =
          (res.error as any)?.data?.message || "An error occurred";
        toast.error(errorMessage, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
        reset();
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId, duration: 2000 });
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[#00031b] to-[#0a0b2a] py-32 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center text-white   mb-4 tracking-widest">
            CONTACT US
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-black/70 p-8 rounded-lg border-2 border-blue-400 shadow-xl backdrop-blur"
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">
              Get in Touch
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/10 rounded-full border border-blue-400/20">
                  <FiMail className="text-blue-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Email</h3>
                  <p className="text-gray-300">support@cineverse.com</p>
                  <p className="text-gray-300">business@cinevers.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/10 rounded-full border border-purple-400/20">
                  <FiPhone className="text-purple-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Phone</h3>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                  <p className="text-gray-300">Mon-Fri: 9am-5pm EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-500/10 rounded-full border border-indigo-400/20">
                  <FiMapPin className="text-indigo-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Location</h3>
                  <p className="text-gray-300">123 Cinema Street</p>
                  <p className="text-gray-300">Los Angeles, CA</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-white mb-4">Follow Us</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    className={`p-3 rounded-full border ${social.color} transition-all hover:scale-105`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-black/70 p-8 rounded-lg border-2 border-purple-400 shadow-xl backdrop-blur"
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-white mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  {...register("fullName")}
                  className={`w-full px-4 py-3 bg-gray-800 text-white rounded-lg border ${
                    errors.fullName ? "border-red-500" : "border-gray-700"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.fullName.message as string}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-white mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={`w-full px-4 py-3 bg-gray-800 text-white rounded-lg border ${
                    errors.email ? "border-red-500" : "border-gray-700"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.email.message as string}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-white mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  {...register("subject")}
                  className={`w-full px-4 py-3 bg-gray-800 text-white rounded-lg border ${
                    errors.subject ? "border-red-500" : "border-gray-700"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.subject.message as string}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-white mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register("message")}
                  className={`w-full px-4 py-3 bg-gray-800 text-white rounded-lg border ${
                    errors.message ? "border-red-500" : "border-gray-700"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.message.message as string}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3.5 text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg"
              >
                {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactUsManagement;
