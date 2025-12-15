import React from "react";
import { Card, CardHeader, CardContent, CardDescription } from "../../components/ui/Card";
import { FaStar } from "react-icons/fa";
import logo from '../../assets/avyakt-ehsaas-logo.png'

const mentors = [
  {
    name: "Dr. Ayesha Khan",
    role: "Lead Meditation Mentor",
   
    experience: "10+ years in mindfulness & neuroscience",
  },
  {
    name: "Rohan Verma",
    role: "Spiritual Guide",
    
    experience: "Meditation & energy work expert",
  },
  {
    name: "Sana Patel",
    role: "Mindfulness Coach",
 
    experience: "Specialist in anxiety & stress reduction",
  },
];

const Mentors = () => {
  return (
    <section className="bg-gradient-to-b from-orange-50 to-white py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-3">
          Meet Our <span className="text-orange-600">Mentors</span>
        </h2>
        <p className="text-stone-600 text-lg max-w-2xl mx-auto mb-12">
          Our experienced guides are here to help you transform your mind & soul.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {mentors.map((mentor, index) => (
            <Card key={index} className="hover:scale-105 transition-all duration-300 text-center">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
                <img src={logo} alt={mentor.name} className="w-full h-full object-cover" />
              </div>
              <CardHeader title={mentor.name} subtitle={mentor.role} />
              <CardContent>
                <CardDescription>{mentor.experience}</CardDescription>
                <div className="flex justify-center gap-1 mt-2 text-orange-400">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mentors;
