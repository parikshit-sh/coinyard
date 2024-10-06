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

    // Clean up function to remove the cz-shortcut-listen attribute
    return () => {
      document.body.removeAttribute('cz-shortcut-listen');
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Table />
        <About />
      </main>
      <Footer />
    </div>
  );
}
