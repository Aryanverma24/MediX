import React, { useState } from "react"
import { motion } from "framer-motion"
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi"
import LandingSidebar from "./LandingPage/LandingSidebar/LandingSidebar"
import Footer from "./LandingPage/Footer"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const ContactCard = ({ icon, title, value }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -4 }}
    className="flex gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500 text-xl">
      {icon}
    </div>
    <div>
      <p className="text-xs uppercase tracking-wide text-gray-500">{title}</p>
      <p className="mt-1 text-lg font-semibold text-gray-900">{value}</p>
    </div>
  </motion.div>
)

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Message sent successfully ✨")
    setForm({ name: "", email: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900">
      <LandingSidebar />

      {/* HERO */}
      <section className="pt-32 pb-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-5xl md:text-6xl font-semibold tracking-tight"
          >
            Let’s Talk
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 max-w-2xl mx-auto text-lg text-gray-600"
          >
            Whether you have a question, collaboration idea, or just want to say
            hello — we’d love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="pb-32">
        <div className="mx-auto max-w-6xl px-6 grid gap-16 md:grid-cols-2">

          {/* LEFT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-semibold">
              Contact Information
            </h2>

            <ContactCard
              icon={<FiMail />}
              title="Email"
              value="support@avyakt.com"
            />

            <ContactCard
              icon={<FiPhone />}
              title="Phone"
              value="+91 98765 43210"
            />

            <ContactCard
              icon={<FiMapPin />}
              title="Location"
              value="Online · Worldwide"
            />
          </motion.div>

          {/* RIGHT FORM */}
          <motion.form
            onSubmit={handleSubmit}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="rounded-3xl bg-white border border-gray-200 p-10 shadow-sm"
          >
            <h3 className="text-2xl font-semibold mb-8">
              Send a Message
            </h3>

            <div className="space-y-5">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="w-full rounded-xl border border-gray-300 px-5 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your email"
                required
                className="w-full rounded-xl border border-gray-300 px-5 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
              />

              <textarea
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                placeholder="Your message"
                required
                className="w-full rounded-xl border border-gray-300 px-5 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none resize-none transition"
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="mt-4 w-full flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-4 text-white font-semibold shadow hover:bg-orange-600 transition"
              >
                Send Message <FiSend />
              </motion.button>
            </div>
          </motion.form>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ContactUs
