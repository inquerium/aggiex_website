import { Users, TrendingUp, Target, ArrowRight, Star } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

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
    <section id="opportunity" className="mobile-opportunity mobile-section w-full py-16 md:py-20 bg-white relative">
      <motion.div 
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-6 md:px-8 relative z-10"
      >
        {/* Choose Your Role Section */}
        <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
          <div className="mobile-section-header text-center space-y-8 mb-16">
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200"
            >
              <Users className="h-4 w-4" />
              Your Chance to Shape the Future
            </motion.div>
            
            <div className="space-y-6">
              <h3 className="mobile-section-title text-4xl md:text-5xl font-bold text-gray-900">Choose Your Role in the Revolution</h3>
            </div>
            <p className="mobile-section-subtitle text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                AggieX represents a unique opportunity to be part of Texas A&M's transformation into a startup powerhouse. 
                <span className="text-maroon-600 font-semibold"> Our non-profit model creates a win-win: founders retain full ownership while investors benefit from tax-advantaged opportunities.</span>
              </p>
          </div>

          <div className="mobile-opportunity-cards grid lg:grid-cols-3 gap-8">
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
                subtitle: "Build Companies or Invest",
                description: "You helped build Texas A&M. Now help build the next generation of Aggie entrepreneurs through direct involvement or investment.",
                benefits: [
                  "Build companies alongside current students as co-founders",
                  "Invest in promising Aggie startups with tax advantages",
                  "Mentor the next generation of Aggie entrepreneurs",
                  "First access to breakthrough innovations from campus"
                ],
                cta: "Get Involved",
                color: "maroon",
                icon: Star
              },
              {
                title: "Advisors & Mentors",
                subtitle: "Share Your Expertise",
                description: "Leverage your experience to guide the next generation of Aggie entrepreneurs and shape the future of innovation.",
                benefits: [
                  "Mentor promising student entrepreneurs",
                  "Provide strategic advice to growing startups",
                  "Access to cutting-edge research commercialization",
                  "Build lasting relationships with future industry leaders"
                ],
                cta: "Become a Mentor",
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
    </section>
  );
}

function AudienceCard({ title, subtitle, description, benefits, cta, color, icon: Icon }) {
  const colorClasses = {
    blue: "border-blue-200 hover:border-blue-300",
    maroon: "border-maroon-200 hover:border-maroon-300", 
    green: "border-green-200 hover:border-green-300"
  };

  const textColors = {
    blue: "text-blue-700",
    maroon: "text-maroon-700",
    green: "text-green-700"
  };

  const bgColors = {
    blue: "bg-blue-50",
    maroon: "bg-maroon-50",
    green: "bg-green-50"
  };

  const buttonColors = {
    blue: "bg-blue-600 hover:bg-blue-700",
    maroon: "bg-maroon-600 hover:bg-maroon-700",
    green: "bg-green-600 hover:bg-green-700"
  };

  return (
    <div className={`p-8 bg-white rounded-xl border border-gray-200 ${colorClasses[color]} hover:shadow-md transition-all duration-300 h-full flex flex-col`}>
      {/* Icon */}
      <div className={`inline-flex items-center justify-center w-12 h-12 ${bgColors[color]} rounded-lg mb-6`}>
        <Icon className={`h-6 w-6 ${textColors[color]}`} />
      </div>

      {/* Content */}
      <div className="flex-1 space-y-4">
        <div>
          <h4 className="text-2xl font-bold text-gray-900 mb-2">{title}</h4>
          <p className={`text-lg font-semibold ${textColors[color]} mb-4`}>{subtitle}</p>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>

        {/* Benefits */}
        <div className="space-y-3">
          <h5 className="font-semibold text-gray-900">What you get:</h5>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-600">
                <div className={`w-1.5 h-1.5 ${bgColors[color]} rounded-full mt-2 flex-shrink-0`}></div>
                <span className="text-sm leading-relaxed">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-8">
        <Link 
          to="/apply"
          className={`inline-flex items-center justify-center w-full ${buttonColors[color]} text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-sm hover:shadow-md`}
        >
          {cta}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
      </div>
    </div>
  );
}