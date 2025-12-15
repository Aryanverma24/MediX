import React from "react"
import { motion } from "framer-motion"
import { FaBrain, FaUsers, FaLeaf, FaClock } from "react-icons/fa"
import { Sparkles, Heart, ShieldCheck } from "lucide-react"
import Footer from "./LandingPage/Footer" // Assuming these components exist
import LandingSidebar from "./LandingPage/LandingSidebar/LandingSidebar" // Assuming these components exist

// --- Framer Motion Variants for Staggered Animations ---
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } },
}

const AboutUs = () => {
  return (
    <div className="bg-white overflow-hidden font-sans">
      <LandingSidebar />

      {/* ===================================== */}
      {/* 🌟 HERO SECTION (With Background Image Concept) */}
      {/* ===================================== */}
      <section className="relative min-h-[95vh] flex items-center justify-center text-center p-6 sm:p-10 bg-gradient-to-br from-orange-50 to-amber-50">
        
        {/* Background Image Placeholder and Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Use a clear, warm, nature-themed image for a real app */}
          <div className="absolute inset-0 bg-cover bg-center opacity-10"
               style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-orange-50/70 to-white/90" />
        </div>

        {/* Decorative Orbs (Enhanced Blur and Color) */}
        <div className="absolute -top-10 left-0 w-[400px] h-[400px] bg-amber-300/30 blur-3xl rounded-full animate-pulse-slow" />
        <div className="absolute bottom-10 right-0 w-[300px] h-[300px] bg-orange-200/40 blur-3xl rounded-full animate-pulse-slow delay-500" />


        <motion.div 
          className="max-w-5xl relative z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-7xl font-extrabold leading-tight tracking-tighter
                       bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent"
          >
            A Conscious Space for Your Journey Home
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-xl text-gray-700 max-w-3xl mx-auto"
          >
            Avyakt Ehsaas is a conscious meditation and neuroscience platform
            designed to bring clarity, emotional healing, and deep self-awareness.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-12 flex justify-center gap-6 flex-wrap">
            <button className="px-10 py-4 bg-orange-500 text-white rounded-full font-bold shadow-lg shadow-orange-300/50 hover:bg-orange-600 transform hover:scale-[1.02] transition duration-300">
              Start Your Journey
            </button>
            <button className="px-10 py-4 border-2 border-orange-400 text-orange-600 rounded-full font-bold hover:bg-orange-50 transition duration-300">
              Explore Programs
            </button>
          </motion.div>

        </motion.div>
      </section>

      {/* ===================================== */}
      {/* 🧠 WHO WE ARE (Values/Features) */}
      {/* ===================================== */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-4xl font-extrabold mb-4 text-gray-800"
          >
            Our Core Pillars
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-4xl mx-auto mb-16"
          >
            We unite ancient wisdom with modern science to support true mental peace and higher consciousness.
          </motion.p>

          {/* VALUES GRID */}
          <motion.div 
            className="grid md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Feature
              icon={<FaBrain />}
              title="Neuro-Integrated"
              desc="Meditation guided through scientific, brain-based techniques for lasting change."
            />

            <Feature
              icon={<FaClock />}
              title="Daily Consistency"
              desc="Simple, short practices that build long-term clarity, discipline, and flow."
            />

            <Feature
              icon={<FaUsers />}
              title="Conscious Community"
              desc="Heal and grow together in a safe, non-judgmental, and deeply supportive space."
            />

            <Feature
              icon={<FaLeaf />}
              title="Inner Alchemy"
              desc="Reconnect with your authentic self and cultivate profound emotional balance."
            />
          </motion.div>
        </div>
      </section>


      {/* ===================================== */}
      {/* ✨ HOW IT WORKS (Steps) */}
      {/* ===================================== */}
      <section className="bg-amber-50 py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold mb-4 text-gray-800"
          >
            Your Path to Clarity
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            From confusion to clarity – your transformation starts with these three simple steps.
          </motion.p>

          <motion.div 
            className="mt-16 grid md:grid-cols-3 gap-12"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Step
              num="01"
              title="Begin Your Insight"
              desc="Sign up and access your personalized self-healing program and resources."
            />

            <Step
              num="02"
              title="Daily Presence"
              desc="Practice mindful meditation through live or recorded sessions to build awareness."
            />

            <Step
              num="03"
              title="Deep Transformation"
              desc="Integrate clarity, experience inner peace, and step into quiet confidence."
            />
          </motion.div>
        </div>
      </section>


      {/* ===================================== */}
      {/* 💖 PROGRAMS & BENEFITS */}
      {/* ===================================== */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold mb-4 text-gray-800"
          >
            What You Will Gain
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-16"
          >
            A journey designed for modern minds seeking stillness in a restless world.
          </motion.p>

          <motion.div 
            className="grid md:grid-cols-3 gap-10"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Benefit
              icon={<Sparkles />}
              title="Conscious Guidance"
              desc="Live & on-demand sessions specifically designed for deep, restorative inner peace."
            />

            <Benefit
              icon={<Heart />}
              title="Authentic Healing"
              desc="Tools to compassionately release stress, emotional baggage, and negative patterns."
            />

            <Benefit
              icon={<ShieldCheck />}
              title="Mental Resilience"
              desc="Techniques to strengthen focus, enhance emotional regulation, and find inner balance."
            />
          </motion.div>
        </div>
      </section>


      {/* ===================================== */}
      {/* 📢 FINAL MESSAGE (CTA Banner) */}
      {/* ===================================== */}
      <section className="bg-gradient-to-br from-orange-500 to-amber-500 py-28 text-white text-center">

        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold mb-6 tracking-tight"
        >
          This is your time to awaken.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-3xl mx-auto text-xl"
        >
          Join Avyakt Ehsaas and begin your transformation journey today. 
          A peaceful mind is the greatest power you possess.
        </motion.p>

        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 px-12 py-4 bg-white text-orange-600 rounded-full font-extrabold text-lg shadow-2xl hover:scale-105 transition duration-300"
        >
          Begin Now
        </motion.button>

      </section>

      <Footer />

    </div>
  )
}

export default AboutUs



/* ================= COMPONENTS (Updated for style/animation) ================= */

const Feature = ({ icon, title, desc }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(251, 146, 60, 0.3)" }} // Warm shadow on hover
    className="bg-white p-8 rounded-3xl border border-gray-100 text-center transition duration-300"
  >
    <div className="text-orange-500 text-5xl mb-4 mx-auto w-fit">{icon}</div>
    <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </motion.div>
)

const Step = ({ num, title, desc }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }} // Lift on hover
    className="bg-white p-8 rounded-3xl text-center border-t-4 border-orange-500 shadow-xl transition duration-300"
  >
    {/* Modern Step Number Circle */}
    <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 font-extrabold text-2xl border-4 border-orange-200">
      {num}
    </div>
    <h3 className="text-2xl font-bold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </motion.div>
)

const Benefit = ({ icon, title, desc }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.03, backgroundColor: '#fff7ed' }} // Subtle background shift on hover
    className="bg-white p-8 rounded-3xl border border-dashed border-orange-300 shadow-md transition duration-300"
  >
    <div className="text-orange-500 text-5xl mb-4 mx-auto w-fit">{icon}</div>
    <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </motion.div>
)