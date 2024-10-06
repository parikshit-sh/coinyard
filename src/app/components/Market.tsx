"use client";
import React from "react";
import "../globals.css";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from 'next/link';
import { useState, useEffect } from "react";

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
    <div className="py-4 pt-20 px-4 md:px-8 lg:px-16" id="market">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center dark:bg-clip-text dark:text-blue-50 font-mono uppercase">
        Market Update
      </h2>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading Coins...</p>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg"
        >
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-slate-600 text-white">
              <tr>
                {["Coin", "Price", "24h Change", "Market Cap"].map((header) => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {currentItems.map((coin: CryptoCoin) => (
                <tr key={coin.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/coin/${coin.id}`}>
                      <div className="flex items-center cursor-pointer">
                        <Image
                          src={coin.image}
                          alt={coin.id}
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-full mr-3"
                        />
                        <span className="font-medium text-gray-900 dark:text-gray-100 capitalize">{coin.id}</span>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    ${coin.current_price.toLocaleString()}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    coin.price_change_percentage_24h > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }`}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    ${coin.market_cap.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">{Math.min(indexOfLastItem, data.length)}</span> of{' '}
                  <span className="font-medium">{data.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    &lt;
                  </button>
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      onClick={() => handlePageChange(num)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        num === currentPage
                          ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    &gt;
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Table;
