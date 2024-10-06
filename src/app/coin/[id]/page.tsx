'use client';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { format, subHours, subDays, subMonths, subYears } from 'date-fns';

interface CoinDetails {
  id: string;
  image: { large: string };
  name: string;
  symbol: string;
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    total_volume: { usd: number };
    price_change_percentage_24h: number;
    sparkline_7d: { price: number[] };
    high_24h: { usd: number };
    low_24h: { usd: number };
    ath: { usd: number };
    atl: { usd: number };
    circulating_supply: number;
    total_supply: number;
  };
  description: { en: string };
}

const Coin: React.FC = () => {
  const [coinData, setCoinData] = useState<CoinDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeRange, setTimeRange] = useState<string>('7d');
  const [chartData, setChartData] = useState<{ date: string; price: number }[]>([]);
  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    if (id) {
      const fetchCoinData = async () => {
        try {
          const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`
          );
          if (!response.ok) throw new Error('Failed to fetch coin data');
          const result: CoinDetails = await response.json();
          setCoinData(result);
          setChartData(getChartData('7d', result.market_data.sparkline_7d.price));
        } catch (error) {
          console.error('Error fetching coin data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchCoinData();
    }
  }, [id]);

  const getChartData = (range: string, prices: number[]) => {
    const now = new Date();
    let startDate;
    let dataPoints;

    switch (range) {
      case '1h':
        startDate = subHours(now, 1);
        dataPoints = 60;
        break;
      case '24h':
        startDate = subDays(now, 1);
        dataPoints = 24;
        break;
      case '1w':
        startDate = subDays(now, 7);
        dataPoints = 7;
        break;
      case '1m':
        startDate = subMonths(now, 1);
        dataPoints = 30;
        break;
      case '3m':
        startDate = subMonths(now, 3);
        dataPoints = 90;
        break;
      case '1y':
        startDate = subYears(now, 1);
        dataPoints = 365;
        break;
      case 'all':
      default:
        startDate = new Date(0); // Unix epoch
        dataPoints = prices.length;
    }

    const step = Math.max(1, Math.floor(prices.length / dataPoints));
    return prices.filter((_, index) => index % step === 0).map((price, index) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + index * step);
      return {
        date: format(date, 'MMM dd'),
        price: price,
      };
    });
  };

  useEffect(() => {
    if (coinData) {
      setChartData(getChartData(timeRange, coinData.market_data.sparkline_7d.price));
    }
  }, [timeRange, coinData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-t-4 border-blue-500 border-t-transparent rounded-full"
        ></motion.div>
      </div>
    );
  }

  if (!coinData) {
    return <div className="text-center text-red-600">Failed to load coin data.</div>;
  }

  const radarData = [
    { subject: 'Price', A: coinData.market_data.current_price.usd, fullMark: coinData.market_data.current_price.usd * 1.5 },
    { subject: 'Market Cap', A: coinData.market_data.market_cap.usd, fullMark: coinData.market_data.market_cap.usd * 1.5 },
    { subject: 'Volume', A: coinData.market_data.total_volume.usd, fullMark: coinData.market_data.total_volume.usd * 1.5 },
    { subject: '24h Change', A: Math.abs(coinData.market_data.price_change_percentage_24h), fullMark: 100 },
    { subject: 'ATH', A: coinData.market_data.ath.usd, fullMark: coinData.market_data.ath.usd * 1.2 },
    { subject: 'Circulating Supply', A: coinData.market_data.circulating_supply, fullMark: coinData.market_data.total_supply || coinData.market_data.circulating_supply * 1.5 },
  ];

  const formatYAxis = (value: number) => `$${value.toFixed(2)}`;
  const formatTooltip = (value: number) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="min-h-screen pt-24  text-gray-900 dark:text-gray-100">
      <Navbar />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="col-span-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center"
            >
              <Image
                src={coinData.image.large}
                alt={coinData.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h1 className="text-3xl font-bold">{coinData.name}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">{coinData.symbol.toUpperCase()}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 h-full"
            >
              <h2 className="text-xl font-semibold mb-4">Price Info</h2>
              <p className="text-3xl font-bold mb-2">
                ${coinData.market_data.current_price.usd.toLocaleString()}
              </p>
              <p className={`text-lg font-medium ${coinData.market_data.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}`}>
                {coinData.market_data.price_change_percentage_24h.toFixed(2)}% (24h)
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 h-full"
            >
              <h2 className="text-xl font-semibold mb-4">Market Info</h2>
              <p className="mb-2">
                <span className="font-medium">Market Cap:</span> ${coinData.market_data.market_cap.usd.toLocaleString()}
              </p>
              <p>
                <span className="font-medium">24h Volume:</span> ${coinData.market_data.total_volume.usd.toLocaleString()}
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 h-full"
            >
              <h2 className="text-xl font-semibold mb-4">24h Range</h2>
              <p className="mb-2">
                <span className="font-medium">High:</span> ${coinData.market_data.high_24h.usd.toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Low:</span> ${coinData.market_data.low_24h.usd.toLocaleString()}
              </p>
            </motion.div>

            

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="col-span-full md:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Price Chart</h2>
              <div className="mb-4 flex flex-wrap gap-2">
                {['1h', '24h', '1w', '1m', '3m', '1y', 'all'].map((range) => (
                  <motion.button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                      timeRange === range
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {range}
                  </motion.button>
                ))}
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="date" 
                      stroke="#6B7280" 
                      tick={{ fill: '#6B7280' }}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#6B7280" 
                      tickFormatter={formatYAxis}
                      tick={{ fill: '#6B7280' }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        border: 'none',
                        borderRadius: '0.375rem',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                      }}
                      formatter={formatTooltip}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#3B82F6" 
                      fillOpacity={1}
                      fill="url(#colorUv)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 
              rounded-2xl shadow-lg  col-span-full md:col-span-1 w-full text-xs"
            >
              <h2 className="text-xl font-semibold mb-4 p-5">Coin Metrics</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={90} width={730} height={250} data={radarData}>
                    <PolarGrid stroke="#718096" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#718096' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={{ fill: '#718096' }} />
                    <Radar name={coinData.name} dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                    <Radar name="Full Mark" dataKey="fullMark" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                    <Legend wrapperStyle={{ color: '#718096' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#1F2937' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="col-span-full
               md:col-span-3 bg-white dark:bg-gray-800 rounded-2xl shadow-lg px-5 py-14"
            >
              <h2 className="text-md font-semibold mb-4 max-w-4xl mx-auto">About {coinData.name}</h2>
              <p className="leading-relaxed max-w-4xl mx-auto text-sm" dangerouslySetInnerHTML={{ __html: coinData.description.en }}></p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Coin;
