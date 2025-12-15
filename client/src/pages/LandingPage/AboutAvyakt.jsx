import React, { useRef } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader
} from '../../components/ui/Card'

import { FaBrain, FaUsers, FaLeaf, FaClock } from 'react-icons/fa'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const AboutAvyakt = () => {

    const aboutHeadRef = useRef();
    const paraRef = useRef();

useGSAP(() => {
  gsap.set(".avyakt-card", { opacity: 0, y: 60 });

  ScrollTrigger.batch(".avyakt-card", {
    start: "top 80%",
    onEnter: batch => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        clearProps: "all"
      });
    },
    once: true,
  });

gsap.from(aboutHeadRef.current,{
    opacity:0,
    y: 60,
    duration: 1.8,
    ease: "power4.out",
    scrollTrigger : {
        trigger : aboutHeadRef.current,
        start : "top 95%",
        toggleActions: "play none reverse none"
    }
})

gsap.from(paraRef.current,{
    opacity:0,
    duration:2,
    y: 60,
    ease: "power4.out",
    scrollTrigger: {
        trigger: paraRef.current,
        start : "top 95%",
        toggleActions : "play none reverse none"
    }

})

  ScrollTrigger.refresh();
}, { dependencies: [] }


);

  return (
    <section className="bg-beige-300 min-h-[130vh] py-20 text-stone-900">

      <h2 ref={aboutHeadRef} className="text-5xl font-bold text-center">
        About <span className="text-orange-600">Avyakt Ehsaas</span>
      </h2>

      <p
       ref={paraRef} 
      className="text-xl mx-4 mt-6 md:mx-24 font-semibold text-center">
        We blend ancient meditation practices with modern neuroscience to create
        transformative experiences. Our mission is to make mindfulness
        accessible, measurable, and scientifically validated.
      </p>

      <div className="avyakt-container grid grid-cols-1 md:grid-cols-2 gap-12 mx-4 mt-16 md:mx-20">

        {/* CARD 1 */}
        <Card className="avyakt-card hover:scale-105 transition-all duration-300">
          <CardHeader
            title="Neuroscience Based"
            subtitle="Scientifically proven methods"
          />

          <CardContent>
            <div className="text-4xl text-orange-500 mb-3">
              <FaBrain />
            </div>
            <CardDescription>
              Our meditation techniques are backed by modern brain research to
              improve focus, memory, and emotional health.
            </CardDescription>
          </CardContent>

          <CardFooter>
            <span className="text-sm text-orange-600 font-medium">
              Know more →
            </span>
          </CardFooter>
        </Card>


        {/* CARD 2 */}
        <Card className="avyakt-card hover:scale-105 transition-all duration-300">
          <CardHeader
            title="Daily Live Sessions"
            subtitle="Anytime, Anywhere"
          />

          <CardContent>
            <div className="text-4xl text-amber-500 mb-3">
              <FaClock />
            </div>
            <CardDescription>
              Join guided live meditation every day with expert mentors.
            </CardDescription>
          </CardContent>

          <CardFooter>
            <span className="text-sm text-amber-600 font-medium">
              Join Now →
            </span>
          </CardFooter>
        </Card>


        {/* CARD 3 */}
        <Card className="avyakt-card hover:scale-105 transition-all duration-300">
          <CardHeader
            title="Community Support"
            subtitle="Grow with like-minded souls"
          />

          <CardContent>
            <div className="text-4xl text-pink-500 mb-3">
              <FaUsers />
            </div>
            <CardDescription>
              Connect with a powerful community focused on self-growth.
            </CardDescription>
          </CardContent>

          <CardFooter>
            <span className="text-sm text-pink-600 font-medium">
              Explore →
            </span>
          </CardFooter>
        </Card>


        {/* CARD 4 */}
        <Card className="avyakt-card hover:scale-105 transition-all duration-300">
          <CardHeader
            title="Inner Healing"
            subtitle="Balance your mind & soul"
          />

          <CardContent>
            <div className="text-4xl text-green-500 mb-3">
              <FaLeaf />
            </div>
            <CardDescription>
              Experience deep healing on emotional & mental levels.
            </CardDescription>
          </CardContent>

          <CardFooter>
            <span className="text-sm text-green-600 font-medium">
              Start Journey →
            </span>
          </CardFooter>
        </Card>

      </div>
    </section>
  )
}

export default AboutAvyakt
