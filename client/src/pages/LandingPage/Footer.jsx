import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-orange-50 via-white to-orange-100 text-stone-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        {/* Brand info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Avyakt <span className="text-orange-600">Ehsaas</span>
          </h2>

          <p className="text-sm leading-relaxed text-stone-600">
            Meditation backed by neuroscience.  
            Heal your mind, awaken your soul, and align your energy with the
            universe.
          </p>

          <div className="flex gap-4 mt-6 text-xl">
            {[
              <FaFacebookF />,
              <FaInstagram />,
              <FaLinkedinIn />,
              <FaTwitter />
            ].map((icon, i) => (
              <span
                key={i}
                className="p-2 bg-white rounded-full shadow hover:bg-orange-500 hover:text-white transition cursor-pointer"
              >
                {icon}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm text-stone-700">
            <li className="hover:text-orange-600 cursor-pointer">Home</li>
            <li className="hover:text-orange-600 cursor-pointer">About</li>
            <li className="hover:text-orange-600 cursor-pointer">Programs</li>
            <li className="hover:text-orange-600 cursor-pointer">Testimonials</li>
            <li className="hover:text-orange-600 cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Programs */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Our Programs</h3>
          <ul className="space-y-3 text-sm text-stone-700">
            <li className="hover:text-orange-600 cursor-pointer">Live Meditation</li>
            <li className="hover:text-orange-600 cursor-pointer">Breath Healing</li>
            <li className="hover:text-orange-600 cursor-pointer">Chakra Activation</li>
            <li className="hover:text-orange-600 cursor-pointer">Stress Detox</li>
            <li className="hover:text-orange-600 cursor-pointer">1 on 1 Guidance</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Contact Us</h3>

          <div className="flex items-center gap-3 mb-3 text-sm">
            <FaEnvelope className="text-orange-500" />
            <span>support@avyaktehsaas.com</span>
          </div>

          <div className="flex items-center gap-3 mb-3 text-sm">
            <FaPhoneAlt className="text-orange-500" />
            <span>+91 98765 43210</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <FaMapMarkerAlt className="text-orange-500" />
            <span>India</span>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-orange-200 mt-12"></div>

      {/* Copyright */}
      <p className="text-center text-sm text-stone-600 mt-6">
        &copy; {" "}
        { new Date().getFullYear()} Avyakt Ehsaas • All rights reserved • Member of Google Startups
      </p>
    </footer>
  );
};

export default Footer;
