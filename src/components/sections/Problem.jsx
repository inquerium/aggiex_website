import { Zap, Award, Users2, Building2 } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Problem() {
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
    <section id="problem" className="w-full py-20 bg-gradient-to-b from-gray-50 to-white relative">
      {/* Section Transition */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-gray-50 to-transparent"></div>
      
      <motion.div 
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container px-4 md:px-6 mx-auto relative z-10"
      >
        <motion.div variants={itemVariants} className="mb-16">
          <div className="p-10 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border border-red-200 shadow-lg">
            <div className="text-center mb-12">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 rounded-full bg-red-200 px-6 py-3 text-sm text-red-800 font-semibold mb-6"
              >
                <Zap className="h-4 w-4" />
                The Hard Truth
              </motion.div>
              <h3 className="text-3xl font-bold text-red-800 mb-6">We're Leaving Billions on the Table</h3>
              <p className="text-red-700 text-xl max-w-4xl mx-auto leading-relaxed">
                We have everything we need to rival Stanford and MIT. But we're fragmented, disconnected, and leaving billions in value on the table. <span className="font-bold">That ends now.</span>
              </p>
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
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-8 bg-white rounded-xl shadow-md border border-red-100 hover:shadow-lg transition-all duration-300"
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
      
      {/* Section Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
} 