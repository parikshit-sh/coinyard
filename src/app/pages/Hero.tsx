"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface CryptoCoin {
  id: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

const Hero = () => {
  const [coins, setCoins] = useState<CryptoCoin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

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
    <section id="hero" className="min-h-screen flex items-center 
    justify-center  overflow-hidden rounded-xl p-4 relative pt-24 mt-[1rem] lg:pt-0">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center
         justify-between gap-12">
          <motion.div 
            className="lg:w-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-head text-5xl md:text-7xl 
            lg:text-8xl font-extrabold mb-6 leading-tight text- dark:text-white
             font-mPlus text-zinc-800">
              Explore The Largest
              <span className="bg-clip-text text-transparent
               bg-[#9D00FF] dark:bg-[#9D00FF]">
                {" "}Crypto Marketplaces
              </span>
            </h1>
            <p className="text-2xl md:text-3xl mb-10
             text-zinc-900 font-bold dark:text-purple-100 font-mPlus">
              Track & Trade Cryptocurrency Easily on Our Platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="#wallet"
                className="bg-[#9D00FF]
                 inline-block px-8 py-4 rounded-full 
                  text-white text-center text-xl
                 font-semibold transition duration-300 font-mPlus"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Connect Wallet
              </motion.a>
              <motion.a
                href="#market"
                className="dark:bg-white dark:text-black bg-black text-white
                  font-semibold py-4 px-8 font-mPlus text-xl flex items-center justify-center
                   rounded-full hover:bg-[#9D00FF]
                    dark:hover:bg-[#9D00FF] 
                   dark:hover:text-white
                    transition duration-300 ease-in-out transform
                     hover:scale-105" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex-1 text-center">Explore Market</span>
              </motion.a>
            </div>
          </motion.div>
          <motion.div 
            className="lg:w-1/2 mt-12 lg:mt-0 w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white/10 dark:bg-blue-950/10 backdrop-filter backdrop-blur-sm p-6 rounded-2xl">
              <h2 className="text-xl font-medium mb-4
               text-zinc-900 dark:text-zinc-100 font-mPlus">Live Crypto Prices</h2>
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
                </div>
              ) : coins.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {coins.map((coin) => (
                    <motion.div
                      key={coin.id}
                      className="p-4 rounded-lg hover:bg-white/5 dark:hover:bg-blue-900/5 transition duration-300 flex items-center"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Image
                        src={coin.image}
                        alt={coin.id}
                        width={32}
                        height={32}
                        className="mr-3 rounded-full"
                      />
                      <div>
                        <h3 className="text-base font-medium mb-1 capitalize text-blue-800 dark:text-blue-100">{coin.id}</h3>
                        <p className="text-lg font-semibold mb-1 text-blue-900 dark:text-blue-50">
                          {coin.current_price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </p>
                        <span
                          className={`text-xs font-medium ${
                            coin.price_change_percentage_24h >= 0
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-blue-400 dark:text-blue-300">No data available</div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
