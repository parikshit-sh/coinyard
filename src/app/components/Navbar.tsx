"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { faXmark, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prevState) => {
      const newState = !prevState;
      document.body.style.overflow = newState ? 'hidden' : 'auto';
      return newState;
    });
  };

  const toggleDarkMode = () => {
    const newTheme = !darkMode ? 'dark' : 'light';
    setDarkMode(!darkMode);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <header className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
      scrolling ? "bg-white/70 dark:bg-transparent backdrop-blur-md shadow-lg" : ""
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <div className="text-2xl font-bold cursor-pointer bg-blue-500 text-transparent bg-clip-text">
                TokenStats
              </div>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {["Home", "Market",].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-purple-400 transition ease-in-out border-b-2 border-transparent hover:border-blue-500 dark:hover:border-purple-400"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 mr-4"
            >
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            </button>
            <div className="hidden md:flex items-center space-x-4">
              {[
                { href: "https://twitter.com", icon: faXTwitter },
                { href: "https://discord.com", icon: faDiscord },
              ].map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-purple-400 transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={social.icon} size="lg" />
                </a>
              ))}
            </div>
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:focus:ring-purple-400"
              onClick={toggleMenu}
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="md:hidden bg-white dark:bg-gray-900"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {["Home", "Market"].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="flex px-3 py-2 rounded-md text-base font-medium
                   text-gray-700 dark:text-gray-300 hover:text-blue-500
                    dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={toggleMenu}
                >
                  {item}
                </Link>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center px-5 space-x-4">
                {[
                  { href: "https://twitter.com", icon: faXTwitter },
                  { href: "https://discord.com", icon: faDiscord },
                ].map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-purple-400 transition-colors duration-200"
                  >
                    <FontAwesomeIcon icon={social.icon} size="lg" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
