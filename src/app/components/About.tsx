import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const About = () => {
  // Define animations for each section
  const fadeInUp = {
    initial: { opacity: 0, y: 80 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -80 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 80 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
  };

  // Hook to trigger animations when in view
  const control1 = useAnimation();
  const control2 = useAnimation();
  const control3 = useAnimation();

  const [ref1, inView1] = useInView({ threshold: 0.3 }); // Starts animation when 20% of the section is visible
  const [ref2, inView2] = useInView({ threshold: 0.3 });
  const [ref3, inView3] = useInView({ threshold: 0.3 });

  const [hasAnimated1, setHasAnimated1] = useState(false);
  const [hasAnimated2, setHasAnimated2] = useState(false);
  const [hasAnimated3, setHasAnimated3] = useState(false);

  useEffect(() => {
    if (inView1 && !hasAnimated1) {
      control1.start("animate");
      setHasAnimated1(true);
    }
  }, [control1, inView1, hasAnimated1]);

  useEffect(() => {
    if (inView2 && !hasAnimated2) {
      control2.start("animate");
      setHasAnimated2(true);
    }
  }, [control2, inView2, hasAnimated2]);

  useEffect(() => {
    if (inView3 && !hasAnimated3) {
      control3.start("animate");
      setHasAnimated3(true);
    }
  }, [control3, inView3, hasAnimated3]);

  return (
    <section id="about" className="py-16 md:py-24 text-gray-800 dark:text-gray-200 px-6">
      <div className="container mx-auto px-4">
        {/* First Section */}
        <motion.div
          ref={ref1} // Attach the ref to the element you want to observe
          className="flex flex-col md:flex-row 
          items-center justify-between mb-20 space-y-10 md:space-y-0
           md:space-x-10 max-w-6xl"
          animate={control1}
          variants={fadeInLeft}
          initial="initial"
          viewport={{
            once:true
          }}
        >
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

        {/* Second Section */}
        <motion.div
          ref={ref2}
          className="flex flex-col 
          md:flex-row-reverse items-center 
          justify-between mb-20 space-y-10 md:space-y-0 
          md:space-x-10 max-w-6xl"
          initial="initial"
          animate={control2}
          variants={fadeInRight} // Animation for the second section to come from the right
        >
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

        {/* Third Section */}
        <motion.div
          ref={ref3}
          className="flex flex-col 
          md:flex-row-reverse items-center 
          justify-center mb-20 space-y-10 md:space-y-0 
          md:space-x-10 max-w-6xl"
          initial="initial"
          animate={control3}
          variants={fadeInUp} // Animation for the third section to come from underneath
        >
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">Advanced</span> Analytics
            </h2>
            <p className="text-lg md:text-xl mb-10 text-gray-600 dark:text-gray-400 leading-relaxed">
              Gain deep insights into market trends with our advanced analytics tools. Make informed decisions based on real-time data and comprehensive market analysis.
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
        </motion.div>
      </div>
    </section>
  );
};

export default About;
