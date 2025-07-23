import { Building2, Users, TrendingUp, Target, ArrowRight, Cog } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Ecosystem() {
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

  const ecosystemPillars = [
    {
      title: "Unified Infrastructure",
      description: "Connecting all of Texas A&M's innovation resources into one cohesive system",
      icon: Building2,
      stat: "100%",
      label: "Integration"
    },
    {
      title: "Alumni Network",
      description: "Leveraging the largest, most loyal alumni base in the nation",
      icon: Users,
      stat: "500K+",
      label: "Aggies"
    },
    {
      title: "Research Pipeline",
      description: "Converting #1 engineering research budget into startup opportunities",
      icon: TrendingUp,
      stat: "$1B+",
      label: "Research"
    },
    {
      title: "Startup Engine",
      description: "Building the next generation of billion-dollar Aggie companies",
      icon: Target,
      stat: "∞",
      label: "Potential"
    }
  ];

  return (
    <section id="ecosystem" className="w-full py-16 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 bg-maroon-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-400 rounded-full blur-2xl" />
      </div>

      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container px-4 md:px-6 mx-auto relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 rounded-full bg-maroon-100 px-6 py-3 text-sm text-maroon-900 font-helvetica font-bold mb-6"
          >
            <Building2 className="h-4 w-4" />
            The AggieX Ecosystem
          </motion.div>
          <h2 className="text-4xl font-helvetica font-extrabold tracking-tight sm:text-5xl text-gray-900 mb-6">
            The <span className="text-maroon-700">Complete</span> Innovation<br />
            <span className="text-2xl sm:text-3xl text-maroon-600 font-helvetica">Infrastructure</span>
          </h2>
          <p className="max-w-3xl text-gray-600 text-lg mx-auto leading-relaxed font-helvetica">
            AggieX isn't just another program—it's the <span className="text-maroon-700 font-semibold">unified infrastructure</span> that connects every piece of Texas A&M's innovation potential into one powerful, world-class startup engine.
          </p>
        </motion.div>

        {/* Ecosystem Pillars */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecosystemPillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative overflow-hidden"
              >
                {/* Card with Hero-style design */}
                <div className="relative w-full h-[280px] rounded-2xl overflow-hidden shadow-2xl border-2 border-maroon-200 transform hover:scale-105 transition-transform duration-300">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-maroon-50 via-white to-maroon-100" />
                  
                  {/* Content */}
                  <div className="relative z-10 p-6 h-full flex flex-col">
                    {/* Icon */}
                    <div className="mb-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-maroon-100 rounded-lg group-hover:bg-maroon-200 transition-colors">
                        <pillar.icon className="h-6 w-6 text-maroon-700 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>

                    {/* Title and Description */}
                    <div className="flex-1">
                      <h3 className="font-helvetica font-bold text-gray-900 mb-3 text-lg">{pillar.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed font-helvetica">{pillar.description}</p>
                    </div>
                    
                    {/* Stats - Hero-style overlay */}
                    <div className="mt-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 text-center border border-maroon-200">
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-2xl font-helvetica font-black text-maroon-700">{pillar.stat}</span>
                          <span className="text-sm font-helvetica font-semibold text-gray-500 uppercase tracking-wider">{pillar.label}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/20 via-transparent to-transparent" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Transition to Programs Section */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="bg-gradient-to-r from-maroon-50 via-white to-maroon-50 rounded-2xl p-8 border border-maroon-100 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-maroon-200 opacity-20 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-maroon-300 opacity-15 rounded-full blur-lg"></div>

            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-maroon-600 to-maroon-700 rounded-full flex items-center justify-center shadow-lg">
                  <Cog className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-helvetica font-bold text-gray-900 mb-4">
                From <span className="text-maroon-700">Infrastructure</span> to <span className="text-maroon-700">Engine</span>
              </h3>
              <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto font-helvetica">
                This infrastructure powers our <span className="text-maroon-700 font-semibold">four-stage innovation engine</span>—the proven system that transforms ideas into world-changing ventures.
              </p>

              <div className="flex justify-center">
                <div className="flex items-center gap-3 text-maroon-700 font-helvetica font-semibold">
                  <span>See How It Works</span>
                  <ArrowRight className="h-5 w-5 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Section Transition - Gradient to Programs */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 via-white to-transparent"></div>
    </section>
  );
}