import React from "react";
import { motion } from "framer-motion";

const journeyPoints = [
  { title: "Foundations of Mindfulness", description: "Breath awareness, body scan, mindfulness of senses and thoughts." },
  { title: "Emotional Balance & Gratitude", description: "Stress recognition, mindful responses, gratitude journalling, resilience building." },
  { title: "Everyday Mindfulness", description: "Bringing awareness to eating, walking, digital habits and daily rituals." },
  { title: "Self-Compassion & Loving-Kindness", description: "Cultivating compassion for oneself and others, forgiveness practices." },
  { title: "Mindful Relationships", description: "Deep listening, mindful communication and empathy." },
  { title: "Deep Focus & Visualization", description: "Concentration techniques, creative visualisation, flow states." },
  { title: "Transforming Negativity", description: "Recognising limiting beliefs, reframing thoughts, cultivating equanimity." },
  { title: "Purpose & Clarity", description: "Identifying personal values, setting intentions, mindful goal-setting." },
  { title: "Mindfulness in Action", description: "Productivity, leadership, workplace compassion and conflict resolution." },
  { title: "Advanced Practices", description: "Open awareness, silent meditation, subtle energy work." },
  { title: "Spiritual Exploration", description: "Contemplation on impermanence, non-duality, nature connection." },
  { title: "Integration & Reflection", description: "Designing a personal practice, peer sharing, celebration and planning." },
];

const YearLongJourney = () => {
  return (
    <section className="relative py-20 bg-white overflow-hidden">

      {/* Animated Tech Circles */}
<div className="absolute top-20 left-10 w-80 h-80 bg-orange-300/40 rounded-full blur-3xl animate-pulse"></div>

<div className="absolute top-1/3 right-0 w-[28rem] h-[28rem] bg-orange-300/20 rounded-full blur-3xl animate-[pulse_8s_infinite]"></div>

<div className="absolute bottom-0 left-1/4 w-[26rem] h-[26rem] bg-orange-200/60 rounded-full blur-3xl animate-[pulse_10s_infinite]"></div>


      <h2 className="text-4xl sm:text-5xl font-bold mb-16 text-center text-orange-500">
        Year-Long Journey
      </h2>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Center vertical line */}
        <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-1 bg-gradient-to-b from-orange-300 via-pink-300 to-yellow-300 h-full rounded-full opacity-40"></div>

        <div className="space-y-16">
          {journeyPoints.map((point, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative flex flex-col md:flex-row items-center"
              >
                {/* Card */}
                <div
                  className={`md:w-1/2 p-6 rounded-3xl backdrop-blur-sm bg-white/40 shadow-xl relative z-20
                    ${isLeft ? "md:mr-auto md:text-right" : "md:ml-auto md:text-left"}`}
                >
                  <h3 className="text-2xl font-bold text-orange-500 mb-2"> {index + 1}. {point.title}</h3>
                  <p className="text-gray-900">{point.description}</p>
                </div>

                {/* Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-tr from-orange-400 via-pink-400 to-yellow-400 shadow-lg border-2 border-white z-10"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default YearLongJourney;
