'use client';
import React, { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import Table from "./components/Market";
import About from "./components/About";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import './globals.css';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const minLoadingDuration = 1000;
    let loadingTimeout: NodeJS.Timeout;

    const checkLoadingState = () => {
      if (document.readyState === 'complete') {
        
        loadingTimeout = setTimeout(() => setLoading(false), minLoadingDuration);
      } else {
       
        const handleLoad = () => {
          clearTimeout(loadingTimeout); 
          setLoading(false);
        };

        window.addEventListener('load', handleLoad);

        loadingTimeout = setTimeout(() => setLoading(false), minLoadingDuration);

        return () => {
          window.removeEventListener('load', handleLoad);
          clearTimeout(loadingTimeout);
        };
      }
    };

    checkLoadingState(); 

  }, []);

  if (loading) {
    return <Loading />; 
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Navbar />
      <Hero />
      <Table />
      <About />
      <Footer />
    </main>
  );
}
