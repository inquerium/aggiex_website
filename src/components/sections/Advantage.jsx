"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import AggielandImg from "../../assets/aggiescreate.png"

export default function Advantage() {
  const advantages = [
    "Technical expertise that identifies qualified leads with precision",
    "Relationship-building skills that convert leads into lasting partnerships",
    "Access to innovative thinkers and problem solvers",
    "Boots-on-the-ground approach combined with data-driven strategies",
    "Deep understanding of industry-specific lead generation challenges",
  ]

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="inline-block rounded-full bg-background px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Our Advantage
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              The Perfect Blend of Technology and Human Connection
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              What sets Inquerium apart is our unique approach that combines advanced technical solutions with
              personalized outreach, powered by College Station's best talent.
            </p>

            <ul className="space-y-4">
              {advantages.map((advantage, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-lg">{advantage}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent rounded-xl blur-xl opacity-70"></div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img src={AggielandImg} alt="Our Advantage" className="w-full h-auto" />
              </div>

              {/* Floating elements */}
              <div className="absolute -top-6 -left-6 bg-background rounded-lg shadow-lg p-4 z-20">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Data-Driven</p>
                    <p className="text-xs text-muted-foreground">Precision targeting</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-background rounded-lg shadow-lg p-4 z-20">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Human Touch</p>
                    <p className="text-xs text-muted-foreground">Relationship focused</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
