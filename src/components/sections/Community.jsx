import { TrendingUp, ArrowRight, Users, Star, Building2 } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

  return (
    <section id="community" className="w-full py-16 bg-gradient-to-br from-gray-50 via-maroon-50 to-gray-100 relative overflow-hidden">
      {/* Subtle Background Elements with Color Hints */}
      <div className="absolute top-0 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-8 blur-2xl"></div>
      <div className="absolute bottom-0 right-10 w-40 h-40 bg-maroon-200 rounded-full opacity-8 blur-2xl"></div>
      <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-green-200 rounded-full opacity-8 blur-xl"></div>
      
      <motion.div 
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container px-4 md:px-6 mx-auto relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 rounded-full bg-maroon-100 px-6 py-3 text-sm text-maroon-800 font-semibold mb-6 border border-maroon-200"
          >
            <TrendingUp className="h-4 w-4" />
            Growing Movement
          </motion.div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Join the Community</h3>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Already 150+ students, 50+ alumni mentors, and 25+ partners building the future of Aggie innovation.
          </p>
        </motion.div>

        {/* Stats Display - Matching Opportunity section colors */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                number: "150+", 
                label: "Student Builders", 
                icon: Users, 
                color: "text-blue-700", 
                bg: "bg-blue-50", 
                border: "border-blue-200",
                hoverBorder: "hover:border-blue-300",
                gradient: "bg-gradient-to-br from-blue-50 to-blue-100"
              },
              { 
                number: "50+", 
                label: "Alumni Mentors", 
                icon: Star, 
                color: "text-maroon-700", 
                bg: "bg-maroon-50", 
                border: "border-maroon-200",
                hoverBorder: "hover:border-maroon-300",
                gradient: "bg-gradient-to-br from-maroon-50 to-maroon-100"
              },
              { 
                number: "25+", 
                label: "Strategic Partners", 
                icon: Building2, 
                color: "text-green-700", 
                bg: "bg-green-50", 
                border: "border-green-200",
                hoverBorder: "hover:border-green-300",
                gradient: "bg-gradient-to-br from-green-50 to-green-100"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`text-center p-6 ${stat.gradient} rounded-xl border-2 ${stat.border} ${stat.hoverBorder} hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full ${stat.bg} border ${stat.border}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                <div className="text-gray-700 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section with subtle color hints */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="bg-gradient-to-b from-gray-50 via-maroon-50 to-maroon-100 rounded-2xl p-8 relative overflow-hidden shadow-xl border-2 border-maroon-200">
            {/* Background Elements with color hints */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 opacity-15 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-200 opacity-15 rounded-full blur-lg"></div>
            <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-maroon-200 opacity-10 rounded-full blur-md"></div>
            
            <div className="relative z-10">
              <div className="text-2xl font-helvetica font-bold mb-4 text-gray-900">Ready to Build the Future?</div>
              <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto font-helvetica leading-relaxed">
                Every day we wait is another day Stanford and MIT get further ahead. 
                Every day we wait is another Aggie who leaves for Boston or Austin.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="#get-involved" 
                  className="inline-flex items-center gap-3 bg-maroon-700 text-white px-8 py-4 rounded-lg font-helvetica font-bold hover:bg-maroon-800 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Join the Revolution
                  <ArrowRight className="h-5 w-5" />
                </a>
                
                <div className="text-maroon-700 font-helvetica font-medium text-sm border-l-2 border-maroon-300 pl-4">
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