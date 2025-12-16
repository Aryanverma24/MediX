import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'
import Footer from "./LandingPage/Footer"
import LandingSidebar from "./LandingPage/LandingSidebar/LandingSidebar"
import ContactImage from '../assets/contactUs.jpg'

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.5 } }
}

const ContactCard = ({ icon, title, value }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -2 }}
    className="flex items-center gap-4 bg-white rounded-xl px-4 py-3 border border-gray-200 shadow-sm"
  >
    <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-orange-100 text-orange-600 text-base">
      {icon}
    </div>
    <div>
      <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">{title}</p>
      <p className="text-sm font-medium text-gray-800">{value}</p>
    </div>
  </motion.div>
)

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you! Your message has been sent.')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-orange-50">
      <LandingSidebar />

      {/* Page Heading */}
      <section className="pt-28 pb-16 text-center max-w-4xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900"
        >
          Contact <span className="text-orange-500">Avyakt Ehsaas</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-3 text-base text-gray-600"
        >
          We'd love to hear from you. Reach out for programs, partnerships, or general queries.
        </motion.p>
      </section>

      {/* Cards + Image */}
      <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          <ContactCard icon={<FiMail />} title="Email" value="support@avyaktehsaas.com" />
          <ContactCard icon={<FiPhone />} title="Phone" value="+91 98765 43210" />
          <ContactCard icon={<FiMapPin />} title="Office" value="Gurgaon, Haryana, India" />
        </motion.div>

        {/* Right: Animated Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <motion.img
            src={ContactImage}
            alt="Meditation"
            className="w-full max-w-md rounded-3xl shadow-lg"
            whileHover={{ scale: 1.03 }}
          />
        </motion.div>
      </section>

      {/* Map + Form */}
      <section className="max-w-7xl mx-auto px-6 mt-24 pb-28 grid lg:grid-cols-2 gap-16 items-start">
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm h-[420px]"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d877.1040859706244!2d77.11484605038952!3d28.436863216602035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1f4f89848ec1%3A0x148665ba85b67df2!2sAvyakt%20Ehsaas!5e0!3m2!1sen!2sin!4v1765907719727!5m2!1sen!2sin"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 border border-gray-200 shadow-md space-y-5"
        >
          <h3 className="text-2xl font-semibold text-gray-900">Send a Message</h3>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
          />

          <textarea
            name="message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500 outline-none resize-none"
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2"
          >
            Send Message <FiSend />
          </motion.button>
        </motion.form>
      </section>

      <Footer />
    </div>
  )
}

export default ContactUs;