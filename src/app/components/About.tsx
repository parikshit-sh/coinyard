import Image from "next/image";
import { delay, motion } from "framer-motion";

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <section id="about" className="py-16 md:py-24 text-gray-800 dark:text-gray-200 px-6">
      <div className="container mx-auto px-4">
        <motion.div className="flex flex-col md:flex-row 
        items-center justify-between mb-20 space-y-10 md:space-y-0
         md:space-x-10 max-w-6xl"
         initial={{ opacity: 0, y: 50 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8 }}>
          <div className="md:w-1/2">
            <h2 className="text-3xl 
            md:text-4xl lg:text-5xl font-bold mb-6
             leading-tight text-center md:text-left">
              Track and Trade with confidence on
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text"> our platform.</span>
            </h2>
            <p className="text-sm
            lg:text-lg mb-8 text-gray-600 dark:text-gray-400 
            leading-relaxed text-left">
              Stay ahead in the crypto world with TokenStats. Get real-time updates and expert market insights to guide your investments.
            </p>
            <motion.a
              href="#"
              className="bg-[#9d00FF]  text-white text-center 
              h-full py-2 px-4 rounded-lg
               flex justify-center max-w-sm text-sm md:text-lg 
             transition duration-300
             min-w-11 mx-auto hover:shadow-lg  hover:shadow-[#9d00ff83]"
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

        <motion.div className="flex flex-col 
        md:flex-row-reverse items-center 
        justify-between mb-20 space-y-10 md:space-y-0 
        md:space-x-10 max-w-6xl" {...fadeInUp}>
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-500 to-purple-600 text-transparent bg-clip-text">24/7</span> Access to Customer Support
            </h2>
            <p className="text-base lg:text-lg mb-8 text-gray-600 dark:text-gray-400 leading-relaxed">
              Our dedicated support team is available around the clock to assist you with any queries or issues. Whether you&apos;re a beginner or an expert, we&apos;re here to help.
            </p>
            <motion.a
              href="#"
              className="bg-[#9d00FF]  text-white text-center 
              h-full py-2 px-4 rounded-lg
               flex justify-center max-w-sm text-sm md:text-lg 
             transition duration-300
            min-w-11 mx-auto  hover:shadow-lg  hover:shadow-[#9d00ff83]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </div>
          <div className="md:w-[35vw]">
            <Image
              src="/images/24-7.png"
              width={700}
              height={700}
              alt="24/7 Support"
              className="w-full h-auto"
            />
          </div>
        </motion.div>

        <motion.div className="flex flex-col 
        items-center justify-center text-center max-w-4xl
        rounded-lg 
        mx-auto py-20 " {...fadeInUp}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">Advanced</span> Analytics
          </h2>
          <p className="text-lg md:text-xl mb-10 text-gray-600 dark:text-gray-400 leading-relaxed">
            Gain deep insights into market trends with our advanced analytics tools. Make informed decisions based on real-time data and comprehensive market analysis.
          </p>
          <motion.a
            className="bg-[#9d00FF]  text-white text-center 
              h-full py-2 rounded-lg 
               flex justify-center text-sm md:text-lg 
             transition duration-300
             shadow-lg
              mx-auto px-[8.5rem] cursor-pointer hover:z-0 
              hover:shadow-lg  hover:shadow-[#9d00ff83]" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Analytics
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
