import React from "react";
import {
  FaBrain,
  FaMoon,
  FaLeaf,
  FaBolt,
  FaSpa,
  FaHeart,
  FaCheckCircle,
  FaVideo,
  FaUserAstronaut
} from "react-icons/fa";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription
} from "../../components/ui/Card";

const programs = [
  {
    title: "Daily Live Meditation (Zoom)",
    desc: "Join daily guided meditation sessions live on Zoom with Avyakt mentors.",
    icon: <FaVideo />,
  },
  {
    title: "1 to 1 Guidance",
    desc: "Personal mentorship and customized meditation plans just for you.",
    icon: <FaUserAstronaut />,
  },
  {
    title: "Neuroscience Healing",
    desc: "Brain + Breath based scientifically proven healing techniques.",
    icon: <FaBrain />,
  },
  {
    title: "Sleep & Anxiety Care",
    desc: "Deep relaxation and inner calm for better sleep and emotional healing.",
    icon: <FaMoon />,
  },
  {
    title: "Energy & Chakra Work",
    desc: "Cleansing & balancing your inner energy for peace & clarity.",
    icon: <FaBolt />,
  },
  {
    title: "Self Awakening",
    desc: "Connect with your higher self and unlock deep consciousness.",
    icon: <FaHeart />,
  }
];

const benefits = [
  "Improves Focus & Memory",
  "Reduces Anxiety & Stress",
  "Boosts Emotional Intelligence",
  "Balances Mind, Body & Soul",
  "Scientifically Proven Techniques",
  "Live Zoom + 1:1 Support"
];

const ProgramsAndBenefits = () => {
  return (
    <section className="bg-gradient-to-b from-orange-50 to-white py-16">

      {/* ---------------- OUR PROGRAMS ---------------- */}
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-2">
          Our <span className="text-orange-600">Programs</span>
        </h2>

        <p className="text-center text-lg max-w-2xl mx-auto mb-12 text-stone-600">
          Transform your mind with meditation backed by science & spirit.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {programs.map((item, index) => (
            <Card
              key={index}
              className="hover:scale-105 transition-all duration-300 border border-orange-100"
            >
              <CardHeader
                title={item.title}
                subtitle="Avyakt Signature Program"
              />

              <CardContent>
                <div className="text-3xl text-orange-500 mb-3">
                  {item.icon}
                </div>
                <CardDescription>
                  {item.desc}
                </CardDescription>
              </CardContent>

              <CardFooter>
                <span className="text-sm font-semibold text-orange-600 cursor-pointer">
                  Explore →
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* ---------------- BENEFITS ---------------- */}
      <div className="max-w-6xl mx-auto px-4 mt-20">

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-3">
          Why <span className="text-orange-600">Avyakt Ehsaas?</span>
        </h2>

        <p className="text-center text-lg max-w-2xl mx-auto mb-12 text-stone-600">
          A complete fusion of spirituality and neuroscience for real-life change.
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT - Benefits list */}
          <div className="space-y-4">
            {benefits.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white/70 backdrop-blur p-4 rounded-xl shadow"
              >
                <FaCheckCircle className="text-orange-500 text-xl shrink-0" />
                <span className="font-medium text-gray-700">{item}</span>
              </div>
            ))}
          </div>

          {/* RIGHT - CTA card */}
          <Card className="relative text-center overflow-hidden border border-orange-100">

            <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-300 rounded-full blur-3xl opacity-50"></div>

            <CardHeader
              title="Start Your Journey Today"
              subtitle="Awaken your higher consciousness"
            />

            <CardContent>
              <CardDescription>
                Join Avyakt Ehsaas & experience transformation through daily
                live practices and personal guidance.
              </CardDescription>
            </CardContent>

            <CardFooter className="flex justify-center">
              <button className="bg-orange-500 hover:bg-orange-600 transition text-white px-8 py-3 rounded-full font-semibold shadow-lg">
                Join Now
              </button>
            </CardFooter>

          </Card>

        </div>

      </div>

    </section>
  );
};

export default ProgramsAndBenefits;
