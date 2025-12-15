import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'
import Footer from "./LandingPage/Footer"
import LandingSidebar from "./LandingPage/LandingSidebar/LandingSidebar"

// --- Framer Motion Variants for Staggered Animations ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 12 
    } 
  },
}

// Reusable Contact Card Component
const ContactCard = ({ icon, title, value }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(251, 146, 60, 0.2)" }} // Warm shadow on hover
    className="flex items-start gap-5 bg-white p-6 rounded-2xl shadow-lg border border-orange-50 transition duration-300"
  >
    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-orange-100 text-orange-600 text-2xl flex-shrink-0">
      {icon}
    </div>
    <div className='text-left'>
      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
      <p className="text-lg font-bold text-gray-800 break-words">{value}</p>
    </div>
  </motion.div>
)


const ContactUs = () => {

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real application, you would send this data to a server
    console.log(form)
    alert("Thank you! Your message has been sent successfully.")
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-orange-50 relative overflow-hidden font-sans">

    <LandingSidebar />

      {/* HERO SECTION */}
      <section className="relative py-32 bg-gradient-to-br from-white via-orange-50 to-amber-50 overflow-hidden">

        {/* Decorative Orbs (Enhanced) */}
        <div className="absolute -top-10 left-0 w-[450px] h-[450px] bg-orange-200/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-200/40 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight
                       bg-gradient-to-r from-orange-600 to-amber-500
                       bg-clip-text text-transparent"
          >
            Connect with Avyakt Ehsaas
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-3xl mx-auto text-xl text-gray-700"
          >
            We are here to support your journey towards calm, clarity, and inner peace. Let's talk.
          </motion.p>
        </div>
      </section>


      {/* MAIN CONTENT - CONTACT GRID */}
      <section className="py-24 relative z-20">

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">

          {/* LEFT - DETAILS */}
          <div className="space-y-6">

            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-8 text-gray-800"
            >
              Our Details
            </motion.h2>

            <motion.div 
              className='space-y-6'
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
              viewport={{ once: true }}
            >
              <ContactCard
                icon={<FiMail />}
                title="Email Support"
                value="support@avyakt.com"
              />

              <ContactCard
                icon={<FiPhone />}
                title="Call or Message"
                value="+91 98765 43210"
              />

              <ContactCard
                icon={<FiMapPin />}
                title="Location"
                value="Global (Online Sessions Only)"
              />
            </motion.div>

          </div>


          {/* RIGHT - FORM */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-3xl shadow-2xl shadow-orange-100 space-y-7 border border-orange-50"
          >

            <h3 className="text-3xl font-bold mb-4 text-gray-800">
              Send us a message
            </h3>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition duration-200"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition duration-200"
            />

            <textarea
              name="message"
              rows="6"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message or Question"
              required
              className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none transition duration-200"
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2
                         bg-gradient-to-r from-orange-500 to-amber-500
                         text-white py-4 rounded-full font-bold text-lg
                         shadow-lg shadow-orange-300/60 transition duration-300"
            >
              Send Message <FiSend className='ml-1' />
            </motion.button>

          </motion.form>
        </div>
      </section>

      <Footer />
      {/* Add necessary Tailwind keyframes for the blob animation if using this feature */}
      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
        .animation-delay-4000 {
            animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default ContactUs;