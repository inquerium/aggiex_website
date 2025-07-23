"use client"

import { Card, CardContent } from "../ui/card"
import { motion } from "framer-motion"
import { Linkedin, Twitter, Mail, Instagram } from "lucide-react"
import Avik from "../../assets/avik_headshot.png"
import Zach from "../../assets/zach_headshot.jpeg"

export default function Team() {
  const founders = [
    {
      name: "Avik Khadayat",
      role: "Co-Founder & CEO",
      image: Avik,
      bio: "A specialist in closing leads and building relationships, Avik brings his experience as a former team lead at Aggies Create to Inquerium. His talent for identifying opportunities and connecting with decision-makers drives our client acquisition strategy. As Supervisor at the McFerrin Center for Entrepreneurship, Avik continues to mentor the next generation of business leaders while applying those same principles to grow Inquerium.",
      social: {
        linkedin: "https://www.linkedin.com/in/avikkhadayat/",
        twitter: "#",
        instagram: "https://instagram.com/avikkhadayat",
        email: "mailto:team@inquerium.com",
      },
    },
    {
      name: "Zach Nowroozi",
      role: "Co-Founder & CTO",
      image: Zach,
      bio: "A technical expert in Python, JavaScript, and C++, Zach leads our data-driven approach to lead generation. His innovative programming solutions enable Inquerium to identify and qualify leads with unprecedented efficiency and accuracy. As Director of the Incubator at Aggies Create, Zach continues to foster innovation while developing cutting-edge technologies that keep Inquerium at the forefront of the industry.",
      social: {
        linkedin: "https://www.linkedin.com/in/zachary-nowroozi-84b498308/",
        twitter: "#",
        instagram: "https://instagram.com/zacharynowroozi",
        email: "mailto:team@inquerium.com",
      },
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="team" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block rounded-full bg-background px-4 py-1.5 text-sm font-medium text-primary mb-4">
            Leadership
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Meet Our Founders</h2>
          <p className="text-muted-foreground text-lg">
            Visionary leaders who combined their unique strengths to revolutionize lead generation.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {founders.map((founder, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="overflow-hidden h-full shadow-lg">
                <div className="relative">
                  <div className="aspect-square overflow-hidden flex items-end" style={{ minHeight: 200 }}>
                    <img
                      src={founder.image || "/placeholder.svg"}
                      alt={founder.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 brightness-75"
                      style={{ filter: 'brightness(0.5) grayscale(0.2)', marginTop: founder.name === 'Avik Khadayat' ? '56px' : '32px' }}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h3 className="text-2xl font-bold text-white">{founder.name}</h3>
                    <p className="text-white/80">{founder.role}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-6">{founder.bio}</p>
                  <div className="flex space-x-4">
                    {founder.social.linkedin && founder.social.linkedin !== "#" && (
                      <a
                        href={founder.social.linkedin}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label={`${founder.name}'s LinkedIn`}
                        target="_blank" rel="noopener noreferrer"
                      >
                        <Linkedin size={20} />
                      </a>
                    )}
                    {founder.social.instagram && founder.social.instagram !== "#" && (
                      <a
                        href={founder.social.instagram}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label={`${founder.name}'s Instagram`}
                        target="_blank" rel="noopener noreferrer"
                      >
                        <Instagram size={20} />
                      </a>
                    )}
                    <a
                      href={founder.social.email}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`Email ${founder.name}`}
                    >
                      <Mail size={20} />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
