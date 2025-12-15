import { useGSAP  } from "@gsap/react";
import { Sparkles, Brain, Calendar, TrendingUp } from "lucide-react";
import gsap from 'gsap'
import { useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    id: 1,
    title: "Join Avyakt",
    desc: "Create your account and become part of a conscious community.",
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    id: 2,
    title: "Select Program",
    desc: "Choose from daily meditation & neuroscience based programs.",
    icon: <Brain className="w-6 h-6" />
  },
  {
    id: 3,
    title: "Attend Sessions",
    desc: "Join live guided sessions through Zoom.",
    icon: <Calendar className="w-6 h-6" />
  },
  {
    id: 4,
    title: "Track Growth",
    desc: "Monitor your emotional & mental progress dashboard.",
    icon: <TrendingUp className="w-6 h-6" />
  }
];

const HowItWorks = () => {

    const headRef = useRef();
    const paraRef = useRef();
    const cardContainerRef = useRef()

    useGSAP(() => {
        gsap.from(headRef.current,{
            opacity: 0,
            y: 60,
            duration : 2,
            ease : "power4.out",
            scrollTrigger :{
                trigger : headRef.current,
                start : "top 85%",
                toggleActions : "play none none none"
            }
        })

        gsap.from(paraRef.current,{
            opacity : 0,
            y: 60,
            duration: 2,
            ease: "power4.out",
            scrollTrigger: {
                trigger:  paraRef.current,
                start : "top 85%",
                toggleActions :  "play none none none"
            }
        })

        gsap.from(cardContainerRef.current,{
            opacity: 0,
            y: 80,
            duration: 1,
            
            ease: "power4.out",
            scrollTrigger : {
                trigger : cardContainerRef.current,
                start: "top 80%",
                toggleActions : "play none none none"
            }
        })
    })

  return (
    <section className="w-full bg-gradient-to-r from-orange-100 via-pink-50 to-orange-200  py-20">

      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 
        ref={headRef}
        className="text-4xl font-bold text-gray-800 mb-3">
          How Avyakt Ehsaas <span className="text-orange-600">Works</span>
        </h2>
        <p 
        ref={paraRef}
        className="text-gray-600 mb-12 max-w-xl mx-auto">
          A simple 4-step journey to align your mind, soul & consciousness
        </p>

        {/* STEPS */}
        <div 
        ref={cardContainerRef}
        className="grid md:grid-cols-4 gap-8">

          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white shadow-xl rounded-2xl p-6 hover:scale-105 transition duration-300 border border-gray-100"
            >
              {/* Icon */}
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full 
                              bg-gradient-to-tr from-orange-600 to-amber-400 text-white">
                {step.icon}
              </div>

              {/* Number */}
              <h3 className="text-lg font-semibold mb-2">
                Step {step.id}
              </h3>

              {/* Title */}
              <h4 className="text-xl font-bold text-primary mb-2">
                {step.title}
              </h4>

              {/* Description */}
              <p className="text-gray-600 text-sm">
                {step.desc}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default HowItWorks;
