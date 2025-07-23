"use client"

import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import AggieLandImg from "../../assets/aggieland.jpeg";

export default function Hero() {
  return (
    <section className="relative w-full py-16 md:py-28 bg-gradient-to-b from-maroon-900 to-maroon-800 overflow-hidden">
      {/* Background pattern for texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-black rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-maroon-300 rounded-full blur-2xl" />
      </div>
      
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[60vh] relative z-10">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-8"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-helvetica font-extrabold tracking-tight leading-tight text-white mb-4">
            The Next <span className="text-maroon-200">Billion-Dollar</span> Startup<br />
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
                className="animate-glow font-helvetica"
                style={{color: '#D1D1D1'}}
              />
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-xl mb-6 font-helvetica leading-relaxed">
            <span className="text-maroon-200 font-bold">AggieX</span> is the missing piece. We're building the infrastructure that connects Texas A&M's <span className="text-maroon-200 font-semibold">#1 engineering research budget</span>, <span className="text-maroon-200 font-semibold">largest undergrad population</span>, and <span className="text-maroon-200 font-semibold">massive alumni network</span> into a startup engine that rivals Stanford and MIT.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#vision" className="bg-white text-maroon-800 font-helvetica font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition text-lg">Learn About Vision</a>
            <a href="#get-involved" className="border-2 border-white text-white font-helvetica font-bold px-8 py-3 rounded-lg hover:bg-white hover:text-maroon-800 bg-transparent transition text-lg">Join Us</a>
          </div>
        </motion.div>
        {/* Right: Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <div className="relative w-full max-w-md h-[340px] md:h-[420px] rounded-2xl overflow-hidden shadow-2xl border-4 border-maroon-200 transform hover:scale-105 transition-transform duration-300">
            <img
              src={AggieLandImg}
              alt="Aggieland campus"
              className="object-cover w-full h-full"
              style={{ filter: 'brightness(0.95) contrast(1.1)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/40 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 text-center">
                <p className="text-maroon-800 font-helvetica font-bold text-sm">WELCOME TO AGGIELAND</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
