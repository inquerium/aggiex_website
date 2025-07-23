import { Play, Headphones, Mic, Users, TrendingUp, ArrowRight } from "lucide-react";
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

  const featuredEpisodes = [
    {
      number: "01",
      title: "The Missing Engine",
      guest: "Steven Bradford",
      description: "Why Texas A&M has everything needed for world-class startups—except the system to connect it all.",
      quote: "AggieX is the infrastructure we needed but never had. We're not just building startups — we're building the system.",
      color: "from-blue-500 to-purple-600"
    },
    {
      number: "02", 
      title: "From Dorm Room to Deal Flow",
      guest: "Student Founders",
      description: "Real stories from Aggies building ventures while balancing classes, and what early support could unlock.",
      quote: "If AggieX had been here before, I'd have been able to go further, faster.",
      color: "from-green-500 to-blue-600"
    },
    {
      number: "03",
      title: "StartX, i-Lab, AggieX", 
      guest: "Stanford/Harvard Alumni",
      description: "How elite university ecosystems were student-led at the start—just like AggieX. The proven blueprint.",
      quote: "Stanford didn't ask for permission. Harvard didn't wait. Neither should AggieX.",
      color: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <section id="podcast" className="w-full py-20 bg-gradient-to-br from-gray-900 via-maroon-900 to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
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
        className="container px-4 md:px-6 mx-auto relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm text-white font-semibold mb-6 border border-white/20"
          >
            <Headphones className="h-4 w-4" />
            AggieX: The Engine
          </motion.div>
          <h2 className="text-4xl font-bold text-white mb-6">
            The Podcast That's <span className="text-maroon-300">Building the Movement</span>
          </h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Weekly conversations with founders, investors, and ecosystem builders. 
            This isn't just a podcast—it's the voice of the AggieX revolution.
          </p>
        </motion.div>

        {/* Featured Episodes */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredEpisodes.map((episode, index) => (
            <motion.div
              key={episode.number}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              {/* Episode Number */}
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${episode.color} text-white font-bold text-lg mb-4`}>
                {episode.number}
              </div>
              
              {/* Episode Info */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-maroon-300 transition-colors">
                {episode.title}
              </h3>
              <p className="text-maroon-200 text-sm font-medium mb-3">
                Guest: {episode.guest}
              </p>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {episode.description}
              </p>
              
              {/* Quote */}
              <div className="bg-white/5 rounded-lg p-4 border-l-4 border-maroon-400">
                <p className="text-white text-sm italic leading-relaxed">
                  "{episode.quote}"
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="bg-gradient-to-r from-maroon-600 via-purple-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-maroon-300 opacity-20 rounded-full blur-lg"></div>
            
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Play className="h-8 w-8 text-white ml-1" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Listen to the Revolution</h3>
              <p className="text-maroon-100 text-lg mb-6 max-w-2xl mx-auto">
                Join thousands of Aggies tuning in weekly to hear the stories, strategies, and vision 
                that's building the next generation of Texas A&M entrepreneurs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="#podcast-platforms" 
                  className="inline-flex items-center gap-3 bg-white text-maroon-800 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <Headphones className="h-5 w-5" />
                  Listen Now
                </a>
                
                <a 
                  href="#get-involved" 
                  className="inline-flex items-center gap-3 border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-maroon-800 transition-all duration-300"
                >
                  Join the Movement
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
              
              <div className="mt-6 text-maroon-200 text-sm">
                New episodes every week • Available on all major platforms
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
} 