import React from "react";
import { motion } from "framer-motion";

const plans = [
  {
    title: "Monthly",
    price: "₹ 499 / month",
    approx: "Approx. ₹ 499 per month",
    save: "",
    description: "Access to all daily sessions, recordings, gratitude & journaling exercises."
  },
  {
    title: "Quarterly",
    price: "₹ 1299 total",
    approx: "≈ ₹ 433 per month",
    save: "(save ~13 %)",
    description: "Same features; more economical for committed practice."
  },
  {
    title: "Half-Yearly",
    price: "₹ 2499 total",
    approx: "≈ ₹ 417 per month",
    save: "(save ~16 %)",
    description: "Encourages sustained practice and deeper transformation."
  },
  {
    title: "Annual",
    price: "₹ 4799 total",
    approx: "≈ ₹400 per month",
    save: "(save ~20 %)",
    description: "Best value; supports long-term."
  }
];

const SubscriptionPricing = () => {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <h2 className="text-3xl md:text-5xl font-bold text-center text-orange-500 mb-16">
        Plans
      </h2>

      {/* Optional subtle background particles / techy look */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div
          style={{
            backgroundImage:
              "radial-gradient(#fb923c40 1px, transparent 1px), radial-gradient(#fcd34d30 1px, transparent 1px)",
            backgroundSize: "50px 50px"
          }}
          className="w-full h-full"
        ></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-8 justify-center">
        {plans.map((plan, i) => (

          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="
            group
              relative
              flex-1
              bg-white/60
              backdrop-blur-xl
              border border-orange-100
              rounded-3xl
              p-8
              shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]
              hover:shadow-[0_30px_70px_-20px_rgba(251,146,60,0.5)]
              hover:-translate-y-2
              transition-all
              duration-500
              text-center
            "
          >

         <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-orange-300/20 via-transparent to-amber-300/20 pointer-events-none rounded-3xl"></div>

            <h3 className="text-2xl font-bold text-orange-500 mb-2">{plan.title}</h3>
            <p className="text-3xl font-extrabold text-gray-900 mb-1">{plan.price}</p>
            <p className="text-sm text-gray-500 mb-2">{plan.approx} {plan.save && <span className="text-orange-500">{plan.save}</span>}</p>
            <p className="text-gray-700 leading-relaxed">{plan.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SubscriptionPricing;
