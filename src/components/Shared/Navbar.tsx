"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  HomeModernIcon,
  FilmIcon,
  TvIcon,
  BookmarkIcon,
  ArrowRightEndOnRectangleIcon,
  QuestionMarkCircleIcon,
  Square2StackIcon,
  SparklesIcon,
  TrophyIcon,
  ClockIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Boxes,
  LucideLayoutDashboard,
  NewspaperIcon,
  StarIcon,
  TrendingUpIcon,
} from "lucide-react";

import Cookies from "js-cookie";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectCurrentToken, logout } from "../redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { cn } from "@/lib/utils";
import { useGetAllGenresQuery } from "../redux/features/genre/genreApi";
import Image from "next/image";

interface MenuItem {
  name: string;
  icon: any;
  color: string;
  description?: string;
  path: string;
}

const collection = [
  {
    name: "Trending Now",
    icon: TrendingUpIcon,
    color: "text-indigo-400",
    description: "Most popular movies this week",
    path: "/#trending-movies"
  },
  {
    name: "New Releases",
    icon: ClockIcon,
    color: "text-indigo-400",
    description: "Fresh content just added",
    path: "/#new-releases"
  },
  {
    name: "Editor's Picks",
    icon: StarIcon,
    color: "text-indigo-400",
    description: "Timeless cinematic treasures",
    path: "/#editors-picks"
  },
  {
    name: "Top Artists",
    icon: TrophyIcon,
    color: "text-indigo-400",
    description: "Critically acclaimed masterpieces",
    path: "/#top-artists"
  }
];

// Add genre icon mapping
const genreIconMap: { [key: string]: any } = {
  Action: FilmIcon,
  "Sci-Fi": FilmIcon,
  Thriller: FilmIcon,
  Anime: FilmIcon,
  Horror: FilmIcon,
  Adventure: FilmIcon,
  Comedy: FilmIcon,
  Family: FilmIcon,
  Drama: FilmIcon,
  Romance: FilmIcon,
  History: FilmIcon,
};

// Update the genre color mapping to use indigo color
const genreColorMap: { [key: string]: string } = {
  Action: "text-indigo-400",
  "Sci-Fi": "text-indigo-400",
  Thriller: "text-indigo-400",
  Anime: "text-indigo-400",
  Horror: "text-indigo-400",
  Adventure: "text-indigo-400",
  Comedy: "text-indigo-400",
  Family: "text-indigo-400",
  Drama: "text-indigo-400",
  Romance: "text-indigo-400",
  History: "text-indigo-400",
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useAppDispatch();

  const token = useAppSelector(selectCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }

  const { data: categories, isLoading } = useGetAllGenresQuery([]);
  console.log(categories);
  const movieCategories = categories?.data;

  const navLinks = [
    { name: "Home", path: "/", icon: HomeModernIcon },
    { name: "About", path: "/about", icon: QuestionMarkCircleIcon },
    {
      name: "Categories",
      path: "#",
      icon: Square2StackIcon,
      megaMenu: true,
    },
    { name: "Movies", path: "/movies", icon: FilmIcon },
    { name: "Upcoming", path: "/comingSoon", icon: SparklesIcon },
    { name: "Contact", path: "/contactUs", icon: ChatBubbleLeftRightIcon },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target as Node)
      ) {
        setIsMegaMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");

    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    router.push("/login");
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 768) {
        setIsScrolled(window.scrollY > 10);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
  }, [isOpen]);

  const mobileMenuVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "100%", transition: { duration: 0.3 } },
  };

  const navItemVariants = {
    hover: { scale: 1.05, color: "#818cf8" },
    rest: { scale: 1, color: "#e5e7eb" },
  };

  const megaMenuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    closed: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  };

  const categoryVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <nav
      className={cn(
        "fixed w-full z-[990]",
        isScrolled
          ? "backdrop-blur-md bg-[#101828]/90"
          : "bg-[#101828] md:bg-transparent",
        "transition-all duration-500"
      )}
    >
      <div className="container mx-auto px-4 ">
        <div className="flex items-center justify-between h-16 xl:h-20">
          <Link
            href="/"
            className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
          >
            <Image src="/logo (2).png" alt="logo" width={500} height={500} className="w-24 h-24 md:w-36 md:h-36 " />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ name, path, icon: Icon, megaMenu }) => (
              <div
                key={name}
                className="relative group"
                onMouseEnter={() => megaMenu && setIsMegaMenuOpen(true)}
                onMouseLeave={() => megaMenu && setIsMegaMenuOpen(false)}
                ref={megaMenu ? megaMenuRef : null}
              >
                <Link href={path}>
                  <motion.div
                    className="relative group"
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                  >
                    <motion.div
                      className="flex items-center gap-2 pb-2"
                      variants={navItemVariants}
                    >
                      <div className="p-1.5 rounded-lg bg-indigo-500/10">
                        <Icon
                          className={cn(
                            "w-5 h-5",
                            pathname === path
                              ? "text-indigo-400"
                              : "text-gray-200"
                          )}
                        />
                      </div>
                      <span
                        className={cn(
                          "font-bold text-lg",
                          pathname === path
                            ? "text-indigo-400"
                            : "text-gray-200",
                          megaMenu && "hover:text-indigo-400"
                        )}
                      >
                        {name}
                      </span>
                      {megaMenu && (
                        <ChevronDownIcon className="w-4 h-4 text-gray-200 group-hover:text-indigo-400 transition-colors" />
                      )}
                    </motion.div>
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-400"
                      initial={{ scaleX: pathname === path ? 1 : 0 }}
                      animate={{ scaleX: pathname === path ? 1 : 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </motion.div>
                </Link>

                {megaMenu && (
                  <AnimatePresence>
                    {isMegaMenuOpen && (
                      <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={megaMenuVariants}
                        className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 w-screen max-w-5xl bg-[#1e2433] backdrop-blur-xl border border-gray-700 rounded-xl shadow-2xl p-4 md:p-6"
                      >
                        {/* Invisible padding to prevent gap */}
                        <div className="absolute -top-4 left-0 w-full h-4" />

                        {/* Arrow pointing to Categories */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <div className="w-6 h-6 bg-[#1e2433] border-t border-l border-gray-700 transform rotate-45"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                          {/* Left Side - Categories */}
                          <div className="md:col-span-8">
                            <div className="flex items-center gap-2 mb-3 md:mb-4 border-b border-gray-700 pb-2">
                              <h3 className="text-lg md:text-xl font-bold text-white">
                                Browse Categories
                              </h3>
                              <ChevronRightIcon className="w-5 h-5 text-white" />
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3">
                              {isLoading ? (
                                // Skeleton loading for genres
                                Array.from({ length: 10 }).map((_, index) => (
                                  <div
                                    key={index}
                                    className="flex flex-col items-center p-2 md:p-3 rounded-lg"
                                  >
                                    <div className="w-12 h-12 rounded-full bg-gray-700/50 animate-pulse mb-2" />
                                    <div className="h-4 w-20 bg-gray-700/50 rounded animate-pulse" />
                                  </div>
                                ))
                              ) : (
                                movieCategories?.map((item: any) => {
                                  const Icon = genreIconMap[item.genreName] || FilmIcon;
                                  return (
                                    <motion.div
                                      key={item.id}
                                      whileHover={{ scale: 1.05 }}
                                      className="group cursor-pointer"
                                    >
                                      <Link
                                        href={`/movies?genre=${encodeURIComponent(item.genreName)}`}
                                        onClick={() => setIsMegaMenuOpen(false)}
                                      >
                                        <div className="flex flex-col items-center p-2 md:p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
                                          <div className="p-2 md:p-3 rounded-full bg-indigo-500/10">
                                            <Icon className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" />
                                          </div>
                                          <h4 className="font-medium text-gray-200  transition-colors text-center text-sm md:text-base mt-1">
                                            {item.genreName}
                                          </h4>
                                        </div>
                                      </Link>
                                    </motion.div>
                                  );
                                })
                              )}
                            </div>
                          </div>

                          {/* Right Side - Collections */}
                          <div className="md:col-span-4">
                            <div className="flex items-center gap-2 mb-3 md:mb-4 border-b border-gray-700 pb-2">
                              <h3 className="text-lg md:text-xl font-bold text-white">
                                Collections
                              </h3>
                              <ChevronRightIcon className="w-5 h-5 text-white" />
                            </div>
                            <div className="grid grid-cols-1 gap-2 md:gap-3">
                              {collection.map((item, index) => (
                                <motion.div
                                  key={index}
                                  whileHover={{ scale: 1.02 }}
                                  className="group cursor-pointer"
                                >
                                  <Link
                                    href={item.path}
                                    onClick={() => setIsMegaMenuOpen(false)}
                                  >
                                    <div className="flex items-center gap-3 p-2 md:p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
                                      <div className="p-2 md:p-3 rounded-full bg-indigo-500/10">
                                        <item.icon className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" />
                                      </div>
                                      <div>
                                        <h4 className="font-medium text-gray-200 group-hover:text-indigo-400 transition-colors text-sm md:text-base">
                                          {item.name}
                                        </h4>
                                        <p className="text-xs md:text-sm text-gray-300 mt-0.5">
                                          {item.description}
                                        </p>
                                      </div>
                                    </div>
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6">
            {user && (
              <div ref={dropdownRef} className="relative">
                <button
                  className="p-2 cursor-pointer translate-x-4 md:translate-x-0 text-gray-300  hover:text-indigo-400 transition-colors"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <UserCircleIcon className="w-7 h-7 md:w-10 md:h-10" />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      className="absolute right-0 top-full mt-2 w-48 md:w-52 h-auto bg-gray-800 rounded-lg shadow-2xl py-2 border border-gray-700"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <div className="px-4 py-2 border-b border-gray-700">
                        <p className="text-sm md:text-base  text-gray-200 truncate">
                          {user?.email}
                        </p>
                      </div>

                      {user.role === "ADMIN" ? (
                        <Link
                          href="/dashboard"
                          className="flex text-sm md:text-base items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <LucideLayoutDashboard className="w-5 h-5" />
                          Dashboard
                        </Link>
                      ) : (
                        <Link
                          href="/dashboard/profile"
                          className="flex text-sm md:text-base items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <LucideLayoutDashboard className="w-5 h-5" />
                          Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex text-sm md:text-base cursor-pointer items-center gap-2 w-full px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
                      >
                        <ArrowRightEndOnRectangleIcon className="w-5 h-5" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {!user && (
              <Link href="/login">
                <motion.button className=" px-4  md:px-4 md:py-2 py-1.5 cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all">
                  Sign In
                </motion.button>
              </Link>
            )}

            <motion.button
              className="md:hidden p-2 text-gray-300 hover:text-indigo-400 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? (
                <XMarkIcon className="w-7 h-7" />
              ) : (
                <Bars3Icon className="w-7 h-7" />
              )}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-[1000]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    className="fixed inset-0 z-[1000]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div
                      className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                      onClick={() => setIsOpen(false)}
                    />

                    <motion.div
                      className="absolute right-0 top-0 h-full w-[75%] bg-gray-900 shadow-2xl border-l border-gray-800 overflow-y-auto"
                      variants={mobileMenuVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      <div className="h-full flex flex-col p-6">
                        <div className="flex justify-between items-center mb-8">
                          <span className="text-xl font-bold text-indigo-400">
                            <Link
                              href="/"
                              className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
                            >
                              <Image src="/logo (2).png" alt="logo" width={500} height={500} className="w-24 h-24 md:w-36 md:h-36 " />
                            </Link>

                          </span>
                          <button
                            className="p-2 text-gray-400 hover:text-indigo-400 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <XMarkIcon className="w-6 h-6" />
                          </button>
                        </div>

                        <div className="flex flex-col gap-4">
                          {navLinks.filter(link => !link.megaMenu).map(({ name, path, icon: Icon }) => (
                            <Link
                              key={name}
                              href={path}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              <div className="p-1.5 rounded-lg bg-indigo-500/10">
                                <Icon
                                  className={`w-6 h-6 ${pathname === path
                                      ? "text-indigo-400"
                                      : "text-gray-200"
                                    }`}
                                />
                              </div>
                              <span
                                className={`${pathname === path
                                    ? "text-indigo-400"
                                    : "text-gray-200"
                                  } font-medium`}
                              >
                                {name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
