import { TrendingUp, ArrowRight, Users, Star, Building2, Award, Network } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import jasonWisnieski from "../../assets/jason_headshot.jpeg"
import avikKhadayat from "../../assets/avik_headshot.png"
import zacharyNowroozi from "../../assets/zach_headshot.jpeg"
import JohnBillings from "../../assets/Billings_headshot.jpg"
import StevenBradford from "../../assets/bradford_headshot.png"
import StephenWisnieski from "../../assets/StephenWisnieski_headshot.jpeg"

export default function Community() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Combined data for advisors and alumni - you can replace these with actual data
  const communityLeaders = [
    {
      name: "Stephen Wisnieski",
      role: "Transportation & Logistics Advisor",
      company: "AmeriMex Transportation Services",
      description: "Experienced transportation and international logistics executive with 2K+ followers. Expert in supply chain management and 3PL/4PL solutions.",
      type: "advisor",
      image: StephenWisnieski
    },
    {
      name: "John Billings",
      role: "Revenue Strategy Advisor",
      company: "Chief Revenue Officer at Travation Ltd",
      description: "23+ years leading global sales teams generating $500M+ in revenue. Expert in B2B/B2C enterprise sales, pricing strategy, and AI-driven business transformation.",
      type: "advisor",
      image: JohnBillings
    },
    {
      name: "Steven Bradford",
      role: "Real Estate Advisor",
      company: "Ascendant CRE",
      description: "Providing real estate investment, development, and consulting expertise to help AggieX startups scale their physical infrastructure and real estate needs.",
      type: "advisor",
      image: StevenBradford
    },
    {
      name: "Jason Wisnieski",
      role: "Student Builder",
      company: "M.S Entrepreneurship Leadership '26",
      description: "Cofounder of AggieX, and a seasoned student builder.",
      type: "student",
      image: jasonWisnieski
    },
    {
      name: "Zachary Nowroozi",
      role: "Student Builder",
      company: "Electrical Engineering '27",
      description: "Cofounder of AggieX, focused on creating innovative technology solutions and fostering the startup ecosystem.",
      type: "student",
      image: zacharyNowroozi
    },

    {
      name: "Avik Khadayat",
      role: "Student Builder",
      company: "Electrical Engineering '26",
      description: "Cofounder of AggieX, passionate about building scalable solutions and mentoring fellow student entrepreneurs.",
      type: "student",
      image: avikKhadayat
    }
  ];

  return (
    <section id="community" className="w-full py-16 md:py-20 bg-gray-50 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-10 blur-2xl"></div>
      <div className="absolute bottom-0 right-10 w-40 h-40 bg-maroon-200 rounded-full opacity-10 blur-2xl"></div>
      <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-green-200 rounded-full opacity-10 blur-xl"></div>
      
      <motion.div 
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-6 md:px-8 relative z-10"
      >
        {/* Hero Section - Horizontal Layout */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-maroon-100 to-maroon-200 rounded-2xl p-8 border border-maroon-200">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-maroon-600 rounded-full flex items-center justify-center mx-auto">
                    <Network className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-maroon-800">The First Large Aggie-Founder Network</h3>
                  <p className="text-maroon-700 leading-relaxed">
                    Join the inaugural community of Aggie entrepreneurs building the future together.
                  </p>
                </div>
              </div>
              {/* Replace the above div with your actual image:
              <img 
                src="/path-to-your-image.jpg" 
                alt="Aggie founder network" 
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
              */}
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="space-y-8"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-maroon-50 text-maroon-700 px-4 py-2 rounded-full text-sm font-medium border border-maroon-100">
                <TrendingUp className="h-4 w-4" />
                Join the Revolution
              </div>
              
              <div className="space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Be Part of the <span className="text-maroon-600">First Large Aggie-Founder Network</span>
                </h3>
                <p className="text-xl text-gray-600 leading-relaxed">
                  This isn't just another startup community—it's the first time Aggie entrepreneurs will have a unified network 
                  of founders, investors, and mentors. 
                  <span className="text-maroon-600 font-semibold">Our non-profit structure ensures every dollar and every connection goes directly to building successful companies.</span>
                  You'll be part of the foundation that builds the next generation of billion-dollar Aggie companies.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-maroon-600 rounded-full"></div>
                    <span className="text-gray-700">Direct access to 500K+ Aggie alumni network</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-maroon-600 rounded-full"></div>
                    <span className="text-gray-700">Connect with successful Aggie founders and investors</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-maroon-600 rounded-full"></div>
                    <span className="text-gray-700">Be part of the first cohort that sets the standard</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Community Leaders Section */}
        <motion.div variants={itemVariants} className="mb-16 py-16">
          <div className="text-center space-y-8 mb-12">
            <div className="inline-flex items-center gap-2 bg-maroon-50 text-maroon-700 px-4 py-2 rounded-full text-sm font-medium border border-maroon-100">
              <Star className="h-4 w-4" />
              Our Community Leaders
            </div>
            <h4 className="text-2xl md:text-3xl font-bold text-gray-900 ">This Could Be You</h4>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Meet the advisors and alumni mentors who are already building the AggieX community. 
              <span className="text-maroon-600 font-semibold"> Apply now and join them in shaping the future of Aggie innovation.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communityLeaders.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-md transition-all duration-300"
              >
                {/* Profile Image */}
                <div className="flex justify-center mb-6">
                  <img 
                    src={leader.image} 
                    alt={leader.name} 
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                  />
                </div>

                <div className="text-center space-y-3">
                  <h5 className="text-lg font-bold text-gray-900">{leader.name}</h5>
                  <p className="text-maroon-600 font-semibold">{leader.role}</p>
                  <p className="text-gray-500 text-sm">{leader.company}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{leader.description}</p>
                  
                  {/* Type Badge */}
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                    leader.type === 'advisor' 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : leader.type === 'alumni'
                      ? 'bg-maroon-50 text-maroon-700 border border-maroon-200'
                      : 'bg-green-50 text-green-700 border border-green-200'
                  }`}>
                    {leader.type === 'advisor' ? <Award className="h-3 w-3" /> : 
                     leader.type === 'alumni' ? <Star className="h-3 w-3" /> :
                     <Users className="h-3 w-3" />}
                    {leader.type === 'advisor' ? 'Advisor' : 
                     leader.type === 'alumni' ? 'Alumni Mentor' :
                     'Student Builder'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Learn More Button */}
          {/*<div className="text-center mt-12">
            <Link 
              to="/about"
              className="inline-flex items-center gap-3 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-maroon-600 hover:text-maroon-600 transition-colors duration-200"
            >
              Learn More About Our Team
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>*/}
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-200 max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="text-2xl font-bold text-gray-900">Ready to Join the First Aggie-Founder Network?</div>
              <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
                Every day we wait is another day Stanford and MIT get further ahead. 
                Every day we wait is another Aggie who leaves for Boston or Austin.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  to="/apply"
                  className="inline-flex items-center gap-3 bg-maroon-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-maroon-700 transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  Apply
                  <ArrowRight className="h-5 w-5" />
                </Link>
                
                <div className="text-maroon-700 font-medium text-sm border-l-2 border-maroon-300 pl-4">
                  Don't let this moment pass.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
} 