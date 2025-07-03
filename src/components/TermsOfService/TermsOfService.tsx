"use client";
import { motion } from "framer-motion";

const TermsOfService = () => {
  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className=" rounded-2xl p-4 shadow-xl "
        >
          <div className=" pb-6 mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
            <p className="text-gray-400">Effective Date: 27/05/2025</p>
          </div>

          <div className="space-y-8 text-gray-300">
            <section className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
              <p className="mb-4 leading-relaxed">
                Welcome to Cineverse. By accessing or using our website (cineverse-liart.vercel.app), 
                you agree to be bound by these Terms of Service. Please read these terms carefully before using our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg mr-3 text-sm">1</span>
                Account Registration and Security
              </h2>
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                <ul className="list-none space-y-2">
                  {[
                    "You must be at least 13 years old to create an account",
                    "You are responsible for maintaining the confidentiality of your account credentials",
                    "You must provide accurate and complete information during registration",
                    "You agree to notify us immediately of any unauthorized access to your account",
                    "We reserve the right to suspend or terminate accounts that violate our terms"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg mr-3 text-sm">2</span>
                Content and Intellectual Property
              </h2>
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                <ul className="list-none space-y-2">
                  {[
                    "All content on our platform is protected by copyright and other intellectual property rights",
                    "You may not reproduce, distribute, or create derivative works without permission",
                    "User-generated content remains your property, but you grant us a license to use it",
                    "We reserve the right to remove content that violates our terms",
                    "You may not use our content for commercial purposes without explicit permission"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg mr-3 text-sm">3</span>
                User Conduct and Responsibilities
              </h2>
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                <p className="mb-4 text-gray-400">You agree not to:</p>
                <ul className="list-none space-y-2">
                  {[
                    "Post or transmit any unlawful, harmful, threatening, or abusive content",
                    "Impersonate others or provide false information",
                    "Interfere with the proper functioning of the website",
                    "Attempt to gain unauthorized access to any part of the service",
                    "Use automated systems or bots to access the service without permission"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg mr-3 text-sm">4</span>
                Payment and Subscription Terms
              </h2>
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                <ul className="list-none space-y-2">
                  {[
                    "All payments are processed securely through our payment providers",
                    "Prices are subject to change with notice",
                    "Refunds are handled according to our refund policy",
                    "Subscription services will auto-renew unless cancelled",
                    "We reserve the right to modify our pricing structure"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg mr-3 text-sm">5</span>
                Limitation of Liability
              </h2>
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                <p className="mb-4 text-gray-400">
                  To the maximum extent permitted by law, Cineverse shall not be liable for any indirect, 
                  incidental, special, consequential, or punitive damages resulting from your use of or 
                  inability to use the service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg mr-3 text-sm">6</span>
                Termination
              </h2>
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                <p className="mb-4 text-gray-400">
                  We reserve the right to terminate or suspend your access to our service at any time, 
                  without notice, for any reason, including violation of these Terms of Service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg mr-3 text-sm">7</span>
                Changes to Terms
              </h2>
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                <p className="mb-4 text-gray-400">
                  We may modify these terms at any time. We will notify users of any material changes. 
                  Continued use of the service after such modifications constitutes acceptance of the new terms.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg mr-3 text-sm">8</span>
                Governing Law
              </h2>
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                <p className="mb-4 text-gray-400">
                  These terms shall be governed by and construed in accordance with the laws of the jurisdiction 
                  in which Cineverse operates, without regard to its conflict of law provisions.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg mr-3 text-sm">9</span>
                Contact Information
              </h2>
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                <p className="mb-4 text-gray-400">For any questions regarding these Terms of Service, please contact us:</p>
                <ul className="list-none space-y-2">
                  <li className="flex items-center text-gray-300">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                    Email: support@cineverse.com
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                    Website: cineverse-liart.vercel.app
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService; 