"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Table from "../components/Market";

const MarketPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Table />
      </main>
      <Footer />
    </div>
  );
};

export default MarketPage;
