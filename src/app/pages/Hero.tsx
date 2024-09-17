"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface CryptoCoin {
  id: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
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
    <div id="hero">
      <div className="flex flex-col md:flex-row items-center justify-center 
      md:justify-between text-[var(--text-color)] relative px-4 md:px-16 py-8 
      bg-gradient-to-r from-[var(--background-start-rgb)] to-[var(--background-end-rgb)]">
        <div className="flex flex-col items-center md:items-start justify-center
         text-center md:text-left w-full md:w-1/2">
          <h2
            className="hero-head text-3xl md:text-4xl lg:text-6xl font-semibold"
            style={{ lineHeight: "1.2" }}
          >
            Explore The Largest{" "}
            <span className="bg-gradient-to-r from-blue-900 via-violet-500 to-pink-400 
            inline-block text-transparent bg-clip-text pr-2">
              Crypto
            </span>
            Marketplaces
          </h2>

          <p className="pt-2 text-xs md:text-sm lg:text-lg text-gray-400">
            Track & Trade Cryptocurrency Easily and Securely
          </p>
          <div
            className="hero-btn mt-6 flex flex-col md:flex-row items-center md:items-start gap-2 
          space-y-2 md:space-y-0 md:space-x-0 z-10 lg:space-x-2"
          >
            <a
              href="#__wallet__"
              className="hero-btn bg-[#610AEC] p-2 rounded-full text-center text-white sm:w-80 m:w-20 lg:w-36"
            >
              Connect Wallet
            </a>
            <a
              href="#market"
              className="hero-btn bg-transparent border-[var(--text-color)] border p-2 
              rounded-full text-center sm:w-80 m:w-20 lg:w-36 hover:bg-[#610AEC] 
              transition ease-in-out hover:text-white"
            >
              Explore Market
            </a>
          </div>
        </div>
        <div className="hidden md:flex w-full md:w-1/2 justify-center md:justify-end mt-10 md:-mt-6">
          <div className="relative w-full max-w-xs md:max-w-lg lg:max-w-xl">
            <Image
              src="/images/stars.png"
              alt="Star"
              className="absolute object-cover z-10"
              width={200}
              height={200}
              style={{
                width: "25%",
                height: "auto",
                top: "29%",
                left: "25%",
                transform: "translate(-50%, -50%)",
              }}
            />
            <Image
              src="/images/stars.png"
              alt="Star"
              className="absolute object-cover"
              width={159}
              height={159}
              style={{
                width: "20%",
                height: "auto",
                top: "76%",
                left: "67%",
                transform: "translate(-50%, -50%) scaleX(-1)",
              }}
            />
            <Image
              src="/images/3d-cash-money.png"
              width={700}
              height={700}
              alt="3D Cash Money"
              className="coin-img object-cover"
            />
          </div>
        </div>
      </div>

     
      <div className="-mt-8">
        <div className="bg-transparent grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 
        lg:grid-cols-6 p-4 mb-12 rounded-xl">
          {loading ? (
            <div className="flex flex-col items-center justify-center col-span-2 
            sm:col-span-2 md:col-span-4 lg:col-span-6 h-48">
              <div className="w-12 h-12 border-4 border-t-4 border-pink-500 border-t-transparent 
              rounded-full animate-spin"></div>
              <p className="mt-2 text-white">Loading Coins...</p>
            </div>
          ) : coins.length > 0 ? (
            coins.map((coin) => (
              <div
                key={coin.id}
                className="relative flex flex-col items-center rounded-md p-2 justify-center 
                hover:scale-110 transition ease-out cursor-pointer"
              >
                <Image
                  src={coin.image}
                  alt={coin.id}
                  width={50} 
                  height={50} 
                  className="w-16 h-16 mb-2 object-cover"
                />
                <span className="text-sm md:text-base lg:text-lg font-semibold mb-1">
                  {coin.id.charAt(0).toUpperCase() + coin.id.slice(1)}
                </span>
                <span
                  className={`text-sm md:text-base lg:text-lg font-semibold ${
                    coin.price_change_percentage_24h >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
                <span className="text-sm md:text-base lg:text-lg font-semibold mt-1">
                  {coin.current_price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center col-span-2 
            sm:col-span-2 md:col-span-4 lg:col-span-6 h-48">
              <div className="w-12 h-12 border-4 border-t-4 border-pink-500 border-t-transparent 
              rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
