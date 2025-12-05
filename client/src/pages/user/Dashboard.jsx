import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { motion , AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import TestimonialCarousel from '../LandingPage/TestimonialCarousel';
import FAQJoin from '../LandingPage/FAQJoin';
import Footer from '../LandingPage/Footer';
import AboutFounder from '../../components/AboutFounder';
import YearLongJourney from '../../components/YearLongJourney';
import { FiClock, FiCalendar, FiRefreshCw, FiBookOpen, FiPlay , FiSun, FiCpu, FiHeart, FiTarget , FiActivity , FiZap } from "react-icons/fi";
import SubscriptionPricing from '../../components/SubscriptionPricing';
import BeyondTrialSection from '../../components/BeyondTrialSection';
import { useAuth } from '../../hooks/useAuth';


const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const {fetchMe} =useAuth();

  const phrases = [
    "Sleep",
    "Mental Health",
    "Anxiety",
    "Stress",
    "Depression"
  ];

  useEffect(() => {
    fetchMe();
  },[])

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

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
      particle.className = 'absolute w-1.5 h-1.5 bg-orange-500 rounded-full animate-float';

      particle.style.left = `${Math.random() * 100}%`;
      particle.style.bottom = `-${Math.random() * 200}px`;
      particle.style.animationDuration = `${6 + Math.random() * 12}s`;
      particle.style.animationDelay = `${Math.random() * 0.5}s`;
      particle.style.opacity = Math.random();

      container.appendChild(particle);
    }
  }, []);

  return (
    <div className="min-h-screen pt-[8rem] md:pt-0 overflow-hidden relative bg-white">

      {/* HERO SECTION */}
      <div className="relative max-w-7xl mx-auto px-6 pb-12 md:pt-18 bg-white">

        {/* Particles */}
        <div
          id="particles"
          className="absolute inset-0 overflow-hidden pointer-events-none"
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
            <div className="absolute w-64 h-64 md:w-[420px] md:h-[420px] rounded-full border-2 border-orange-400/30 wave-ring">
              <div className="absolute inset-8 md:inset-10 rounded-full border-2 border-orange-500 wave-ring"></div>
              <div className="absolute inset-16 md:inset-20 rounded-full border-2 border-orange-300/20 wave-ring"></div>
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




;

<section className="relative py-28 bg-gradient-to-br from-[#fffff] via-[#fff3e6] to-[#ffffff] overflow-hidden">

  {/* Background Visual Tech (Warm Blur Orbs) */}
  <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/30 rounded-full blur-5xl" />
  <div className="absolute top-1/3 -right-24 w-96 h-96 bg-orange/10 rounded-full blur-5xl" />
  <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-white/30 rounded-full blur-5xl" />

  {/* Grid Overlay */}
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#fb923c15_1px,transparent_1px),linear-gradient(to_bottom,#fb923c15_1px,transparent_1px)] bg-[size:55px_55px]" />

  <div className="relative max-w-6xl mx-auto px-6 text-center">

    <motion.h2
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent"
    >
      Program Overview
    </motion.h2>

    <p className="text-gray-600 mb-16 max-w-3xl mx-auto text-lg">
      A science-backed, soul-driven system designed to bring clarity, peace, happiness and abundance into your daily life.
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">

      {[
        {
          title: "Daily Guided Sessions",
          desc: "15–20 minute live meditation every evening at 9 PM IST",
          icon: <FiClock />
        },
        {
          title: "Session Recordings",
          desc: "All sessions stay available to you for 7 days",
          icon: <FiPlay />
        },
        {
          title: "21-Day Free Trial",
          desc: "Complete access for 21 days before any payment is taken",
          icon: <FiCalendar />
        },
        {
          title: "Flexible Subscriptions",
          desc: "Affordable plans — every plan unlocks full content",
          icon: <FiRefreshCw />
        },
        {
          title: "Holistic Practices",
          desc: "Includes journaling, affirmations & gratitude practices",
          icon: <FiBookOpen />
        },
        {
          title: "Scientific Collaboration",
          desc: "Aligned with research from IKSMHA Centre, IIT Mandi",
          icon: <FiCpu />
        }
      ].map((item, i) => (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
          key={i}
          className="group relative bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.10)] hover:shadow-[0_30px_90px_-20px_rgba(251,146,60,0.50)] hover:-translate-y-2 transition-all duration-500"
        >

          {/* Icon */}
          <div className="w-14 h-14 mb-5 flex items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white text-2xl shadow-lg group-hover:scale-110 transition duration-300">
            {item.icon}
          </div>

          <h3 className="font-semibold text-xl mb-2 text-gray-900">
            {item.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {item.desc}
          </p>

          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition" />

        </motion.div>
      ))}
    </div>

    {/* CTA */}
    <motion.a
      href="#pricing"
      whileHover={{ scale: 1.05 }}
      className="inline-block mt-20 px-10 py-4 text-lg rounded-full font-medium bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xl hover:shadow-orange-500/40 transition-all"
    >
      View Pricing Plans
    </motion.a>

  </div>
</section>

{/* BENEFITS SECTION (MODERN WARM TECH) */}
<section className="relative py-28 bg-white overflow-hidden">

  {/* Warm Blur Orbs */}
  <div className="absolute top-10 left-10 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />
  <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />

  {/* Subtle Tech Grid */}
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#fb923c12_1px,transparent_1px),linear-gradient(to_bottom,#fb923c12_1px,transparent_1px)] bg-[size:60px_60px]" />

  <div className="relative max-w-6xl mx-auto px-6 text-center">

    <motion.h2
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-4xl md:text-5xl font-bold mb-20 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent"
    >
      Benefits of Regular Meditation
    </motion.h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 text-left">

      {[
        {
          title: "Reduced Stress",
          desc: "Feel calmer, grounded and centered every single day",
          icon: <FiSun />
        },
        {
          title: "Better Memory",
          desc: "Improved focus and faster information processing",
          icon: <FiCpu />
        },
        {
          title: "Emotional Balance",
          desc: "Stronger emotional control and peace within",
          icon: <FiHeart />
        },
        {
          title: "Self Awareness",
          desc: "Clarity, purpose and deep inner focus",
          icon: <FiTarget />
        },
      ].map((item, i) => (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
          key={i}
          className="
            group
            relative
            bg-white/70
            backdrop-blur-xl
            p-8
            rounded-3xl
            border border-orange-100
            shadow-[0_15px_40px_-20px_rgba(0,0,0,0.2)]
            hover:shadow-[0_25px_70px_-20px_rgba(251,146,60,0.45)]
            hover:-translate-y-2
            transition-all
            duration-500
          "
        >

          {/* Icon Box */}
          <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white text-2xl shadow-lg group-hover:scale-110 transition">
            {item.icon}
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            {item.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {item.desc}
          </p>

          {/* Bottom Accent */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition" />

        </motion.div>
      ))}
    </div>

  </div>
</section>

{/* 21-DAY FREE TRIAL – MODERN TECH LOOK */}
<section className="relative py-28 bg-white overflow-hidden">


  <div className="relative max-w-6xl mx-auto px-6">

    <motion.h2
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center text-4xl md:text-5xl font-bold mb-20 
      bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent"
    >
      Your 21–Day Free Journey
    </motion.h2>

  

    <div className="grid md:grid-cols-3 gap-12 relative">

      {[
        {
          week: "Week 1",
          title: "Days 1–7",
          desc: "Breath awareness, body scan, daily gratitudes",
          icon: <FiSun />
        },
        {
          week: "Week 2",
          title: "Days 8–14",
          desc: "Emotional observation, journaling and affirmations",
          icon: <FiActivity />
        },
        {
          week: "Week 3",
          title: "Days 15–21",
          desc: "Mind rewiring, abundance and compassion meditation",
          icon: <FiZap />
        },
      ].map((phase, i) => (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: i * 0.15 }}
          viewport={{ once: true }}
          key={i}
          className="
            group
            relative
            bg-white/70
            backdrop-blur-xl
            p-10
            rounded-3xl
            border border-orange-100
            shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]
            hover:shadow-[0_30px_70px_-20px_rgba(251,146,60,0.5)]
            hover:-translate-y-2
            transition-all 
            duration-500
            text-center
          "
        >

          {/* Top Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl
              bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg
              group-hover:scale-110 transition">
              {phase.icon}
            </div>
          </div>

          {/* Week Tag */}
          <span className="inline-block mb-4 px-4 py-1 rounded-full 
          bg-orange-100 text-orange-600 text-sm font-semibold">
            {phase.week}
          </span>

          <h3 className="text-2xl font-semibold mb-3 text-gray-800">
            {phase.title}
          </h3>

          <p className="text-gray-600 leading-relaxed">
            {phase.desc}
          </p>

          {/* bottom glow line */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition" />

        </motion.div>
      ))}

    </div>

  </div>
</section>

<YearLongJourney />

<BeyondTrialSection />

<SubscriptionPricing />


<AboutFounder className='my-4'/>



<TestimonialCarousel />

<FAQJoin />

<Footer />

    </div>
  );
};

export default Dashboard;
