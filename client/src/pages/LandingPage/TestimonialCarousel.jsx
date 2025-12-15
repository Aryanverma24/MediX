import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";
const testimonials = [
  {
    name: "Rohit M.",
    role: "Software Engineer",
    text: "After just two weeks, I felt my mind quieten. The nightly sessions fit perfectly into my schedule, and Sai’s guidance is both gentle and grounded.",
    
  },
  {
    name: "Ananya S.",
    role: "Product Manager",
    text: "I joined during a stressful period at work. The 21-day challenge helped me sleep better and respond to colleagues with more patience.",
  
  },
  {
    name: "Dr. Vijaya K.",
    role: "Physician",
    text: "Meditation always felt mystical. Avyakt Ehsaas explained the science and gave me practical tools. I’m now more centred and connected in my relationships.",
   
  }
];


const TestimonialCarousel = () => {
  return (
    <section className="py-20 bg-white">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-black mb-12">
        What People Say <span className="text-orange-600">About Avyakt</span> 
      </h2>

      <div className="max-w-6xl mx-auto px-6">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={40}
          slidesPerView={1}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
        >
          {testimonials.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white/50 backdrop-blur-lg shadow-xl rounded-2xl p-6 hover:scale-105 transition-all duration-300 border border-orange-100 h-full flex flex-col justify-between mb-5 hover:shadow-xl hover:shadow-orange-200/60">

                <div className="flex items-center gap-4 mb-4">
                  {/* <img
                    src={item.image}
                    alt="user"
                    className="w-16 h-16 rounded-full object-cover border-4 border-orange-300"
                  /> */}

                  <div>
                    <h4 className="font-bold text-lg text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.role}</p>

                    <div className="flex text-yellow-500 mt-1">
                      <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 italic leading-relaxed">
                  “{item.text}”
                </p>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
