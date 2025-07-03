"use client";
import { motion } from "framer-motion";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className=" rounded-2xl p-4 shadow-xl "
        >
          <div className=" mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Cookie Policy</h1>
            <p className="text-gray-400">Effective Date: 27/05/2025</p>
          </div>

          <div className="space-y-8 text-gray-300">
            <section className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
              <p className="mb-4 leading-relaxed">
                This Cookie Policy explains how Cineverse ("we", "us", "our") uses cookies and similar technologies 
                to recognize you when you visit our website (cineverse-liart.vercel.app). It explains what these 
                technologies are and why we use them, as well as your rights to control our use of them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg mr-3 text-sm">1</span>
                What are Cookies?
              </h2>
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                <p className="mb-4 text-gray-400">
                  Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
                  Cookies are widely used by website owners to make their websites work, or to work more efficiently, 
                  as well as to provide reporting information.
                </p>
                <p className="text-gray-400">
                  Cookies set by the website owner (in this case, Cineverse) are called "first-party cookies". 
                  Cookies set by parties other than the website owner are called "third-party cookies".
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg mr-3 text-sm">2</span>
                Types of Cookies We Use
              </h2>
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-3 flex items-center">
                      <span className="text-blue-400 mr-2">a.</span>
                      Essential Cookies
                    </h3>
                    <p className="text-gray-400 mb-2">
                      These cookies are strictly necessary for the website to function properly. They enable core functionality 
                      such as security, network management, and accessibility.
                    </p>
                    <ul className="list-none space-y-2 ml-4">
                      {[
                        "User authentication",
                        "Security features",
                        "Basic website functionality"
                      ].map((item, index) => (
                        <li key={index} className="flex items-center text-gray-300">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium text-white mb-3 flex items-center">
                      <span className="text-blue-400 mr-2">b.</span>
                      Performance Cookies
                    </h3>
                    <p className="text-gray-400 mb-2">
                      These cookies help us understand how visitors interact with our website by collecting and reporting 
                      information anonymously.
                    </p>
                    <ul className="list-none space-y-2 ml-4">
                      {[
                        "Page load times",
                        "Navigation patterns",
                        "Error tracking"
                      ].map((item, index) => (
                        <li key={index} className="flex items-center text-gray-300">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium text-white mb-3 flex items-center">
                      <span className="text-blue-400 mr-2">c.</span>
                      Functionality Cookies
                    </h3>
                    <p className="text-gray-400 mb-2">
                      These cookies enable enhanced functionality and personalization, such as remembering your preferences.
                    </p>
                    <ul className="list-none space-y-2 ml-4">
                      {[
                        "Language preferences",
                        "User preferences",
                        "Customized content"
                      ].map((item, index) => (
                        <li key={index} className="flex items-center text-gray-300">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg mr-3 text-sm">3</span>
                Third-Party Cookies
              </h2>
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                <p className="mb-4 text-gray-400">
                  In addition to our own cookies, we may also use various third-party cookies to report usage statistics 
                  of the website, deliver advertisements on and through the website, and so on.
                </p>
                <ul className="list-none space-y-2">
                  {[
                    "Google Analytics for website usage analysis",
                    "Payment processing services",
                    "Social media integration"
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
                How to Control Cookies
              </h2>
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                <p className="mb-4 text-gray-400">
                  You can control and/or delete cookies as you wish. You can delete all cookies that are already on your 
                  computer and you can set most browsers to prevent them from being placed.
                </p>
                <ul className="list-none space-y-2">
                  {[
                    "Browser settings to manage cookies",
                    "Opt-out options for third-party cookies",
                    "Cookie consent management"
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
                Updates to This Policy
              </h2>
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                <p className="mb-4 text-gray-400">
                  We may update this Cookie Policy from time to time in order to reflect, for example, changes to the 
                  cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this 
                  Cookie Policy regularly to stay informed about our use of cookies and related technologies.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg mr-3 text-sm">6</span>
                Contact Us
              </h2>
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                <p className="mb-4 text-gray-400">If you have any questions about our use of cookies, please contact us:</p>
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

export default CookiePolicy; 