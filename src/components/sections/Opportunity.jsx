import { Users, TrendingUp, Target, ArrowRight, Star } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Opportunity() {
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
    <section id="opportunity" className="w-full py-20 bg-gradient-to-b from-white to-gray-50 relative">
      {/* Section Transition */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent"></div>
      
      <motion.div 
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container px-4 md:px-6 mx-auto relative z-10"
      >
        {/* Choose Your Role Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-6 py-3 text-sm text-blue-800 font-semibold mb-8 mx-auto block text-center"
          >
            <Users className="h-4 w-4" />
            Your Chance to Shape the Future
          </motion.div>
          <h3 className="text-4xl font-bold text-center text-gray-900 mb-16">Choose Your Role in the Revolution</h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: "Students",
                subtitle: "Build the Next Unicorn",
                description: "Stop waiting for permission. Join a community of builders, creators, and innovators who are actually building the future.",
                benefits: [
                  "Access to $1.2B in research resources",
                  "Direct connection to 500K+ alumni network",
                  "Real funding, real mentorship, real results"
                ],
                cta: "Start Building",
                color: "blue",
                icon: TrendingUp
              },
              {
                title: "Alumni",
                subtitle: "Invest in the Future You Built",
                description: "You helped build Texas A&M. Now help build the next generation of Aggie entrepreneurs and secure your legacy.",
                benefits: [
                  "First access to breakthrough innovations",
                  "Mentor the next generation of Aggies",
                  "Build wealth while building legacy"
                ],
                cta: "Invest in Aggies",
                color: "maroon",
                icon: Star
              },
              {
                title: "Advisors & Partners",
                subtitle: "Join the Innovation Engine",
                description: "Be part of the team that transforms Texas A&M into the premier startup ecosystem in the South.",
                benefits: [
                  "Shape the future of university innovation",
                  "Access to cutting-edge research commercialization",
                  "Build lasting partnerships with AggieX"
                ],
                cta: "Partner With Us",
                color: "green",
                icon: Target
              }
            ].map((audience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <AudienceCard {...audience} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      
      {/* Section Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>
  );
}

function AudienceCard({ title, subtitle, description, benefits, cta, color, icon: Icon }) {
  const colorClasses = {
    blue: "border-blue-200 hover:border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100",
    maroon: "border-maroon-200 hover:border-maroon-300 bg-gradient-to-br from-maroon-50 to-maroon-100", 
    green: "border-green-200 hover:border-green-300 bg-gradient-to-br from-green-50 to-green-100"
  };

  const textColors = {
    blue: "text-blue-700",
    maroon: "text-maroon-700",
    green: "text-green-700"
  };

  const bgColors = {
    blue: "bg-blue-600 hover:bg-blue-700",
    maroon: "bg-maroon-600 hover:bg-maroon-700", 
    green: "bg-green-600 hover:bg-green-700"
  };

  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.02 }}
      className={`bg-white rounded-xl shadow-lg p-8 border-2 ${colorClasses[color]} transition-all duration-300 hover:shadow-xl`}
    >
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className={`p-3 rounded-full ${bgColors[color]} text-white`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className={`text-lg font-semibold ${textColors[color]} mb-3`}>{subtitle}</p>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
      
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">What You Get:</h4>
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <motion.li 
              key={index} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-2 text-sm text-gray-700"
            >
              <ArrowRight className={`h-4 w-4 mt-0.5 ${textColors[color]} flex-shrink-0`} />
              <span>{benefit}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.a 
        href="#get-involved" 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`block w-full text-center ${bgColors[color]} text-white px-6 py-3 rounded-lg font-bold transition shadow-md hover:shadow-lg`}
      >
        {cta}
      </motion.a>
    </motion.div>
  );
} 