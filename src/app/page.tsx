'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import './globals.css';

const Table = dynamic(() => import("./components/Market"), { ssr: false });
const About = dynamic(() => import("./components/About"), { ssr: false });
const Footer = dynamic(() => import("./components/Footer"), { ssr: false });

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.classList.add('transition-colors');
  }, []);

  if (!mounted) {
    return null;
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
