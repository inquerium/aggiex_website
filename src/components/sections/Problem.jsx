import { Zap, Award, Users2, Building2 } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Problem() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "0px" });

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
    <section id="problem" className="w-full py-16 md:py-20 bg-white relative">
      <motion.div 
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-6 md:px-8 relative z-10"
      >
        <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border border-red-200 p-12 shadow-sm">
            <div className="text-center space-y-8 mb-12">
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium border border-red-200"
              >
                <Zap className="h-4 w-4" />
                The Hard Truth
              </motion.div>
              
              <div className="space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold text-red-800">We're Leaving Billions on the Table</h3>
                <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                  Texas A&M has everything needed to build billion-dollar startups: world-class research, massive talent pool, and a global alumni network. 
                  <span className="text-maroon-600 font-semibold"> Yet we lack the unified infrastructure to connect these resources.</span>
                  <span className="text-maroon-600 font-semibold"> AggieX is changing that.</span>
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { number: "$1.2B", label: "Research Budget", status: "Unleashed", icon: Award },
                { number: "500K+", label: "Alumni Network", status: "Untapped", icon: Users2 },
                { number: "#1", label: "Engineering Population", status: "Underutilized", icon: Building2 }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="text-center p-8 bg-white rounded-xl shadow-sm border border-red-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex justify-center mb-4">
                    <stat.icon className="h-10 w-10 text-red-600" />
                  </div>
                  <div className="text-4xl font-bold text-red-600 mb-3">{stat.number}</div>
                  <div className="text-lg text-red-700 font-medium mb-2">{stat.label}</div>
                  <div className="text-sm text-red-500 font-semibold">({stat.status})</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
} 