import React, { useRef } from 'react'
import { BsStars } from "react-icons/bs";
import { Link } from 'react-router-dom';
import heroImage from "../../assets/hero.png"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { motion } from 'framer-motion'

const HeroSection = () => {

    const Startups = useRef(null);
    const headingRef = useRef([]);
    const imgRef = useRef(null)
    const badgesRef = useRef(null);

    const text = "Avaykt-Ehsaas";

    useGSAP(() => {
        gsap.from(headingRef.current, {
            y: -80,
            opacity: 0,
            duration: 0.8,
            ease: "power4.out",
        })

        gsap.from(Startups.current, {
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 1.2,
            ease: "power3.out",
        })

        gsap.fromTo(".btn",
            { opacity: 0, y: 30, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                delay: 0.8,
                stagger: 0.2,
                ease: "power4.out"
            }
        )

        gsap.from(imgRef.current, {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 1.4,
            ease: "power3.out",
        })

        gsap.from(badgesRef.current,{
            opacity : 0,
            y : 40,
            duration : 1,
            delay:1,
            ease : "power4.out"
        })
    });

    return (
        <>
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={heroImage} 
                    alt="Peaceful meditation background"
                    className="w-full h-full object-cover object-center"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl w-full px-5 md:px-10 py-20">
                <div className="max-w-3xl">
                    {/* Google badge */}
                    <div
                        ref={Startups}
                        className="mb-8 bg-orange-500/80 text-white w-fit px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2 backdrop-blur-sm"
                    >
                        <BsStars className="text-yellow-300" />
                        Google Startups Member
                    </div>

                    {/* Heading */}
                    <h1 
                        ref={headingRef}
                        className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-extrabold text-white mb-6 leading-tight"
                    >
                        Avaykt-Ehsaas
                    </h1>

                    {/* Paragraph */}
                    <div 
                        className="space-y-6 max-w-2xl"
                    >
                        <motion.h3 
                            className='text-xl sm:text-2xl md:text-3xl text-amber-200 font-medium'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Meditation Backed by Neuroscience
                        </motion.h3>
                        <motion.p 
                            className='text-lg sm:text-xl text-orange-100 font-medium'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            Join daily live meditation sessions, explore our courses, and enhance your mind with Avaykt Ehsaas.
                        </motion.p>
                    </div>

                    {/* Buttons */}
                    <motion.div 
                        className='mt-10 flex flex-wrap gap-6'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Link 
                            to="/register" 
                            className='px-10 py-4 bg-orange-500 text-white rounded-full font-bold text-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-500/30'
                        >
                            Start Your Journey
                        </Link>
                        <Link 
                            to="/about" 
                            className='px-10 py-4 border-2 border-white text-white rounded-full font-bold text-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 transform hover:scale-105'
                        >
                            Learn More
                        </Link>
                    </motion.div>

                </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/80 text-sm animate-bounce">
                <div className="flex flex-col items-center">
                    <span>Scroll to explore</span>
                    <svg className="w-6 h-6 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </section>
              <div className="flex flex-wrap gap-4 mb-8" ref={badgesRef}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="bg-orange-500/80 text-white w-fit px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2 backdrop-blur-sm"
                        >
                            <img href="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Google_for_Startups_logo.svg/1200px-Google_for_Startups_logo.svg.png?20201222111427"
                                className="text-yellow-300" />
                            Google Startups Member
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="bg-blue-600/80 text-white w-fit px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2 backdrop-blur-sm"
                        >
                            <img href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdXb6yFb5UMer8xTSJDmGH5ogfDqA3h7O6Yw&s"
                                className="text-white" />
                            IIT Mandi Incubation
                        </motion.div>
                    </div>
        </>
    )
}

export default HeroSection
