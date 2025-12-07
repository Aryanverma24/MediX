import React from "react"
import { motion } from "framer-motion"
import { FaBrain, FaUsers, FaLeaf, FaClock } from "react-icons/fa"
import { Sparkles, Heart, ShieldCheck } from "lucide-react"
import Footer from "../LandingPage/Footer"

const AboutUs = () => {
  return (
    <div className="bg-white overflow-hidden">

      {/* ===================================== */}
      {/* HERO SECTION */}
      {/* ===================================== */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-center bg-gradient-to-br from-[#fff7ed] via-[#fff] to-[#fef3c7]">

        {/* Orbs */}
        <div className="absolute -top-20 left-10 w-[400px] h-[400px] bg-orange-200/40 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-10 w-[350px] h-[350px] bg-emerald-200/40 blur-3xl rounded-full" />

        <div className="max-w-5xl px-6 relative z-10">

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold leading-tight
                       bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent"
          >
            A Safe Space for Your Mind, Body & Soul
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 text-xl text-gray-600"
          >
            Avaykt Ehsaas is a conscious meditation and neuroscience platform
            designed to bring clarity, healing, and deep self-awareness.
          </motion.p>

          <div className="mt-10 flex justify-center gap-6 flex-wrap">
            <button className="px-8 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition">
              Start Your Journey
            </button>
            <button className="px-8 py-3 border-2 border-orange-400 text-orange-500 rounded-full font-semibold hover:bg-orange-50 transition">
              Explore Programs
            </button>
          </div>

        </div>
      </section>

      {/* ===================================== */}
      {/* WHO WE ARE */}
      {/* ===================================== */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold mb-6"
          >
            Who We Are
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Avaykt Ehsaas is not just a meditation platform — it is a
            transformational journey. We unite ancient meditation practices
            with modern neuroscience to support mental peace, emotional healing,
            and higher consciousness.
          </motion.p>

        </div>

        {/* VALUES */}
        <div className="max-w-6xl mx-auto px-6 mt-16 grid md:grid-cols-4 gap-10">

          <Feature
            icon={<FaBrain />}
            title="Neuroscience Based"
            desc="Meditation guided through scientific brain-based techniques"
          />

          <Feature
            icon={<FaClock />}
            title="Daily Practice"
            desc="Consistency that builds long-term clarity & discipline"
          />

          <Feature
            icon={<FaUsers />}
            title="Supportive Community"
            desc="Heal and grow together in a safe conscious space"
          />

          <Feature
            icon={<FaLeaf />}
            title="Inner Healing"
            desc="Reconnect with your true self and emotional balance"
          />

        </div>
      </section>


      {/* ===================================== */}
      {/* HOW IT WORKS */}
      {/* ===================================== */}
      <section className="bg-[#fff7ed] py-24">

        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From confusion to clarity – your transformation starts here.
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-12">

            <Step
              num="1"
              title="Join the Platform"
              desc="Sign up and begin your self-healing journey"
            />

            <Step
              num="2"
              title="Attend Live Sessions"
              desc="Practice daily meditation & awareness"
            />

            <Step
              num="3"
              title="Transform Yourself"
              desc="Experience clarity, peace and confidence"
            />

          </div>
        </div>
      </section>


      {/* ===================================== */}
      {/* PROGRAMS & BENEFITS */}
      {/* ===================================== */}
      <section className="py-24">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold mb-6">
            Programs & Benefits
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            A journey designed for modern minds in a restless world.
          </p>

          <div className="grid md:grid-cols-3 gap-10 mt-16">

            <Benefit
              icon={<Sparkles />}
              title="Guided Meditations"
              desc="Live & recorded sessions for deep inner peace"
            />

            <Benefit
              icon={<Heart />}
              title="Emotional Healing"
              desc="Release stress, trauma and negative patterns"
            />

            <Benefit
              icon={<ShieldCheck />}
              title="Mind Protection"
              desc="Strengthen focus, resilience and balance"
            />

          </div>

        </div>

      </section>


      {/* ===================================== */}
      {/* FINAL MESSAGE */}
      {/* ===================================== */}
      <section className="bg-gradient-to-br from-orange-500 to-amber-500 py-24 text-white text-center">

        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-4xl font-bold mb-6"
        >
          This is your time to awaken.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-2xl mx-auto text-lg"
        >
          Join Avaykt Ehsaas and begin your transformation journey today.
          A peaceful mind is the greatest power.
        </motion.p>

        <button className="mt-10 px-10 py-3 bg-white text-orange-600 rounded-full font-bold hover:scale-105 transition">
          Join Now
        </button>

      </section>

      <Footer />

    </div>
  )
}

export default AboutUs



/* ================= COMPONENTS ================= */

const Feature = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white p-6 rounded-2xl shadow-md text-center"
  >
    <div className="text-orange-500 text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </motion.div>
)

const Step = ({ num, title, desc }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-2xl shadow-lg"
  >
    <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-orange-500 text-white font-bold">
      {num}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </motion.div>
)

const Benefit = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white p-8 rounded-2xl shadow-xl"
  >
    <div className="text-orange-500 text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </motion.div>
)
