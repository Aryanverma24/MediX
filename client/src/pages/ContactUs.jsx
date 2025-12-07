import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'
import Footer from "./LandingPage/Footer/jsx"
import LandingSidebar from "./LandingPage/LandingSidebar/LandingSidebar"

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
    console.log(form)
    alert("Message sent successfully!")
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">

    <LandingSidebar />

      {/* HERO */}
      <section className="relative py-24 bg-gradient-to-br from-white via-[#fff7ed] to-white overflow-hidden">

        {/* Decorative Orbs */}
        <div className="absolute -top-10 left-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 
                       bg-gradient-to-r from-orange-500 to-amber-500
                       bg-clip-text text-transparent"
          >
            Get in Touch
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-lg text-gray-600"
          >
            We are here to support your journey towards calm, clarity and mindfulness.
          </motion.p>
        </div>

      </section>


      {/* MAIN CONTENT */}
      <section className="py-24 relative">

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">

          {/* LEFT - DETAILS */}
          <div className="space-y-8">

            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold mb-6"
            >
              Contact Information
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-5 bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-lg"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-500 text-white text-xl">
                <FiMail />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg font-medium">support@avaykt.com</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-5 bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-lg"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-500 text-white text-xl">
                <FiPhone />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-lg font-medium">+91 98765 43210</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-5 bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-lg"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-500 text-white text-xl">
                <FiMapPin />
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-lg font-medium">India (Online Sessions)</p>
              </div>
            </motion.div>

          </div>


          {/* RIGHT - FORM */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-2xl space-y-6"
          >

            <h3 className="text-2xl font-semibold mb-4">
              Send us a message
            </h3>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-5 py-3 rounded-lg border border-orange-200 outline-orange-400"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full px-5 py-3 rounded-lg border border-orange-200 outline-orange-400"
            />

            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              className="w-full px-5 py-3 rounded-lg border border-orange-200 outline-orange-400 resize-none"
            />

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2
                         bg-gradient-to-r from-orange-500 to-amber-500
                         text-white py-3 rounded-full font-semibold
                         hover:scale-105 transition"
            >
              Send Message <FiSend />
            </button>

          </motion.form>
        </div>
      </section>

      <Footer />

    </div>
  )
}

export default ContactUs
