"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface CryptoCoin {
  id: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const Hero = () => {
  const [coins, setCoins] = useState<CryptoCoin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const fetchPopularCoins = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,binancecoin"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: CryptoCoin[] = await response.json();
        setCoins(data);
      } catch (error) {
        console.error("Error fetching popular coins:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularCoins();
  }, []);

  return (
    <motion.section 
      ref={heroRef}
      id="hero" 
      className="min-h-screen flex items-center justify-center bg-transparent lg:pt-0 pt-20 overflow-hidden"
      style={{ opacity }}
    >
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ y }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-800 dark:text-gray-100">
              Explore The Largest
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                {" "}Crypto Marketplaces
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-2xl text-gray-600 dark:text-gray-300">
              Track & Trade Cryptocurrency Easily and Securely on Our Modern Blockchain Platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="#__wallet__"
                className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Connect Wallet
              </motion.a>
              <motion.a
                href="#market"
                className="btn bg-transparent border-2 border-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Market
              </motion.a>
            </div>
          </motion.div>
          <motion.div 
            className="lg:w-1/2 mt-12 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "25%"]) }}
          >
            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Live Crypto Prices</h2>
              {loading ? (
                <div className="flex justify-center items-center h-48">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : coins.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {coins.map((coin, index) => (
                    <motion.div
                      key={coin.id}
                      className="bg-gray-50 dark:bg-gray-700 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.03 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold capitalize text-gray-800 dark:text-gray-100">{coin.id}</h3>
                        <span
                          className={`text-sm font-semibold px-2 py-1 rounded-full ${
                            coin.price_change_percentage_24h >= 0
                              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                              : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                          }`}
                        >
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                        {coin.current_price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400">No data available</div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
