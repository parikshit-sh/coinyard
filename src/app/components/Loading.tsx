'use client';
import React from 'react';
import { motion } from 'framer-motion';

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: "100%",
  },
};

const loadingCircleTransition = {
  duration: 0.6,
  repeat: Infinity,
  repeatType: "reverse" as const,
  ease: "easeInOut" as const,
};

const Loading = () => {
  return (
    <motion.div
      className="loading-container flex justify-center items-center h-screen"
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
    >
      <motion.div
        className="loading-circle bg-blue-500 w-5 h-5 rounded-full mx-2"
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.div
        className="loading-circle bg-blue-500 w-5 h-5 rounded-full mx-2"
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.div
        className="loading-circle bg-blue-500 w-5 h-5 rounded-full mx-2"
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
    </motion.div>
  );
};

export default Loading;
