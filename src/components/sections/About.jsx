"use client"

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-6 max-w-3xl mx-auto text-center"
        >
          <div className="inline-block rounded-full bg-background px-4 py-1.5 text-sm font-medium text-primary">
            About AggieX
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Unifying Aggie Innovation
          </h2>
          <p className="text-muted-foreground text-lg">
            AggieX is a student-led, university-aligned incubator and accelerator designed to unify Texas A&M’s fragmented entrepreneurial ecosystem. We don’t replace existing programs—we connect them into a cohesive funnel that supports student founders, alumni innovators, and research commercialization.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white rounded-xl shadow p-6 border">
              <h3 className="font-semibold mb-2 text-maroon-700">AggieX is not...</h3>
              <ul className="text-left text-gray-700 list-disc list-inside space-y-1">
                <li>A replacement for McFerrin, Meloy, or Aggie Create</li>
                <li>A student club</li>
                <li>Just a pitch competition</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow p-6 border">
              <h3 className="font-semibold mb-2 text-maroon-700">AggieX is...</h3>
              <ul className="text-left text-gray-700 list-disc list-inside space-y-1">
                <li>Modeled after StartX, Harvard i-Lab, Capital Factory</li>
                <li>Powered by TAMU’s #1 engineering research budget</li>
                <li>Backed by the largest undergrad engineering population in the U.S.</li>
                <li>Connected to a massive, loyal alumni base</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
