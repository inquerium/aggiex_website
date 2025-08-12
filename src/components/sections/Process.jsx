import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, FileText, Users, Rocket, ArrowRight, CheckCircle, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const applicationSteps = [
  {
    key: "apply",
    icon: <FileText className="h-8 w-8 text-maroon-600 mb-2" />,
    title: "Apply NOW",
    desc: "Submit your application for the inaugural AggieX cohort - applications are open NOW!",
    bullets: [
      "Complete online application form",
      "Team background and experience",
      "Market opportunity and traction",
    ],
    cta: "Apply Now",
    timeline: "NOW - December 2024",
    urgency: "Limited spots available"
  },
  {
    key: "interview",
    icon: <Users className="h-8 w-8 text-maroon-600 mb-2" />,
    title: "Interview",
    desc: "Meet with our selection committee for in-depth discussions about your venture.",
    bullets: [
      "Pitch presentation & business model to committee",
      "Q&A session with mentors",
      "Team dynamics assessment",
      "Market validation review",
    ],
    cta: "Prepare for Interview",
    timeline: "December 2024 - January 2025",
    urgency: "Rolling interviews"
  },
  {
    key: "selection",
    icon: <CheckCircle className="h-8 w-8 text-maroon-600 mb-2" />,
    title: "Selection",
    desc: "Top teams are selected for the inaugural AggieX Accelerator cohort.",
    bullets: [
      "Final selection committee review",
      "Notification of acceptance",
      "Program orientation and onboarding",
      "Cohort announcement",
    ],
    cta: "View Selection Criteria",
    timeline: "January 2025",
    urgency: "Final decisions"
  },
  {
    key: "launch",
    icon: <Rocket className="h-8 w-8 text-maroon-600 mb-2" />,
    title: "Launch",
    desc: "The inaugural AggieX Accelerator cohort begins with intensive programming and support.",
    bullets: [
      "12-week intensive accelerator program",
      "Seed funding and investment access",
      "Mentorship from successful founders",
      "Demo day with investor showcase",
    ],
    cta: "Learn About Program",
    timeline: "February - May 2025",
    urgency: "Program begins"
  },
];

export default function Programs() {
  const [active, setActive] = useState("apply");
  const current = applicationSteps.find((p) => p.key === active);
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
    <section id="process" className="mobile-process w-full py-16 md:py-20 bg-gray-50 relative">
      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "visible"}
        className="container mx-auto px-6 md:px-8 relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center max-w-4xl mx-auto space-y-8 mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-100">
            <Zap className="h-4 w-4" />
            NOW ACCEPTING APPLICATIONS - Initial Cohort
          </div>
          
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              Join the <span className="text-maroon-600">Inaugural AggieX Cohort</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              <strong>AggieX is launching NOW!</strong> Be among the first to join Texas A&M's premier startup accelerator. 
              Applications are open for our initial cohort, with our full-scale program launching Spring 2025.
            </p>
          </div>
        </motion.div>

        {/* Timeline Visualization */}
        <motion.div variants={itemVariants} className="flex justify-center mb-12">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-green-700">Apply NOW</span>
              </div>
              <ArrowRight className="h-4 w-4 text-maroon-600" />
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-maroon-600" />
                <span className="text-sm font-semibold text-maroon-700">Interview</span>
              </div>
              <ArrowRight className="h-4 w-4 text-maroon-600" />
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-maroon-600" />
                <span className="text-sm font-semibold text-maroon-700">Selection</span>
              </div>
              <ArrowRight className="h-4 w-4 text-maroon-600" />
              <div className="flex items-center gap-2">
                <Rocket className="h-4 w-4 text-maroon-600" />
                <span className="text-sm font-semibold text-maroon-700">Launch</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
          {/* Application Steps Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {applicationSteps.map((step) => (
              <button
                key={step.key}
                onClick={() => setActive(step.key)}
                className={`px-4 py-3 rounded-lg font-semibold border transition-colors duration-200 text-sm md:text-base w-full ${
                  active === step.key 
                    ? step.key === "apply" 
                      ? "bg-green-600 text-white border-green-600 shadow-sm" 
                      : "bg-maroon-600 text-white border-maroon-600 shadow-sm"
                    : "bg-white text-maroon-700 border-gray-300 hover:border-maroon-600 hover:text-maroon-600"
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>
          
          {/* Application Step Content */}
          <div className="bg-white rounded-2xl p-6 md:p-12 shadow-sm border border-gray-200">
            <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-start">
              <div className="space-y-6">
                <div>
                  {current.icon}
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{current.title}</h3>
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed">{current.desc}</p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">What this involves:</h4>
                  <ul className="space-y-3">
                    {current.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600">
                        <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="leading-relaxed text-sm md:text-base">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4">
                  <Link 
                    to="/apply"
                    className={`inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold transition-colors duration-200 shadow-sm hover:shadow-md text-sm md:text-base ${
                      current.key === "apply" 
                        ? "bg-green-600 text-white hover:bg-green-700" 
                        : "bg-maroon-600 text-white hover:bg-maroon-700"
                    }`}
                  >
                    {current.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              {/* Timeline Element */}
              <div className="relative order-first lg:order-last">
                <div className="bg-gradient-to-br from-maroon-50 to-maroon-100 rounded-xl p-6 md:p-8 border border-maroon-200">
                  <div className="text-center space-y-3 md:space-y-4">
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto ${
                      current.key === "apply" ? "bg-green-600" : "bg-maroon-600"
                    }`}>
                      <Calendar className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <h4 className="text-lg md:text-xl font-semibold text-maroon-800">Timeline</h4>
                    <p className="text-maroon-700 font-medium text-sm md:text-base">{current.timeline}</p>
                    {current.urgency && (
                      <div className={`text-xs md:text-sm font-medium ${
                        current.key === "apply" ? "text-green-700" : "text-maroon-600"
                      }`}>
                        {current.urgency}
                      </div>
                    )}
                    <div className="text-xs md:text-sm text-maroon-600">
                      Step {applicationSteps.findIndex(s => s.key === active) + 1} of 4
                    </div>
                  </div>
                </div>
                
                {/* Additional Info Box */}
                {active === "apply" && (
                  <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Zap className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-semibold text-green-800 mb-1">Initial Cohort Launch</p>
                        <p className="text-green-700">
                          This is your chance to be part of our inaugural cohort! Our full-scale program with expanded capacity launches Spring 2025.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
} 