"use client";
import React, { useState, useEffect } from "react";
import "../globals.css";

import Image from "next/image";

interface CryptoCoin {
  id: string;
  image: string;
  current_price: number;
  total_volume: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

const Table: React.FC = () => {
  const [data, setData] = useState<CryptoCoin[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
          {
            headers: {
              Authorization: `Bearer ${process.env.COINGECKO_API_KEY}`, 
            },
          }
        );
        const result: CryptoCoin[] = await response.json();
        console.log("Fetched Data:", result); 
        setData(result);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="py-4 pt-20" id="market">
      <h2 className="market-head text-2xl md:text-4xl lg:text-5xl font-semibold mb-12 text-center">
        Market Update
      </h2>
      {loading ? (
        <div className="flex flex-col items-center justify-center col-span-2 md:col-span-4 ">
          <div className="w-12 h-12 border-4 border-t-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2">Loading Coins...</p>
        </div>
      ) : (
        <div className="table-container overflow-x-auto bg-transparent shadow-md rounded-md max-w-[344px] mx-auto sm:max-w-full">
          <div className="min-w-full">
            <table id="mkt" className="min-w-full divide-y divide-gray-200 table-fixed sm:table-auto">
              <thead className="bg-gradient-to-r from-blue-600 via-[#610AEC] to-pink-400">
                <tr>
                  <th className="px-2 py-2 text-left text-xl font-semibold tracking-wider sm:px-6 sm:py-3 text-white">
                    Coin
                  </th>
                  <th className="px-2 py-2 text-left text-xl font-semibold tracking-wider sm:px-6 sm:py-3 text-white">
                    Price
                  </th>
                  <th className="px-2 py-2 text-left text-xl font-semibold tracking-wider sm:px-6 sm:py-3 text-white">
                    Total Volume
                  </th>
                  <th className="hidden lg:table-cell px-2 py-2 text-left text-xl font-semibold tracking-wider sm:px-6 sm:py-3 text-white">
                    Market Cap
                  </th>
                  <th className="hidden lg:table-cell px-2 py-2 text-left text-xl font-semibold tracking-wider sm:px-6 sm:py-3 text-white">
                    Price Change
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-2 py-4 text-center text-sm text-gray-500"
                    >
                      <div className="flex flex-col items-center justify-center col-span-2 md:col-span-4 h-48">
                        <div className="w-12 h-12 border-4 border-t-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-2">Loading Coins...</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentItems.map((coin: CryptoCoin) => (
                    <tr
                      key={coin.id}
                      className="hover:bg-[#514287] hover:bg-opacity-30 cursor-pointer"
                    >
                      <td className="px-2 py-4 whitespace-nowrap text-xs font-medium sm:px-6 sm:py-4">
                        <div className="flex items-center">
                          <Image
                            src={coin.image}
                            alt={coin.id}
                            width="100"
                            height="100"
                            className="w-6 h-6 mr-2 rounded-full sm:w-8 sm:h-8"
                          />
                          <span className="coin-id md:hidden">{coin.id}</span>
                          <span className="hidden md:table-cell text-lg capitalize">
                            {coin.id}
                          </span>
                        </div>
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-lg sm:px-6 sm:py-4">
                        ${coin.current_price.toLocaleString()}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-lg text-semibold sm:px-6 sm:py-4">
                        {coin.total_volume.toLocaleString()}
                      </td>
                      <td className="hidden lg:table-cell px-2 py-4 whitespace-nowrap text-lg sm:px-6 sm:py-4">
                        ${coin.market_cap.toLocaleString()}
                      </td>
                      <td
                        className={`hidden lg:table-cell px-2 py-4 whitespace-nowrap text-lg sm:px-6 sm:py-4 ${
                          coin.price_change_percentage_24h > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 flex items-center justify-center space-x-2">
  <a href="#market">
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="bg-gray-300 text-gray-600 px-3 py-1 rounded-full text-sm font-medium"
    >
      &lt;
    </button>
  </a>
  {Array.from(
    { length: Math.min(totalPages, 6) },
    (_, i) => i + 1
  ).map((num) => (
    <a href="#market" key={num}> {/* Add key here */}
      <button
        onClick={() => handlePageChange(num)}
        className={`px-3 py-1 rounded-full text-m font-medium ${
          num === currentPage
            ? "bg-gradient-to-tr from-blue-700 via-purple-600-500 to-pink-500 text-white"
            : "bg-gray-200 text-gray-600"
        }`}
      >
        {num}
      </button>
    </a>
  ))}
  <a href="#market">
    <button
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="bg-gray-300 text-gray-600 px-3 py-1 rounded-full text-m font-medium"
    >
      &gt;
    </button>
  </a>
</div>

        </div>
      )}
    </div>
  );
};

export default Table;
