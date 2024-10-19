'use client';
import React from 'react';
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import './globals.css';
import Table from './components/Market';
import About from './components/About';
import Footer from './components/Footer';



export default function Home() {

  return (
    
    <div className="flex flex-col min-h-screen ">
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
