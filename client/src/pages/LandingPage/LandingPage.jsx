import LandingSidebar from './LandingSidebar/LandingSidebar'
import React from 'react'
import { Link } from 'react-router-dom'
import HeroSection from './HeroSection'
import AboutAvaykt from './AboutAvaykt'
import HowItWorks from './HowItsWork'
import ProgramsAndBenefits from './ProgramsAndBenefits'
import TestimonialCarousel from './TestimonialCarousel'
import Mentors from './Mentors'
import FAQJoin from './FAQJoin'
import Footer from './Footer'

const LandingPage = () => {
  return (
    <>
    <div className='bg-gradient-to-r from-white/90 to-white/80 min-h-screen '>
      <LandingSidebar />
      <HeroSection />
      <AboutAvaykt />
      <HowItWorks />
      <ProgramsAndBenefits />
      <TestimonialCarousel />
      {/* <Mentors /> */}
      <FAQJoin />
      <Footer />
    </div>
    
    </>
  )
}

export default LandingPage