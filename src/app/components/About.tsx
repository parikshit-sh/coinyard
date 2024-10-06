import Image from "next/image";
import { motion } from "framer-motion";

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <section id="about" className="py-16 md:py-24 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-4">
        <motion.div className="flex flex-col md:flex-row items-center justify-between mb-20" {...fadeInUp}>
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Track and Trade with confidence on
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text"> our platform.</span>
            </h2>
            <p className="text-lg mb-8 text-gray-600 dark:text-gray-400">
              Stay ahead in the crypto world with TokenStats. Get real-time updates and expert market insights to guide your investments.
            </p>
            <motion.a
              href="#"
              className="inline-block px-8 py-3 rounded-full bg-blue-500 dark:bg-purple-600 text-white font-semibold hover:bg-blue-600 dark:hover:bg-purple-700 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Now
            </motion.a>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/images/about.png"
              width={700}
              height={700}
              alt="Crypto Trading Visualization"
              className="w-full h-auto"
            />
          </div>
        </motion.div>

        <motion.div className="flex flex-col md:flex-row-reverse items-center justify-between mb-20" {...fadeInUp}>
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">24/7</span> Access to Customer Support
            </h2>
            <p className="text-lg mb-8 text-gray-600 dark:text-gray-400">
              Our dedicated support team is available around the clock to assist you with any queries or issues. Whether you&apos;re a beginner or an expert, we&apos;re here to help.
            </p>
            <motion.a
              href="#"
              className="inline-block px-8 py-3 rounded-full bg-blue-500 dark:bg-purple-600 text-white font-semibold hover:bg-blue-600 dark:hover:bg-purple-700 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/images/24-7.png"
              width={700}
              height={700}
              alt="24/7 Support"
              className="w-full h-auto"
            />
          </div>
        </motion.div>

        <motion.div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto py-20" {...fadeInUp}>
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">Advanced</span> Analytics
          </h2>
          <p className="text-xl mb-10 text-gray-600 dark:text-gray-400 leading-relaxed">
            Gain deep insights into market trends with our advanced analytics tools. Make informed decisions based on real-time data and comprehensive market analysis.
          </p>
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Analytics
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
