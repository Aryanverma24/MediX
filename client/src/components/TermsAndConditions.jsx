// Update TermsAndConditions.jsx
import React, { useEffect } from 'react';
import { useNavigate , Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import { ArrowLeft, ScrollText } from 'lucide-react';

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.2, 0.6, 0.3, 1],
        delay: i * 0.05
      }
    })
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

return (
  <motion.div 
    initial="hidden"
    animate="visible"
    className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
  >
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Floating back button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed top-6 left-6 z-10"
      >
        <Button
          asChild
          className="backdrop-blur-lg bg-white/80 hover:bg-white text-gray-800 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
        >
          <Link to="/" className="flex items-center">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Home
          </Link>
        </Button>
      </motion.div>
      <motion.div 
        className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.6, 0.3, 1] }}
      >
        {/* Header with gradient */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-90"></div>
          <motion.div 
            className="relative z-10 p-8 md:p-12 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col items-center text-center">
              <motion.div 
                className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                <ScrollText className="w-8 h-8" />
              </motion.div>
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-4"
                variants={fadeIn}
              >
                Terms & Conditions
              </motion.h1>
              <motion.p 
                className="text-blue-100 text-lg max-w-2xl"
                variants={fadeIn}
              >
                Last updated: {currentDate}
              </motion.p>
            </div>
          </motion.div>
        </div>
        {/* Content - Removed max-height and overflow to fix double scrollbar */}
        <motion.div 
          className="p-8 md:p-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="prose prose-blue max-w-none space-y-10">
            {/* Introduction */}
            <motion.div 
              variants={itemVariants}
              custom={1}
              className="bg-gray-50 p-6 rounded-xl border border-gray-100"
            >
              <motion.p className="text-lg text-gray-700 leading-relaxed">
                Welcome to <span className="font-bold text-blue-600">Avyakt-Ehsaas</span>. By accessing or using our meditation app and services, you agree to comply with and be bound by the following Terms & Conditions. Please read them carefully.
              </motion.p>
            </motion.div>
            {/* Terms sections */}
            {sections.map((section, index) => (
              <motion.div 
                key={section.title}
                variants={itemVariants}
                custom={index + 2}
                className="group"
                whileHover={{ 
                  scale: 1.005,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div 
                  className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <motion.h2 
                    className="text-2xl font-semibold text-gray-800 mb-4 flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="mr-3 text-blue-500">{index + 1}.</span>
                    {section.title}
                  </motion.h2>
                  <div className="mt-2 text-gray-600 space-y-4">
                    {section.content}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  </motion.div>
);
};

const sections = [
  {
    title: "Acceptance of Terms",
    content: (
      <p>By using this app, you confirm that you have read, understood, and agree to these Terms & Conditions. If you do not agree, please do not use our services.</p>
    )
  },
  {
    title: "Eligibility",
    content: (
      <ul className="list-disc pl-6 space-y-2">
        <li>You must be at least 18 years old or have parental consent to use this app.</li>
        <li>You agree to provide accurate and complete information when creating an account.</li>
      </ul>
    )
  },
  {
    title: "Use of the App",
    content: (
      <ul className="list-disc pl-6 space-y-2">
        <li>This app is intended for meditation, relaxation, and wellness purposes only.</li>
        <li>It is not a medical or therapeutic service and does not replace professional medical advice.</li>
      </ul>
    )
  },
  {
    title: "User Responsibilities",
    content: (
      <div className="space-y-2">
        <p>You agree not to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Use the app for any illegal or harmful activity</li>
          <li>Upload or share offensive, abusive, or misleading content</li>
          <li>Attempt to hack, disrupt, or misuse the app or its services</li>
        </ul>
      </div>
    )
  },
  {
    title: "Content & Intellectual Property",
    content: (
      <ul className="list-disc pl-6 space-y-2">
        <li>All content including audio, videos, text, graphics, logos, and design belongs to <span className="font-semibold text-blue-600">Avyakt-Ehsaas</span>.</li>
        <li>You may not copy, distribute, or reproduce any content without permission.</li>
      </ul>
    )
  },
  {
    title: "Subscription & Payments",
    content: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Some features may require payment or subscription.</li>
        <li>All payments are non-refundable unless stated otherwise.</li>
        <li>Prices may change at any time with prior notice.</li>
      </ul>
    )
  },
  {
    title: "Third-Party Services",
    content: (
      <p>We may use third-party services (e.g., payment gateways, analytics tools). We are not responsible for their policies or actions.</p>
    )
  },
  {
    title: "Account Termination",
    content: (
      <p>We reserve the right to suspend or terminate accounts that violate these terms without prior notice.</p>
    )
  },
  {
    title: "Limitation of Liability",
    content: (
      <div className="space-y-2">
        <p>We are not responsible for:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Any emotional, physical, or mental outcomes from using the app</li>
          <li>Temporary unavailability or technical issues</li>
        </ul>
        <p className="italic mt-2">Use the app at your own discretion.</p>
      </div>
    )
  },
  {
    title: "Changes to Terms",
    content: (
      <p>We may update these Terms & Conditions at any time. Continued use of the app means acceptance of updated terms.</p>
    )
  },
  {
    title: "Governing Law",
    content: (
      <p>These terms are governed by the laws of India.</p>
    )
  },
  {
    title: "Contact Us",
    content: (
      <div className="flex items-center gap-2">
        <span>📧</span>
        <a 
          href="mailto:support@medix.app" 
          className="text-blue-600 hover:underline"
        >
          support@avyaktehsaas.app
        </a>
      </div>
    )
  }
];

export default TermsAndConditions;