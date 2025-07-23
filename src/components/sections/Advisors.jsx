"use client"

import { Card, CardContent } from "../ui/card"
import { motion } from "framer-motion"
import { Linkedin, Twitter, Mail } from "lucide-react"
import Bijan from "../../assets/Bijan_headshot.png"
import Bradford from "../../assets/bradford_headshot.png"
import Longo from "../../assets/longo_headshot.png"

export default function Advisors() {
  const advisors = [
    {
      name: "Bijan Nowroozi",
      role: "Technical Advisor",
      image: Bijan,
      bio: "Former CTO of Open Compute Project, Bijan now brings his expertise from working at a billion-dollar tech startup to advise our technical strategy and innovation roadmap. His deep understanding of scalable systems helps Inquerium stay at the cutting edge of lead generation technology.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "mailto:bijan@example.com",
      },
    },
    {
      name: "Robert Longo",
      role: "Software Development Advisor",
      image: Longo,
      bio: "An advanced Computer Science student with numerous applications under his belt, Robert provides insights on emerging technologies and development best practices. His fresh perspective and hands-on experience with modern frameworks enhances our technical capabilities.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "mailto:robert@example.com",
      },
    },
    /*{
      name: "Steven Bradford",
      role: "Industry Growth Advisor",
      image: Bradford,
      bio: "With a successful career in the real estate industry, Steven brings valuable domain expertise and business development strategies to Inquerium. His understanding of client acquisition in competitive markets helps shape our approach to industry-specific lead generation.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "mailto:steven@example.com",
      },
    },*/
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="advisors" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            Management & Advisors
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Our Expert Team</h2>
          <p className="text-muted-foreground text-lg">
            Industry professionals who provide strategic guidance and specialized expertise.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {advisors.map((advisor, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                <div className="relative group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={advisor.image || "/placeholder.svg"}
                      alt={advisor.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 w-full">
                      <div className="flex justify-end space-x-3">
                        <a
                          href={advisor.social.linkedin}
                          className="text-white hover:text-primary transition-colors"
                          aria-label={`${advisor.name}'s LinkedIn`}
                        >
                          <Linkedin size={18} />
                        </a>
                        <a
                          href={advisor.social.twitter}
                          className="text-white hover:text-primary transition-colors"
                          aria-label={`${advisor.name}'s Twitter`}
                        >
                          <Twitter size={18} />
                        </a>
                        <a
                          href={advisor.social.email}
                          className="text-white hover:text-primary transition-colors"
                          aria-label={`Email ${advisor.name}`}
                        >
                          <Mail size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{advisor.name}</h3>
                  <p className="text-primary text-sm mb-4">{advisor.role}</p>
                  <p className="text-muted-foreground">{advisor.bio}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
