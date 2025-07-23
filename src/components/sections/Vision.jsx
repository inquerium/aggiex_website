import { Target, ChevronDown } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Vision() {
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
    <section id="vision" className="w-full py-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-maroon-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-green-400 rounded-full blur-2xl" />
      </div>

      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container px-4 md:px-6 mx-auto relative z-10"
      >
        {/* Hero Statement */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 rounded-full bg-maroon-100 px-6 py-3 text-sm text-maroon-900 font-helvetica font-semibold mb-6"
          >
            <Target className="h-4 w-4" />
            Our Vision
          </motion.div>
          <h2 className="text-4xl font-helvetica font-extrabold tracking-tight sm:text-6xl text-gray-900 mb-6">
            The <span className="text-maroon-700">Revolution</span> Aggieland<br />
            <span className="text-2xl sm:text-3xl text-maroon-600 font-helvetica">Has Been Waiting For</span>
          </h2>
          <p className="max-w-[900px] text-gray-600 md:text-xl mx-auto leading-relaxed mb-8 font-helvetica">
            While other universities build billion-dollar startups, Texas A&M's potential sits untapped. <span className="text-maroon-700 font-semibold">AggieX is changing that.</span> This is your chance to be part of something that will define the future of Aggie innovation.
          </p>

          {/* Bouncing Arrow */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex justify-center"
          >
            <ChevronDown className="h-8 w-8 text-maroon-600" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Section Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>
  );
} 