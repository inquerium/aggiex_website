"use client"

import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import { Link } from "react-router-dom";
import AggieLandImg from "../../assets/aggieland.jpeg";

export default function Hero() {
  return (
    <section className="relative w-full py-16 md:py-24 bg-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-maroon-200 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-200 rounded-full blur-2xl" />
      </div>
      
      <div className="container mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[70vh] relative z-10">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-maroon-50 text-maroon-700 px-4 py-2 rounded-full text-sm font-medium border border-maroon-100 w-fit"
          >
            <div className="w-2 h-2 bg-maroon-500 rounded-full"></div>
            Texas A&M's Premier Accelerator
          </motion.div>

          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
              The Next <span className="text-maroon-600">Billion-Dollar</span> Startup<br />
              Will Be Built{" "}
              <span className="inline-block">
                <TypeAnimation
                  sequence={[
                    'Right',
                    1000,
                    'Right Here.',
                    10000,
                    '',
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  deletionSpeed={50}
                  cursor={true}
                  className="text-maroon-600"
                />
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
              <span className="text-maroon-600 font-semibold">AggieX</span> is A&M's first university-sponsored, non-profit, accelerator. With the <span className="text-maroon-600 font-semibold">#1 engineering research budget</span>, <span className="text-maroon-600 font-semibold">largest undergrad population</span>, and <span className="text-maroon-600 font-semibold">massive alumni network</span>, AggieX is making Texas A&M into a startup engine.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#vision" 
              className="inline-flex items-center justify-center bg-maroon-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-maroon-700 transition-colors duration-200 text-lg shadow-sm hover:shadow-md"
            >
              Learn About Vision
            </a>
            <Link 
              to="/apply"
              className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-maroon-600 hover:text-maroon-600 bg-white transition-colors duration-200 text-lg"
            >
              Apply
            </Link>
          </div>
        </motion.div>

        {/* Right: Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <div className="relative w-full max-w-lg h-[400px] md:h-[480px] rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            <img
              src={AggieLandImg}
              alt="Aggieland campus"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-gray-100">
                <p className="text-gray-900 font-semibold text-sm">WELCOME TO AGGIELAND</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
