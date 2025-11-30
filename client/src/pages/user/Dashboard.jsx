import React, { useState, useEffect } from 'react';
import {
  FiCalendar,
  FiClock,
  FiUsers,
  FiVideo,
  FiFileText,
  FiBell,
  FiPlus
} from 'react-icons/fi';
import { motion , AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const phrases = [
    "Sleep",
    "Mental Health",
    "Anxiety",
    "Stress",
    "Depression"
  ];

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  // set index for phrase
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % phrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  /* -------- PARTICLES EFFECT -------- */
  useEffect(() => {
    const container = document.getElementById('particles');
    if (!container) return;

    container.innerHTML = '';

    for (let i = 0; i < 70; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-orange-400 rounded-full animate-float';

      particle.style.left = `${Math.random() * 100}%`;
      particle.style.bottom = `-${Math.random() * 200}px`;
      particle.style.animationDuration = `${6 + Math.random() * 12}s`;
      particle.style.animationDelay = `${Math.random() * 0.5}s`;
      particle.style.opacity = Math.random();

      container.appendChild(particle);
    }
  }, []);

  return (
    <div className="min-h-screen pt-[8rem] md:pt-0 overflow-hidden relative bg-[#fff8f1]">

      {/* HERO SECTION */}
      <div className="relative max-w-7xl mx-auto px-6 pb-12 md:pt-18">

        {/* Particles */}
        <div
          id="particles"
          className="absolute inset-0 overflow-hidden pointer-events-none bg-transparent"
        />

        <div className="px-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">

          {/* LEFT CONTENT */}
          <div className="text-center md:text-left">
            <motion.h1
              className="text-2xl md:text-5xl lg:text-6xl text-gray-900 font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Find a solution for <br />

              <AnimatePresence mode="wait">
                <motion.span
                  key={currentIndex}
                  className="text-orange-600 inline-block mt-2 md:mt-0"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  {phrases[currentIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-700 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Your journey to inner calm begins here.
            </motion.p>

            <div className="flex justify-center md:justify-start">
              <Link
                to="/join-meeting"
                className="inline-flex items-center px-6 py-3 rounded-full bg-white text-orange-700 font-medium shadow-lg hover:scale-105 transition-all"
              >
                <FiPlus className="mr-2" />
                Schedule Meeting
              </Link>
            </div>
          </div>

          {/* RIGHT ANIMATION */}
          <div className="relative w-full flex flex-col items-center justify-center min-h-[360px] md:min-h-[520px]">

            {/* Energy waves */}
            <div className="absolute w-64 h-64 md:w-[420px] md:h-[420px] rounded-full border-2 border-orange-400 border-opacity-30 wave-ring">
              <div className="absolute inset-8 md:inset-10 rounded-full border-2 border-orange-500 border-opacity-40 wave-ring"></div>
              <div className="absolute inset-16 md:inset-20 rounded-full border-2 border-orange-300 border-opacity-20 wave-ring"></div>
            </div>

            {/* Glow Core */}
            <div className="relative w-48 h-48 md:w-80 md:h-80 rounded-full glow-core flex items-center justify-center shadow-xl">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/055/775/377/small/meditation-pose-silhouette-zen-space-transparent-background-calm-environment-peaceful-viewpoint-mindfulness-concept-png.png"
                alt="Soul"
                className="w-28 md:w-48 animate-soul"
              />
            </div>

            {/* Bottom Text */}
            <div className="absolute bottom-4 md:bottom-10 text-center">
              <h2 className="text-2xl md:text-3xl text-amber-700 font-semibold tracking-wide">
                Inner Soul Energy
              </h2>
              <p className="text-orange-600 mt-2 font-medium md:text-base">
                Feel the calm. Embrace stillness.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* WELLNESS SECTION */}
      <section className="py-24 bg-gradient-to-b from-[#0B1220] to-[#1E293B] text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-6">Your Mental Wellness Journey</h2>
          <p className="text-orange-200 mb-14">
            Discover therapies designed to restore peace and balance in your life.
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Guided Meditation", icon: "🧘" },
              { title: "Sleep Therapy", icon: "🌙" },
              { title: "Anxiety Relief", icon: "🌿" },
              { title: "Focus Booster", icon: "☀️" },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg hover:scale-105 transition">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-medium">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 bg-[#020617] text-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10 text-center">
          {[
            { value: "32 hrs", label: "Meditated" },
            { value: "7 Days", label: "Streak" },
            { value: "14", label: "Sessions" },
            { value: "82%", label: "Mind Calm" },
          ].map((stat, i) => (
            <div key={i} className="p-8 rounded-2xl bg-white/5 backdrop-blur-lg">
              <h3 className="text-3xl text-orange-400 font-bold">{stat.value}</h3>
              <p className="text-orange-200">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Dashboard;
