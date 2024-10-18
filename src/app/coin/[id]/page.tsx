'use client';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { format, subHours, subDays, subYears, startOfHour } from 'date-fns';

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
    price_change_percentage_1h_in_currency: { usd: number };
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
  const [timeRange, setTimeRange] = useState<string>('24h');
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
          setChartData(getChartData('24h', result.market_data.sparkline_7d.price));
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
        startDate = startOfHour(subHours(now, 1));
        dataPoints = 60;
        break;
      case '24h':
        startDate = subHours(now, 24);
        dataPoints = 24;
        break;
      case '1w':
        startDate = subDays(now, 7);
        dataPoints = 168;
        break;
      case '1y':
        startDate = subYears(now, 1);
        dataPoints = 365;
        break;
      default:
        startDate = subHours(now, 24);
        dataPoints = 24;
    }

    const step = Math.max(1, Math.floor(prices.length / dataPoints));
    return prices.filter((_, index) => index % step === 0).map((price, index) => {
      const date = new Date(startDate);
      if (range === '1h') {
        date.setMinutes(date.getMinutes() + index);
      } else if (range === '24h') {
        date.setHours(date.getHours() + index);
      } else if (range === '1y') {
        date.setDate(date.getDate() + index);
      } else {
        date.setHours(date.getHours() + index * step);
      }
      return {
        date: format(date, range === '1h' ? 'HH:mm' : range === '24h' ? 'HH:00' : 'MMM dd yyyy'),
        price: price,
      };
    });
  };

  useEffect(() => {
    if (coinData) {
      if (timeRange === '1y') {
        const fetchYearlyData = async () => {
          try {
            const endDate = new Date();
            const startDate = new Date(endDate);
            startDate.setFullYear(startDate.getFullYear() - 1);
            
            const response = await fetch(
              `https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=usd&from=${Math.floor(startDate.getTime() / 1000)}&to=${Math.floor(endDate.getTime() / 1000)}`
            );
            if (!response.ok) throw new Error('Failed to fetch yearly data');
            const data = await response.json();
            
            const yearlyChartData = data.prices.map(([timestamp, price]: [number, number]) => ({
              date: format(new Date(timestamp), 'MMM dd yyyy'),
              price: price,
            }));
            
            setChartData(yearlyChartData);
          } catch (error) {
            console.error('Error fetching yearly data:', error);
          }
        };
        fetchYearlyData();
      } else if (timeRange === '24h') {
        const fetch24hData = async () => {
          try {
            const endDate = new Date();
            const startDate = new Date(endDate);
            startDate.setHours(startDate.getHours() - 24);
            
            const response = await fetch(
              `https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=usd&from=${Math.floor(startDate.getTime() / 1000)}&to=${Math.floor(endDate.getTime() / 1000)}`
            );
            if (!response.ok) throw new Error('Failed to fetch 24h data');
            const data = await response.json();
            
            const hourlyChartData = data.prices.map(([timestamp, price]: [number, number]) => ({
              date: format(new Date(timestamp), 'HH:00'),
              price: price,
            }));
            
            setChartData(hourlyChartData);
          } catch (error) {
            console.error('Error fetching 24h data:', error);
          }
        };
        fetch24hData();
      } else {
        setChartData(getChartData(timeRange, coinData.market_data.sparkline_7d.price));
      }
    }
  }, [timeRange, coinData, id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-t-4 border-purple-500 border-t-transparent rounded-full"
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
    <div className="min-h-screen pt-[5.4rem]">
      <Navbar />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          <div className="bg-white dark:bg-[#121212]
          dark:backdrop-blur-lg rounded-xl  p-6 mb-8">
            <div className="flex items-center mb-6">
              <Image
                src={coinData.image.large}
                alt={coinData.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h1 className="text-3xl font-bold
                 dark:text-white font-syne">{coinData.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">{coinData.symbol.toUpperCase()}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 text-black dark:bg-[#121212]
               dark:text-white rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-2
                dark:text-white font-syne">Price</h2>
                  <p className="text-3xl  font-inter">${coinData.market_data.current_price.usd.toLocaleString()}</p>
                <p className={`text-sm font-medium  ${coinData.market_data.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}`}>
                  {coinData.market_data.price_change_percentage_24h.toFixed(2)}% (24h)
                </p>
              </div>

              <div className="bg-gray-50
               dark:bg-[#121212] rounded-lg p-4 text-black dark:text-white">
                <h2 className="text-xl font-semibold mb-2 font-syne">Market Cap</h2>
                <p className="text-xl font-inter">${coinData.market_data.market_cap.usd.toLocaleString()}</p>
              </div>

              <div className="bg-gray-50 dark:bg-[#121212]
               dark:backdrop-blur-lg rounded-lg p-4 text-black dark:text-white">
                <h2 className="text-lg font-semibold mb-2 font-syne">24h Volume</h2>
                <p className="text-xl font-inter">${coinData.market_data.total_volume.usd.toLocaleString()}</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-black dark:text-white font-syne">Price Chart</h2>
              <div className="mb-4 flex flex-wrap gap-2">
                {['1h', '24h', '1w', '1y'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                      timeRange === range
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 dark:bg-[#53485a] dark:text-white  text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              <div className="h-[50vw] md:h-80 bg-white dark:bg-[#121212]
               dark:backdrop-blur-lg rounded-lg">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9D00FF" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#9D00FF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone"
                      dataKey="price" 
                      stroke="#9D00FF"
                      strokeWidth={2}
                      fill="url(#colorPrice)"
                      fillOpacity={0.6}
                    />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#718096' }}
                      interval="preserveStartEnd"
                      minTickGap={30}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#718096' }}
                      tickFormatter={formatYAxis}
                      domain={['auto', 'auto']}
                      padding={{ top: 10, bottom: 10 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        fontSize: '0.875rem',
                      }}
                      formatter={formatTooltip}
                      labelFormatter={(label) => `Time: ${label}`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4
                 text-black dark:text-white font-mPlus">Coin Metrics</h2>
                <div className="bg-gray-50 dark:bg-[#121212] rounded-lg p-4 h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={90} data={radarData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#4a5568', fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={{ fill: '#4a5568', fontSize: 12 }} />
                      <Radar name={coinData.name} dataKey="A" stroke="#9D00FF" fill="#9D00FF" fillOpacity={0.6} />
                      <Radar name="Full Mark" dataKey="fullMark" stroke="#38a169" fill="#38a169" fillOpacity={0.6} />
                      <Legend wrapperStyle={{ fontSize: 12 }} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4
                 text-black dark:text-white font-syne">About {coinData.name}</h2>
                <div className="bg-gray-50 dark:bg-[#121212] 
                rounded-lg p-4 h-80 overflow-y-auto">
                  <p className="text-sm leading-relaxed text-black dark:text-white
                  " dangerouslySetInnerHTML={{ __html: coinData.description.en }}></p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Coin;
