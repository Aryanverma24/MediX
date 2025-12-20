// src/components/SubscriptionPricing.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    id: "monthly",
    title: "Monthly",
    price: "₹ 499",
    period: "per month",
    features: [
      "Access to all daily live sessions",
      "Unlimited session recordings",
      "Digital journal with prompts",
      "Basic progress tracking",
      "Email support"
    ],
    popular: false
  },
  {
    id: "quarterly",
    title: "Quarterly",
    price: "₹ 1,299",
    period: "for 3 months",
    originalPrice: "₹ 1,497",
    save: "Save 13%",
    features: [
      "Everything in Monthly, plus:",
      "Priority email support",
      "3 one-on-one coaching sessions",
      "Exclusive quarterly workshops"
    ],
    popular: false
  },
  {
    id: "halfyearly",
    title: "Half-Yearly",
    price: "₹ 2,499",
    period: "for 6 months",
    originalPrice: "₹ 2,994",
    save: "Save 16%",
    features: [
      "Everything in Quarterly, plus:",
      "Weekly group coaching",
      "6 one-on-one sessions",
      "Premium content library"
    ],
    popular: true
  },
  {
    id: "annual",
    title: "Annual",
    price: "₹ 4,799",
    period: "for 12 months",
    originalPrice: "₹ 5,988",
    save: "Save 20%",
    features: [
      "Everything in Half-Yearly, plus:",
      "Unlimited coaching",
      "Monthly personalized sessions",
      "VIP support (24h response)",
    ],
    popular: false
  }
];

const SubscriptionPricing = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Choose Your Meditation Journey
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Select the plan that aligns with your meditation goals and lifestyle.
            Cancel or switch plans anytime.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }
              }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ 
                y: -10,
                transition: { 
                  duration: 0.3,
                  type: "spring",
                  stiffness: 200
                }
              }}
              onClick={() => navigate(`/plans/${plan.id}`)}
              className={`
                relative
                flex flex-col
                bg-white/80 backdrop-blur-sm
                border border-gray-100
                rounded-2xl
                p-6
                shadow-lg
                overflow-hidden
                cursor-pointer
                transition-all
                duration-300
                hover:shadow-xl
                hover:border-orange-200
                ${plan.popular ? 'ring-2 ring-orange-400' : ''}
              `}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  POPULAR
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.title}</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="ml-2 text-gray-500">{plan.period}</span>
                </div>
                {plan.originalPrice && (
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="line-through mr-2">{plan.originalPrice}</span>
                    <span className="text-green-600 font-medium">{plan.save}</span>
                  </p>
                )}
              </div>

              <div className="flex-1 mb-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  w-full py-3 px-4 rounded-xl font-medium
                  bg-gradient-to-r from-orange-500 to-amber-500
                  text-white
                  shadow-md
                  hover:shadow-lg
                  transition-all
                  duration-200
                `}
              >
                Choose Plan
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPricing;