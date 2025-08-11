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
    <section id="vision" className="w-full py-16 md:py-20 bg-gray-50 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-maroon-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-green-200 rounded-full blur-2xl" />
      </div>

      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-6 md:px-8 relative z-10"
      >
        {/* Hero Statement */}
        <motion.div variants={itemVariants} className="text-center max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-maroon-50 text-maroon-700 px-4 py-2 rounded-full text-sm font-medium border border-maroon-100"
          >
            <Target className="h-4 w-4" />
            Our Vision
          </motion.div>

          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
              The <span className="text-maroon-600">Revolution</span> Aggieland has been waiting for.
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              While other universities build billion-dollar startups, Texas A&M's potential sits untapped. 
              <span className="text-maroon-600 font-semibold"> AggieX is changing that. </span> 
              <span className="text-maroon-600 font-semibold">Founders keep 100% equity. </span>
              This is your chance to be part of something that will define the future of Aggie innovation.
            </p>
          </div>

          {/* Bouncing Arrow */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex justify-center pt-8"
          >
            <ChevronDown className="h-8 w-8 text-maroon-600" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
} 