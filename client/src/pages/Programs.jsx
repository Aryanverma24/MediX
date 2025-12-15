import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const programs = [
  {
    id: 1,
    title: 'Daily Meditation',
    description: 'Join our daily guided meditation sessions to cultivate mindfulness and inner peace.',
    duration: '30 mins',
    level: 'All Levels',
    image: '/assets/LakeMeditation.png',
    features: [
      'Live sessions with experienced instructors',
      'Different themes each day',
      'Q&A with meditation experts',
      'Access to session recordings'
    ]
  },
  {
    id: 2,
    title: 'Mindfulness Course',
    description: 'A comprehensive 4-week program to master mindfulness techniques for daily life.',
    duration: '4 Weeks',
    level: 'Beginner',
    image: '/assets/LotusMeditation.png',
    features: [
      'Weekly live sessions',
      'Guided practices',
      'Community support',
      'Progress tracking'
    ]
  },
  {
    id: 3,
    title: 'Stress Management',
    description: 'Learn evidence-based techniques to manage stress and improve mental well-being.',
    duration: '6 Weeks',
    level: 'All Levels',
    image: '/assets/RealMeditation.png',
    features: [
      'Breathing exercises',
      'Mindfulness practices',
      'One-on-one coaching',
      'Access to resource library'
    ]
  }
];

const Programs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h1 
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our <span className="text-orange-500">Programs</span>
        </motion.h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Transform your life with our carefully designed meditation and mindfulness programs.
          Whether you're a beginner or an experienced practitioner, we have something for everyone.
        </p>
      </div>

      {/* Programs Grid */}
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((program) => (
          <motion.div
            key={program.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={program.image} 
                alt={program.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-orange-500">{program.duration}</span>
                <span className="px-3 py-1 text-xs font-semibold bg-orange-100 text-orange-800 rounded-full">
                  {program.level}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
              <p className="text-gray-600 mb-4">{program.description}</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">What's included:</h4>
                <ul className="space-y-2">
                  {program.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/auth/register"
                className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
              >
                Enroll Now
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto mt-20 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Not sure which program is right for you?</h2>
        <p className="text-gray-600 mb-6">
          Our meditation experts can help you find the perfect program based on your goals and experience level.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 transition duration-300"
        >
          Contact Us
          <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Programs;
