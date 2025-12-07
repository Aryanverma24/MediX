import React from 'react';
import { motion } from 'framer-motion'; 

// Array of messages to display
const meditationMessages = [
  "Inhale deeply...",
  "Breathe Peace.",
  "Hold (gently).",
  "Exhale slowly...",
  "Let go...",
  "Calm is here.",
  "Just be.",
  "Find stillness."
];

// Configuration
const CONTAINER_DELAY_SECONDS = 0.15; // Delay between each message appearance

// 1. Parent container animation (Controls the whole group)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: CONTAINER_DELAY_SECONDS // Stagger the animation of its children
    }
  }
};

// 2. Child item animation (Controls individual message movement/fade)
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: {
      duration: 0.8, // Duration for each item's animation
      ease: "easeOut"
    }
  }
};

const TextLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <motion.div
        className="text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {meditationMessages.map((message, index) => (
          <motion.p
            key={index} // Use index since messages don't change
            variants={itemVariants}
            className="text-2xl font-light text-gray-300 py-1"
          >
            {message}
          </motion.p>
        ))}
      </motion.div>
    </div>
  );
};

export default TextLoader;