"use client";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className=" rounded-2xl shadow-xl "
        >
          <div className=" mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
            <p className="text-gray-400">Effective Date: 27/05/2025</p>
          </div>

          <div className="space-y-8 text-gray-300">
            <section className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
              <p className="mb-4 leading-relaxed">
                Welcome to Cineverse ("we", "our", "us"). We value your trust and are committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website: 
                cineverse-liart.vercel.app.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg mr-3 text-sm">1</span>
                Information We Collect
              </h2>
              <p className="mb-4 text-gray-400">When you use our website, we may collect the following types of information:</p>
              
              <div className="space-y-6">
                <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                  <h3 className="text-xl font-medium text-white mb-3 flex items-center">
                    <span className="text-blue-400 mr-2">a.</span>
                    Personal Information
                  </h3>
                  <ul className="list-none space-y-2 ml-4">
                    {["Full Name", "Email Address", "Profile Photo (if applicable)", "Account Information (username, password)"].map((item, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                  <h3 className="text-xl font-medium text-white mb-3 flex items-center">
                    <span className="text-blue-400 mr-2">b.</span>
                    Usage Information
                  </h3>
                  <ul className="list-none space-y-2 ml-4">
                    {[
                      "IP Address",
                      "Browser Type and Device Information",
                      "Pages Visited",
                      "Date and Time of Access",
                      "Duration of Site Visits"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                  <h3 className="text-xl font-medium text-white mb-3 flex items-center">
                    <span className="text-blue-400 mr-2">c.</span>
                    User Content
                  </h3>
                  <ul className="list-none space-y-2 ml-4">
                    {["Movie Reviews", "Comments"].map((item, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg mr-3 text-sm">2</span>
                How We Use Your Information
              </h2>
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                <p className="mb-4 text-gray-400">We use the information collected for the following purposes:</p>
                <ul className="list-none space-y-2">
                  {[
                    "To create and manage user accounts",
                    "To display user-generated reviews and comments",
                    "To improve website features and content",
                    "To monitor and prevent unauthorized use",
                    "To send notifications or updates (only if you opt-in)"
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
                Cookies and Tracking Technologies
              </h2>
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                <p className="mb-4 text-gray-400">
                  We use cookies and similar technologies to enhance your browsing experience. These help us:
                </p>
                <ul className="list-none space-y-2">
                  {[
                    "Remember your login and preferences",
                    "Understand site usage and traffic patterns",
                    "Offer personalized content"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-gray-400">
                  You can choose to disable cookies through your browser settings. However, doing so may affect the functionality of certain features.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg mr-3 text-sm">4</span>
                Sharing of Information
              </h2>
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                <p className="mb-4 text-gray-400">We do not sell or rent your personal information. We may share limited data in the following situations:</p>
                <ul className="list-none space-y-2">
                  {[
                    "With trusted third-party service providers (e.g., hosting, analytics)",
                    "When required by law or to respond to legal requests",
                    "To protect the rights, property, or safety of our platform or users"
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
                Data Security
              </h2>
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                <p className="mb-4 text-gray-400">
                  We take your data seriously and implement appropriate security measures. However, no system is 100% secure. 
                  Please use the site responsibly and contact us if you suspect any security issues.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg mr-3 text-sm">6</span>
                Your Rights
              </h2>
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                <p className="mb-4 text-gray-400">Depending on your jurisdiction, you may have the right to:</p>
                <ul className="list-none space-y-2">
                  {[
                    "Request access to your personal data",
                    "Correct or update inaccurate data",
                    "Request deletion of your account and data",
                    "Withdraw consent where applicable"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-gray-400">
                  To exercise your rights, please contact us at: support@cineverse.com
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg mr-3 text-sm">7</span>
                Children's Privacy
              </h2>
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                <p className="mb-4 text-gray-400">
                  This website is not intended for children under 13 years of age. We do not knowingly collect information from children. 
                  If we learn that we have collected such information, we will delete it immediately.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg mr-3 text-sm">8</span>
                Third-Party Links
              </h2>
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                <p className="mb-4 text-gray-400">
                  Our website may contain links to third-party websites. We are not responsible for their privacy policies. 
                  We encourage you to read the privacy policy of any external website you visit.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg mr-3 text-sm">9</span>
                Changes to This Policy
              </h2>
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                <p className="mb-4 text-gray-400">
                  We may update this Privacy Policy from time to time. All changes will be posted here with a revised effective date. 
                  Please check this page periodically to stay informed.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg mr-3 text-sm">10</span>
                Contact Us
              </h2>
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                <p className="mb-4 text-gray-400">If you have any questions, feedback, or concerns regarding this Privacy Policy, feel free to reach out to us:</p>
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

export default PrivacyPolicy; 