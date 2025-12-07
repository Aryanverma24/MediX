import React, { useState, useEffect } from 'react';
// Assuming you have Framer Motion installed for simple animation
import { motion, AnimatePresence } from 'framer-motion'; 

// Array of messages to display
const meditationMessages = [
  "Inhale deeply...",
  "Hold your breath...",
  "Exhale slowly...",
  "Just be, for now.",
  "Be patient.",
  "Calm is here."
];

// Configuration
const INTERVAL_TIME_MS = 1000; // Change message every 3 seconds

const TextLoader = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    // Set up an interval to change the message index
    const timer = setInterval(() => {
      setCurrentMessageIndex(prevIndex => 
        (prevIndex + 1) % meditationMessages.length
      );
    }, INTERVAL_TIME_MS);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timer);
  }, []); // Empty dependency array means this runs once on mount

  const currentMessage = meditationMessages[currentMessageIndex];

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentMessage} // Key is crucial for AnimatePresence to detect change
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="text-2xl font-light text-orange-500"
        >
          {currentMessage}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default TextLoader;