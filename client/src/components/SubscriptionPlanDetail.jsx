// src/components/SubscriptionPlanDetail.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, Zap, Award, Shield, Users, Heart } from 'lucide-react';
import LandingSidebar from '../pages/LandingPage/LandingSidebar/LandingSidebar';

const planDetails = {
  monthly: {
    title: "Monthly Plan",
    price: "₹ 499",
    period: "per month",
    features: [
      "Access to all daily live sessions",
      "Unlimited session recordings",
      "Guided gratitude exercises",
      "Digital journal with prompts",
      "Basic progress tracking",
      "Email support"
    ],
    description: "Perfect for those who want to explore our meditation programs with full flexibility.",
    popular: false
  },
  quarterly: {
    title: "Quarterly Plan",
    price: "₹ 1,299",
    period: "for 3 months",
    originalPrice: "₹ 1,497",
    save: "Save 13%",
    features: [
      "Everything in Monthly, plus:",
      "Priority email support",
      "3 one-on-one coaching sessions",
      "Exclusive quarterly workshops",
    ],
    description: "Ideal for those committed to their practice and looking for better value.",
    popular: false
  },
  halfyearly: {
    title: "Half-Yearly Plan",
    price: "₹ 2,499",
    period: "for 6 months",
    originalPrice: "₹ 2,994",
    save: "Save 16%",
    features: [
      "Everything in Quarterly, plus:",
      "Weekly group coaching",
      "6 one-on-one coaching sessions",
      "Access to premium content library"
    ],
    description: "Designed for those seeking deeper transformation and consistent practice.",
    popular: true
  },
  annual: {
    title: "Annual Plan",
    price: "₹ 4,799",
    period: "for 12 months",
    originalPrice: "₹ 5,988",
    save: "Save 20%",
    features: [
      "Everything in Half-Yearly, plus:",
      "Unlimited one-on-one coaching",
      "Monthly personalized sessions",
      "VIP support (24h response)",
      "Free access to all future courses"
    ],
    description: "The best value for dedicated practitioners committed to long-term growth.",
    popular: false
  }
};

const FeatureItem = ({ icon, text }) => (
  <motion.li 
    className="flex items-start gap-3"
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
  >
    <span className="text-green-500 mt-1">{icon}</span>
    <span className="text-gray-700">{text}</span>
  </motion.li>
);

const SubscriptionPlanDetail = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const plan = planDetails[planId] || planDetails.monthly;

  if (!plan) {
    return <div>Plan not found</div>;
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
        <LandingSidebar />
      <div className="max-w-7xl mt-8 mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-orange-500 hover:text-orange-600 mb-8 transition-colors duration-200 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Plans
        </button>

        {/* Main Card */}
        <motion.div 
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-w-4xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-8 md:p-12 text-white relative overflow-hidden">
            {plan.popular && (
              <div className="absolute top-6 right-6 bg-white text-orange-600 text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </div>
            )}
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{plan.title}</h1>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-extrabold">{plan.price}</span>
                <span className="text-xl text-orange-100">/ {plan.period}</span>
                {plan.save && (
                  <span className="ml-3 px-3 py-1 bg-white/20 rounded-full text-sm">
                    {plan.save}
                  </span>
                )}
              </div>
              {plan.originalPrice && (
                <p className="text-orange-100 line-through">{plan.originalPrice}</p>
              )}
              <p className="text-orange-100 mt-2">{plan.description}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Features */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <CheckCircle className="text-green-500" />
                  What's Included
                </h2>
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <FeatureItem 
                      key={i} 
                      icon={<CheckCircle className="w-5 h-5" />} 
                      text={feature} 
                    />
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Zap className="text-amber-500" />
                  Key Benefits
                </h2>
                <ul className="space-y-4">
                  <FeatureItem 
                    icon={<Award className="w-5 h-5 text-purple-500" />} 
                    text="Certified meditation instructors" 
                  />
                  <FeatureItem 
                    icon={<Shield className="w-5 h-5 text-green-500" />} 
                    text="Secure and private sessions" 
                  />
                  <FeatureItem 
                    icon={<Users className="w-5 h-5 text-cyan-500" />} 
                    text="Supportive community access" 
                  />
                  <FeatureItem 
                    icon={<Heart className="w-5 h-5 text-pink-500" />} 
                    text="Holistic wellness approach" 
                  />
                </ul>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Begin Your Journey?</h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Join thousands of practitioners who have transformed their lives through consistent meditation practice.
                </p>
                
                <div className="space-y-4 max-w-md mx-auto">
                  <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    Subscribe Now - {plan.price}
                  </button>
                  
                  <p className="text-sm text-gray-500">
                    Secure payment via Razorpay. Cancel anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SubscriptionPlanDetail;