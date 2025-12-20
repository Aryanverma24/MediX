// Create a new file at src/components/PrivacyPolicy.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import { ArrowLeft, ShieldCheck, Lock, User, Cookie, Shield } from 'lucide-react';

const PrivacyPolicy = () => {
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

  const sections = [
    {
      title: "Information We Collect",
      icon: <User className="w-5 h-5 mr-2" />,
      content: (
        <ul className="list-disc pl-6 space-y-2">
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number (if provided)</li>
          <li>App usage data</li>
          <li>Device information</li>
          <li>Cookies and IP address</li>
        </ul>
      )
    },
    {
      title: "How We Use Your Information",
      icon: <Shield className="w-5 h-5 mr-2" />,
      content: (
        <>
        <p>Your information is used to:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Create and manage your account</li>
          <li>Provide meditation content and services</li>
          <li>Improve user experience</li>
          <li>Send notifications, reminders, or updates</li>
        </ul>
        </>
      )
    },
    {
      title: "Cookies",
      icon: <Cookie className="w-5 h-5 mr-2" />,
      content: (
        <>
          <p>We use cookies to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Understand user behavior</li>
            <li>Improve app performance</li>
            <li>Provide personalized experience</li>
          </ul>
          <p className="mt-3 text-sm text-gray-500">You can disable cookies in your device settings.</p>
        </>
      )
    },
    {
      title: "Data Sharing",
      content: (
        <div className="space-y-2">
          <p>We do not sell your personal data.</p>
          <p>Data may be shared with trusted third-party services only for app functionality (payments, analytics).</p>
        </div>
      )
    },
    {
      title: "Data Security",
      icon: <Lock className="w-5 h-5 mr-2" />,
      content: "We use industry-standard security measures to protect your data from unauthorized access, loss, or misuse."
    },
    {
      title: "User Rights",
      content: (
        <div className="space-y-2">
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Access your personal data</li>
            <li>Update or correct information</li>
            <li>Request deletion of your account and data</li>
          </ul>
        </div>
      )
    },
    {
      title: "Data Retention",
      content: "Your data is stored only as long as necessary to provide services or as required by law."
    },
    {
      title: "Children's Privacy",
      content: "Our app is not intended for children under 13. We do not knowingly collect data from children."
    },
    {
      title: "Changes to Privacy Policy",
      content: "We may update this Privacy Policy from time to time. Updates will be posted within the app or website."
    }
  ];

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
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-700 opacity-90"></div>
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
                  <ShieldCheck className="w-8 h-8" />
                </motion.div>
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold mb-4"
                  variants={fadeIn}
                >
                  Privacy Policy
                </motion.h1>
                <motion.p 
                  className="text-purple-100 text-lg max-w-2xl"
                  variants={fadeIn}
                >
                  Last updated: {currentDate}
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <motion.div 
            className="p-8 md:p-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="prose prose-purple max-w-none space-y-10">
              {/* Introduction */}
              <motion.div 
                variants={itemVariants}
                custom={1}
                className="bg-gray-50 p-6 rounded-xl border border-gray-100"
              >
                <motion.p className="text-lg text-gray-700 leading-relaxed">
                  Your privacy is important to us. This Privacy Policy explains how <span className="font-bold text-purple-600">Avyakt-Ehsaas</span> collects, uses, and protects your personal information.
                </motion.p>
              </motion.div>

              {/* Privacy Policy sections */}
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
                      {section.icon && (
                        <span className="text-purple-500 mr-3">
                          {section.icon}
                        </span>
                      )}
                      <span className="mr-3">{index + 1}.</span>
                      {section.title}
                    </motion.h2>
                    <div className="mt-2 text-gray-600 space-y-4">
                      {section.content}
                    </div>
                  </motion.div>
                </motion.div>
              ))}

              {/* Contact Information */}
              <motion.div 
                variants={itemVariants}
                className="bg-purple-50 p-6 rounded-xl border border-purple-100"
              >
                <motion.h2 
                  className="text-2xl font-semibold text-purple-800 mb-4 flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="mr-3">10.</span>
                  Contact Us
                </motion.h2>
                <div className="mt-2 text-purple-700 space-y-2">
                  <p>For any privacy-related concerns:</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span>📧</span>
                    <a 
                      href="mailto:support@avyaktehsaas.app" 
                      className="text-purple-600 hover:underline font-medium flex items-center"
                    >
                      support@avyaktehsaas.app
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;