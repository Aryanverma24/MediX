import React from "react"
import { motion } from "framer-motion"
import { FaBrain, FaUsers, FaLeaf, FaClock } from "react-icons/fa"
import { Sparkles, Heart, ShieldCheck } from "lucide-react"
import Footer from "./LandingPage/Footer"
import LandingSidebar from "./LandingPage/LandingSidebar/LandingSidebar"
import AboutUsImage from "../assets/aboutUs.webp"
import BrainBackground from "./BrainBackground"

/* ================= Framer Motion Variants ================= */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
}

/* ================= MAIN COMPONENT ================= */

const AboutUs = () => {
  return (
    <div className="relative bg-white overflow-hidden font-sans">
      <LandingSidebar />

      <BrainBackground />

      {/* ===== GLOBAL SOFT ORANGE BLOBS ===== */}
      <div className="pointer-events-none absolute -top-[200px] -left-[200px] w-[500px] h-[500px] bg-orange-300/30 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute top-[40%] -right-[250px] w-[550px] h-[550px] bg-amber-300/25 blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute -bottom-[200px] left-[20%] w-[600px] h-[600px] bg-orange-200/30 blur-[160px] rounded-full" />

      {/* ===================================== */}
      {/* 🌟 HERO SECTION */}
      {/* ===================================== */}
      <section className="relative min-h-[95vh] flex items-center bg-white overflow-hidden">
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* LEFT TEXT */}
          <div className="text-center md:text-left">
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-extrabold leading-tight
              bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent"
            >
              A Conscious Space for Your Journey Home
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-xl text-gray-700 max-w-xl"
            >
              Avyakt Ehsaas is a conscious meditation and neuroscience platform
              designed to bring clarity, emotional healing, and deep self-awareness.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex gap-5 justify-center md:justify-start flex-wrap"
            >
              <button className="px-10 py-4 bg-orange-500 text-white rounded-full font-bold shadow-lg shadow-orange-300/50 hover:bg-orange-600 transition">
                Start Your Journey
              </button>
              <button className="px-10 py-4 border-2 border-orange-400 text-orange-600 rounded-full font-bold hover:bg-orange-50 transition">
                Explore Programs
              </button>
            </motion.div>
          </div>

          {/* RIGHT IMAGE */}
          <motion.div
            variants={itemVariants}
            className="relative flex justify-center"
          >
            <img
              src={AboutUsImage}
              alt="Meditation Illustration"
              className="w-[90%] max-w-md drop-shadow-2xl"
            />
            <div className="absolute inset-0 bg-orange-300/20 blur-3xl rounded-full -z-10" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===================================== */}
      {/* 🧠 CORE PILLARS */}
      {/* ===================================== */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold mb-4 text-gray-800"
          >
            Our Core Pillars
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-4xl mx-auto mb-16"
          >
            We unite ancient wisdom with modern science to support true mental peace and higher consciousness.
          </motion.p>

          <motion.div
            className="grid md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
          >
            <Feature icon={<FaBrain />} title="Neuro-Integrated" desc="Meditation guided through scientific, brain-based techniques for lasting change." />
            <Feature icon={<FaClock />} title="Daily Consistency" desc="Simple, short practices that build long-term clarity and discipline." />
            <Feature icon={<FaUsers />} title="Conscious Community" desc="Heal and grow together in a safe and supportive space." />
            <Feature icon={<FaLeaf />} title="Inner Alchemy" desc="Reconnect with your authentic self and emotional balance." />
          </motion.div>
        </div>
      </section>

      {/* ===================================== */}
      {/* ✨ HOW IT WORKS */}
      {/* ===================================== */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2 className="text-4xl font-extrabold mb-4 text-gray-800">
            Your Path to Clarity
          </motion.h2>

          <motion.div className="mt-16 grid md:grid-cols-3 gap-12">
            <Step num="01" title="Begin Your Insight" desc="Sign up and access your personalized self-healing program." />
            <Step num="02" title="Daily Presence" desc="Practice mindful meditation consistently." />
            <Step num="03" title="Deep Transformation" desc="Experience clarity, peace, and confidence." />
          </motion.div>
        </div>
      </section>

      {/* ===================================== */}
      {/* 💖 BENEFITS */}
      {/* ===================================== */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div className="grid md:grid-cols-3 gap-10">
            <Benefit icon={<Sparkles />} title="Conscious Guidance" desc="Live & on-demand meditation sessions." />
            <Benefit icon={<Heart />} title="Authentic Healing" desc="Release stress and emotional blocks." />
            <Benefit icon={<ShieldCheck />} title="Mental Resilience" desc="Strengthen focus and emotional balance." />
          </motion.div>
        </div>
      </section>

      {/* ===================================== */}
      {/* 📢 FINAL CTA */}
      {/* ===================================== */}
      <section className="relative py-28 bg-white text-center overflow-hidden">
        <div className="absolute inset-0 bg-orange-200/40 blur-[150px] rounded-full" />

        <motion.h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
          This is your time to awaken.
        </motion.h2>

        <motion.p className="max-w-3xl mx-auto text-xl text-gray-700">
          Join Avyakt Ehsaas and begin your transformation journey today.
        </motion.p>

        <motion.button className="mt-12 px-12 py-4 bg-orange-500 text-white rounded-full font-extrabold shadow-xl shadow-orange-300/50 hover:scale-105 transition">
          Begin Now
        </motion.button>
      </section>

      <Footer />
    </div>
  )
}

export default AboutUs

/* ================= SUB COMPONENTS ================= */

const Feature = ({ icon, title, desc }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.03 }}
    className="bg-white p-8 rounded-3xl border border-gray-100"
  >
    <div className="text-orange-500 text-5xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </motion.div>
)

const Step = ({ num, title, desc }) => (
  <motion.div className="bg-white p-8 rounded-3xl border-t-4 border-orange-500 shadow-xl">
    <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 font-extrabold text-2xl">
      {num}
    </div>
    <h3 className="text-2xl font-bold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </motion.div>
)

const Benefit = ({ icon, title, desc }) => (
  <motion.div className="bg-white p-8 rounded-3xl border border-dashed border-orange-300 shadow-md">
    <div className="text-orange-500 text-5xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </motion.div>
)
