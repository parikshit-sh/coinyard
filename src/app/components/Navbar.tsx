"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prevState) => {
      const newState = !prevState;
     
      document.body.style.overflow = newState ? 'hidden' : 'auto';
      return newState;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50); 
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
      
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

 
    handleResize();

   
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
  
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <header
      className="fixed w-full top-0 left-0 z-50 transition-all duration-300">
      <nav className={`flex items-center justify-between py-4 px-4 md:px-8 navbar ${
        scrolling ? "bg-transparent bg-opacity-80 backdrop-blur-md shadow-lg" : ""
      }`}>
       
        <a href="/"><div className="text-2xl font-semibold cursor-pointer">tokenstats</div></a>

        
        <ul className="hidden md:flex md:gap-16 flex-grow justify-center">
          <li className="cursor-pointer">
            <a href="#hero" className="hover:text-[#c165ff] transition ease-in-out">Home</a>
          </li>
          <li className="cursor-pointer">
            <a href="#market" className="hover:text-[#c165ff] transition ease-in-out">Market</a>
          </li>
          <li className="cursor-pointer">
            <a href="#about" className="hover:text-[#c165ff] transition ease-in-out">About Us</a>
          </li>
        </ul>

       
        <div className="flex items-center">
          <div className="flex justify-end gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl ml-4 md:ml-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-twitter-x"
                viewBox="0 0 16 16"
              >
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
              </svg>
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl md:ml-4 pr-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-discord"
                viewBox="0 0 16 16"
              >
                <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
              </svg>
            </a>
          </div>
          <button
            className="md:hidden text-2xl"
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
          >
            &#9776;
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0  bg-[#040740] backdrop-blur-2xl text-white uppercase text-2xl shadow-lg z-50 flex flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-4 right-4 text-2xl"
              onClick={toggleMenu}
              aria-label="Close mobile menu"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <ul className="space-y-4 text-center">
              <li>
                <a href="#hero" onClick={toggleMenu}>
                  Home
                </a>
              </li>
              <li>
                <a href="#market" onClick={toggleMenu}>
                  Market
                </a>
              </li>
              <li>
                <a href="#about" onClick={toggleMenu}>
                  About Us
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-8">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl"
              >
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl"
              >
                <FontAwesomeIcon icon={faDiscord} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
