import { Headphones, Play, ArrowRight, Mic } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Podcast() {
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
    <section id="podcast" className="w-full py-16 md:py-20 bg-gray-900 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-maroon-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-400 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-400 rounded-full blur-xl"></div>
      </div>

      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-6 md:px-8 relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center max-w-4xl mx-auto space-y-8 mb-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20"
          >
            <Mic className="h-4 w-4" />
            Coming Soon
          </motion.div>
          
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              The <span className="text-maroon-300">AggieX Podcast</span> is Coming
            </h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
              Weekly conversations with founders, investors, and ecosystem builders. 
              This isn't just a podcast—it's the voice of the AggieX revolution.
            </p>
          </div>
        </motion.div>

        {/* Coming Soon Content */}
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-maroon-600 via-purple-600 to-blue-600 rounded-2xl p-12 text-white relative overflow-hidden shadow-xl">
            <div className="space-y-8">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <Headphones className="h-10 w-10 text-white" />
                </div>
              </div>
              
              <div className="text-center space-y-6">
                <h3 className="text-3xl font-bold">The Voice of Aggie Innovation</h3>
                <p className="text-maroon-100 text-lg max-w-2xl mx-auto leading-relaxed">
                  We're building something special. The AggieX Podcast will feature conversations with the people 
                  who are actually building the future of Aggie entrepreneurship. From student founders to successful 
                  alumni, from investors to researchers—this is where you'll hear the real stories behind the revolution.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold">Weekly Episodes</h4>
                  <p className="text-maroon-100 text-sm">Fresh content every week with the latest insights and stories</p>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                    <Mic className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold">Real Stories</h4>
                  <p className="text-maroon-100 text-sm">Authentic conversations with the people building Aggie innovation</p>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                    <ArrowRight className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold">Actionable Insights</h4>
                  <p className="text-maroon-100 text-sm">Practical advice and strategies you can apply to your own venture</p>
                </div>
              </div>
              
              <div className="text-center pt-4">
                <div className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-sm hover:shadow-md">
                  Get Notified When We Launch
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
} 