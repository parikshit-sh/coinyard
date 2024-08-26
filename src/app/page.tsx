import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import Table from "./components/Market";
import './globals.css';
import About from "./components/About";
import Footer from "./components/Footer";
export default function Home() {
  return (
    
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
   
      <Navbar />
      <Hero/>
      <Table />
      <About />
      <Footer />
    </main>
  );
}
