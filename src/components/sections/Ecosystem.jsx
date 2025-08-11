import { Building2, Users, TrendingUp, Target } from "lucide-react";
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
    <section id="ecosystem" className="w-full py-16 md:py-20 bg-white relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 bg-maroon-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-200 rounded-full blur-2xl" />
      </div>

      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-6 md:px-8 relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center max-w-4xl mx-auto space-y-8 mb-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-maroon-50 text-maroon-700 px-4 py-2 rounded-full text-sm font-medium border border-maroon-100"
          >
            <Building2 className="h-4 w-4" />
            The AggieX Ecosystem
          </motion.div>
          
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              The <span className="text-maroon-600">Complete</span> Innovation<br />
              <span className="text-2xl sm:text-3xl text-maroon-600">Infrastructure</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              AggieX isn't just another program—it's the <span className="text-maroon-600 font-semibold">unified infrastructure</span> that connects every piece of Texas A&M's innovation potential into one powerful, world-class startup engine.
            </p>
          </div>
        </motion.div>

        {/* Ecosystem Pillars */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ecosystemPillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative"
            >
              <div className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-md transition-all duration-300 h-full">
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-maroon-50 rounded-lg group-hover:bg-maroon-100 transition-colors">
                    <pillar.icon className="h-6 w-6 text-maroon-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">{pillar.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
                  
                  {/* Stats */}
                  <div className="pt-4">
                    <div className="text-3xl font-bold text-maroon-600">{pillar.stat}</div>
                    <div className="text-sm text-gray-500 font-medium">{pillar.label}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}