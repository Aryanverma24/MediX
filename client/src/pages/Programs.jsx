import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LandingSidebar from "./LandingPage/LandingSidebar/LandingSidebar";
import Footer from "./LandingPage/Footer";

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    id: 1,
    title: "Daily Guided Meditation Sessions",
    description: "Live daily meditation sessions designed to build consistency, inner calm, and mindfulness as part of your everyday routine.",
    duration: "Daily · 30 mins",
    level: "All Levels",
    image: "/assets/LakeMeditation.png",
    features: [
      "Live guided meditation every day",
      "Theme-based mindfulness practices",
      "Real-time instructor interaction",
      "Session recordings for later access"
    ]
  },
  {
    id: 2,
    title: "School Learning Management Program",
    description: "A structured, module-based meditation learning program designed for students to develop focus, emotional balance, and mental well-being.",
    duration: "Module Based",
    level: "Students",
    image: "/assets/LotusMeditation.png",
    features: [
      "Age-appropriate meditation modules",
      "Progressive learning path",
      "Focus, discipline & emotional health training",
      "Teacher & student progress tracking"
    ]
  },
  {
    id: 3,
    title: "Corporate Employee Wellness Program",
    description: "A professional mindfulness and meditation program tailored for corporate employees to reduce stress, improve productivity, and enhance workplace well-being.",
    duration: "Flexible Programs",
    level: "Corporate",
    image: "/assets/RealMeditation.png",
    features: [
      "Stress & burnout management",
      "Mindfulness for productivity",
      "Live & on-demand corporate sessions",
      "Wellness reports for HR teams"
    ]
  }
];

const Programs = () => {
  const heroRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%"
          }
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-orange-50 px-6 py-16">
        <LandingSidebar />
      {/* Hero */}
      <div ref={heroRef} className="max-w-6xl mx-auto text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
          Experience <span className="text-orange-500">Mindful Living</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          Discover beautifully crafted mindfulness programs designed to elevate your mental clarity, focus, and well‑being.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((program, i) => (
          <div
            key={program.id}
            ref={(el) => (cardsRef.current[i] = el)}
            className="group relative bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={program.image}
                alt={program.title}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-orange-500">{program.duration}</span>
                <span className="text-xs px-3 py-1 rounded-full bg-orange-100 text-orange-700">
                  {program.level}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {program.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {program.description}
              </p>

              <ul className="space-y-3 mb-8">
                {program.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-gray-600">
                    <span className="mt-1 mr-3 h-2 w-2 rounded-full bg-orange-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to="/auth/register"
                className="inline-flex w-full items-center justify-center rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-orange-600 hover:scale-[1.02]"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-28 max-w-5xl mx-auto rounded-3xl bg-white border border-gray-200 shadow-xl p-12 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Need a personalized recommendation?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Talk to our mindfulness experts and get a program tailored to your goals and lifestyle.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-8 py-4 text-white font-semibold hover:bg-gray-800 transition"
        >
          Contact Experts
          <span className="text-xl">→</span>
        </Link>
      </div>
        <Footer />
    </div>
  );
};

export default Programs;
