"use client"

import { Card, CardContent } from "../ui/card"
import { motion } from "framer-motion"
import { BarChart3, FileText, Filter, Search, Database, LineChart } from "lucide-react"

export default function Services() {
  const services = [
    {
      title: "Digital Marketing",
      description: "Strategic campaigns that target your ideal customers across digital platforms.",
      icon: <BarChart3 className="h-6 w-6" />,
    },
    {
      title: "Content Strategy",
      description: "Compelling content that attracts and engages your target audience.",
      icon: <FileText className="h-6 w-6" />,
    },
    {
      title: "Lead Qualification",
      description: "Advanced filtering to ensure you only receive high-quality, conversion-ready leads.",
      icon: <Filter className="h-6 w-6" />,
    },
    {
      title: "Market Research",
      description: "In-depth analysis to identify untapped opportunities in your market.",
      icon: <Search className="h-6 w-6" />,
    },
    {
      title: "CRM Integration",
      description: "Seamless integration with your existing systems for efficient lead management.",
      icon: <Database className="h-6 w-6" />,
    },
    {
      title: "Analytics & Reporting",
      description: "Comprehensive insights to measure and optimize your lead generation efforts.",
      icon: <LineChart className="h-6 w-6" />,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            Our Services
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Comprehensive Lead Generation Solutions
          </h2>
          <p className="text-muted-foreground text-lg">
            We deliver tailored strategies to help businesses connect with their ideal customers and drive growth.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="rounded-full bg-primary/10 p-3 mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
