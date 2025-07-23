"use client"

import { motion } from "framer-motion";
import AggieLandImg from "../../assets/aggieland.jpeg";

export default function Hero() {
  return (
    <section className="relative w-full py-16 md:py-28 bg-white">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[60vh]">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-8"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-maroon-800 mb-4">
            The Next Unicorn Should Be Built <span className="text-maroon-600">Right Here</span>,<br />In Aggieland
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-xl mb-6 font-medium">
            <span className="text-maroon-700 font-bold">AggieX</span> is the revolution Texas A&M has been waiting for. <span className="text-maroon-700 font-semibold">Unify. Accelerate. Dominate.</span> Don’t let the next billion-dollar idea leave for Boston or Austin—build it here, with the full force of Aggieland behind you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#get-involved" className="bg-maroon-700 text-white font-bold px-8 py-3 rounded-lg shadow hover:bg-maroon-800 transition text-lg">Get Involved</a>
            <a href="#programs" className="border border-maroon-700 text-maroon-700 font-bold px-8 py-3 rounded-lg hover:bg-maroon-50 bg-transparent transition text-lg">Explore Programs</a>
          </div>
        </motion.div>
        {/* Right: Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <div className="relative w-full max-w-md h-[340px] md:h-[420px] rounded-2xl overflow-hidden shadow-2xl border-4 border-maroon-100">
            <img
              src={AggieLandImg}
              alt="Aggieland campus"
              className="object-cover w-full h-full"
              style={{ filter: 'brightness(0.92) grayscale(0.05)' }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-maroon-900/70 to-transparent h-1/3" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
