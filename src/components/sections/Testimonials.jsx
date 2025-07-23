"use client"

import { Card, CardContent } from "../ui/card"
import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import RogersImg from "../../assets/rogersacademics.png"

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Inquerium completely changed how we grow our business. They set up targeted outreach and revamped our website. Now leads come to us, and we’re actually closing them. I wish we’d found them sooner.",
      author: "Ben Rogers",
      company: "RA Solutions"
      //image: RogersImg,
    },
    {
      quote:
        "Inquerium didn't just help us grow, they made the impossible possible. Their team connected us with our audience, built our digital presence from the ground up, and opened doors to manufacturers we never thought we'd reach. If you want to turn your vision into reality, Inquerium is the only partner you need.",
      author: "Carter Nelson",
      company: "Lonebull Usa"
      //image: "/placeholder.svg?height=60&width=60",
    },
    {
      quote:
        "What sets Inquerium apart is their ability to understand our industry and target the right prospects. The quality of leads we receive is exceptional.",
      author: "Dominic Arra",
      company: "DTX Home Services"
      //image: "/placeholder.svg?height=60&width=60",
    },
    {
      quote:
        "We've worked with several lead generation companies, but none have delivered the ROI that Inquerium consistently provides. They're truly in a league of their own.",
      author: "Amanda Rodriguez",
      company: "Summit Partners"
      //image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3)

  const nextTestimonial = () => {
    if (currentIndex < testimonials.length - 3) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }
  }

  const prevTestimonial = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      setCurrentIndex(testimonials.length - 3)
    }
  }

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it. Here's what businesses have to say about working with Inquerium.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:flex justify-between absolute top-1/2 -translate-y-1/2 w-full z-10 px-4">
            <button
              onClick={prevTestimonial}
              className="bg-background rounded-full p-3 shadow-lg hover:bg-primary/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-background rounded-full p-3 shadow-lg hover:bg-primary/10 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.author}-${currentIndex + index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="text-primary mb-6">
                      <Quote size={32} />
                    </div>
                    <p className="italic mb-8 flex-grow">{testimonial.quote}</p>
                    <div className="flex items-center">
                      <div className="mr-4">
                        { /*<img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.author}
                          className="h-12 w-12 rounded-full object-cover"
                        />*/}
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index > testimonials.length - 3 ? testimonials.length - 3 : index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index >= currentIndex && index < currentIndex + 3 ? "bg-primary" : "bg-primary/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
