import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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

const Card = ({ point, index }) => {
  const ref = useRef(null);

  // Scroll progress of this card
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0.3 1", "0.7 0"],
  });

  // Throwing effect: x, scale, opacity
  const isLeft = index % 2 === 0;

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    isLeft ? [-250, 0] : [250, 0] // Alternate directions
  );

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    isLeft ? [-8, 0] : [8, 0]
  );

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center relative"
    >
      <motion.div
        style={{
          x,
          opacity,
          scale,
          rotate,
          zIndex: index * 10,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 18 }}
        className="w-[90%] md:w-[60%] p-8 rounded-3xl backdrop-blur-sm bg-white/60 shadow-xl"
      >
        <h3 className="text-3xl font-bold text-orange-600 mb-4">
          {index + 1}. {point.title}
        </h3>
        <p className="text-gray-800 text-lg leading-relaxed">
          {point.description}
        </p>
      </motion.div>
    </section>
  );
};

const YearLongJourney = () => {
  return (
    <section className="relative bg-white">

      <h2 className="text-5xl font-bold pt-12 pb-8 text-center text-orange-500">
        Year-Long Journey
      </h2>

      {/* Full-screen scroll snapping */}
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
        {journeyPoints.map((point, index) => (
          <div key={index} className="snap-center">
            <Card point={point} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default YearLongJourney;
