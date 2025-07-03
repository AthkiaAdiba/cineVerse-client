"use client";
import { motion } from 'framer-motion';
import { 
   
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 }
    })
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 xl:px-12 py-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={footerVariants}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {/* About Section */}
          <motion.div 
            variants={itemVariants}
            custom={0}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-indigo-400">CineVerse</h3>
            <p className="text-gray-400">
              Your ultimate destination for premium streaming experiences. 
              Discover thousands of movies and TV show's in stunning quality.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            variants={itemVariants}
            custom={1}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-gray-200">Quick Links</h4>
            <ul className="space-y-2">
              {['Movies', 'Upcoming', 'About', 'Contact'].map((item, i) => (
                <li key={item}>
                  <Link 
                    href={item === 'Movies' ? '/movies' : item === 'Upcoming' ? '/comingSoon' : item === 'About' ? '/about' : '/contactUs'} 
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div 
            variants={itemVariants}
            custom={2}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-gray-200">Legal</h4>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'Privacy Policy' ? '/privacy-policy' : item === 'Terms of Service' ? '/terms-of-service' : '/cookie-policy'} 
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div 
            variants={itemVariants}
            custom={3}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-gray-200">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <EnvelopeIcon className="w-5 h-5 text-indigo-400" />
                <span className="text-gray-400">support@cineverse.com</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="w-5 h-5 text-indigo-400" />
                <span className="text-gray-400">+8801717171717</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-5 h-5 text-indigo-400" />
                <span className="text-gray-400">Dhaka, Bangladesh</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Social & Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 "
        >
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            {/* <div className="flex space-x-6">
              {[, TwitterIcon, InstagramIcon].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div> */}
            <p className="text-gray-400 text-center pt-9">
              © {new Date().getFullYear()} CineVerse. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;