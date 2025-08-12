import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Quote, Star, Award, Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
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

  const founders = [
    {
      name: "Avik Khadayat",
      role: "Co-Founder & CEO",
      company: "Electrical Engineering '26",
      description: "Passionate about building scalable solutions and mentoring fellow student entrepreneurs. Leading AggieX's vision to transform Texas A&M into a startup powerhouse.",
      image: "/path-to-avik-image.jpg",
      linkedin: "https://linkedin.com/in/avik-khadayat"
    },
    {
      name: "Zachary Nowroozi",
      role: "Co-Founder & CTO",
      company: "Computer Science '25",
      description: "Technical visionary driving AggieX's innovation engine. Building the infrastructure that will power the next generation of Aggie startups.",
      image: "/path-to-zach-image.jpg",
      linkedin: "https://linkedin.com/in/zachary-nowroozi"
    },
    {
      name: "Jason Wisnieski",
      role: "Co-Founder & COO",
      company: "M.S Entrepreneurship Leadership '26",
      description: "Cofounder of AggieX and a seasoned student builder. Orchestrating the operations that will make AggieX the premier university accelerator.",
      image: "/path-to-jason-image.jpg",
      linkedin: "https://linkedin.com/in/jason-wisnieski"
    }
  ];

  const advisorQuotes = [
    {
      quote: "AggieX represents the future of university innovation. By connecting Texas A&M's vast resources with entrepreneurial talent, we're creating something truly special.",
      author: "Jennifer McFerrin-Bohner",
      title: "Advisory Board Chair",
      company: "Texas A&M University"
    },
    {
      quote: "The technical infrastructure and mentorship that AggieX provides will be game-changing for student entrepreneurs. This is exactly what Texas A&M needs.",
      author: "John Billings",
      title: "Technical Advisor",
      company: "CTO at TechCorp"
    }
  ];

  const presidentQuote = {
    quote: "AggieX embodies the Aggie spirit of innovation and entrepreneurship. This accelerator will position Texas A&M as a leader in university startup ecosystems and create opportunities for our students to build the next generation of successful companies.",
    author: "Dr. M. Katherine Banks",
    title: "President",
    company: "Texas A&M University"
  };

  return (
    <main className="flex-1 pt-20">
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-full bg-white relative overflow-hidden"
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="w-full py-4 md:py-24 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-6 md:px-8">
              <div className="text-center max-w-4xl mx-auto space-y-8">
                <div className="inline-flex items-center gap-2 bg-maroon-50 text-maroon-700 px-4 py-2 rounded-full text-sm font-medium border border-maroon-100">
                  <Users className="h-4 w-4" />
                  Meet Our Team
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
                  The Team Behind <span className="text-maroon-600">AggieX</span>
                </h1>
                
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Meet the founders, advisors, and leaders who are building Texas A&M's first university-sponsored accelerator.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Founders Section */}
          <motion.div variants={itemVariants} className="w-full py-16 md:py-20 bg-white">
            <div className="container mx-auto px-6 md:px-8">
              <div className="text-center space-y-8 mb-16">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
                  <Star className="h-4 w-4" />
                  Our Founders
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The Visionaries</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Three Aggies with a shared vision of transforming Texas A&M into a startup powerhouse.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {founders.map((founder, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Profile Image Placeholder */}
                    <div className="flex justify-center mb-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-maroon-600 to-maroon-700 rounded-full flex items-center justify-center">
                        <Users className="h-12 w-12 text-white" />
                        {/* Replace with actual image: <img src={founder.image} alt={founder.name} className="w-24 h-24 rounded-full object-cover" /> */}
                      </div>
                    </div>

                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-bold text-gray-900">{founder.name}</h3>
                      <p className="text-maroon-600 font-semibold">{founder.role}</p>
                      <p className="text-gray-500 text-sm">{founder.company}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{founder.description}</p>
                      
                      <a
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-maroon-600 hover:text-maroon-700 font-medium text-sm"
                      >
                        Connect on LinkedIn
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Advisor Quotes Section */}
          <motion.div variants={itemVariants} className="w-full py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto px-6 md:px-8">
              <div className="text-center space-y-8 mb-16">
                <div className="inline-flex items-center gap-2 bg-maroon-50 text-maroon-700 px-4 py-2 rounded-full text-sm font-medium border border-maroon-100">
                  <Award className="h-4 w-4" />
                  Advisor Insights
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Advisors Say</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {advisorQuotes.map((quote, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
                  >
                    <Quote className="h-8 w-8 text-maroon-600 mb-4" />
                    <blockquote className="text-lg text-gray-700 italic mb-6 leading-relaxed">
                      "{quote.quote}"
                    </blockquote>
                    <div>
                      <p className="font-semibold text-gray-900">{quote.author}</p>
                      <p className="text-maroon-600 text-sm">{quote.title}</p>
                      <p className="text-gray-500 text-sm">{quote.company}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* President Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-maroon-600 to-maroon-700 rounded-2xl p-12 text-white max-w-4xl mx-auto"
              >
                <Quote className="h-12 w-12 text-maroon-200 mb-6" />
                <blockquote className="text-2xl md:text-3xl italic mb-8 leading-relaxed">
                  "{presidentQuote.quote}"
                </blockquote>
                <div>
                  <p className="text-xl font-semibold">{presidentQuote.author}</p>
                  <p className="text-maroon-200">{presidentQuote.title}</p>
                  <p className="text-maroon-200">{presidentQuote.company}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div variants={itemVariants} className="w-full py-16 md:py-20 bg-white">
            <div className="container mx-auto px-6 md:px-8">
              <div className="text-center space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Ready to Join the Movement?</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Be part of the team that's transforming Texas A&M into a startup powerhouse.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link 
                    to="/apply"
                    className="inline-flex items-center gap-3 bg-maroon-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-maroon-700 transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    Apply Now
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  
                  <Link 
                    to="/waitlist"
                    className="inline-flex items-center gap-3 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-maroon-600 hover:text-maroon-600 transition-colors duration-200"
                  >
                    View Waitlist
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
  );
} 