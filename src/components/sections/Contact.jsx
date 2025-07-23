"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { motion } from "framer-motion"
import { MapPin, Mail, Phone, Users, Loader2 } from "lucide-react"
import { useToast } from "../ui/use-toast"
import { useAnalytics } from "../../hooks/useAnalytics"

export default function Contact() {
  const { toast } = useToast()
  const { trackEvent } = useAnalytics()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    // Combine first and last name for the database
    data.name = `${data.firstName} ${data.lastName}`

    try {
      // 🔧 FIX: Use the correct backend URL
      const API_BASE_URL = process.env.NODE_ENV === 'production' 
        ? '/api'  // Use proxy in production
        : 'http://localhost:3001/api'  // Direct to backend in development
  
      console.log('📡 Sending to:', `${API_BASE_URL}/contact`);
      
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
  
      console.log('📨 Response status:', response.status);
      console.log('📨 Response OK:', response.ok);
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('❌ API Error:', errorData);
        throw new Error(errorData.error || 'Network response was not ok')
      }
  
      const result = await response.json();
      console.log('✅ Success:', result);
  
      await trackEvent('form_submit', '/contact', { formName: 'contact' })
  
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      })
      e.target.reset()
    } catch (error) {
      console.error("❌ Failed to send message:", error)
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.message || "There was a problem with your request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block rounded-full bg-background px-4 py-1.5 text-sm font-medium text-primary mb-4">
            Contact Us
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ready to Transform Your Lead Generation?
          </h2>
          <p className="text-muted-foreground text-lg">
            Get in touch with our team to discuss how Inquerium can help your business grow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-lg overflow-hidden">
              <div className="h-2 bg-primary"></div>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="first-name" className="text-sm font-medium">
                        First name
                      </label>
                      <Input id="first-name" name="firstName" placeholder="Enter your first name" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="last-name" className="text-sm font-medium">
                        Last name
                      </label>
                      <Input id="last-name" name="lastName" placeholder="Enter your last name" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" name="email" type="email" placeholder="Enter your email" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium">
                      Company
                    </label>
                    <Input id="company" name="company" placeholder="Enter your company name" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea id="message" name="message" placeholder="Enter your message" className="min-h-[120px]" required />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Location</h3>
                    <p className="text-muted-foreground">College Station, TX</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Email</h3>
                    <a
                      href="mailto:team@inquerium.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      team@inquerium.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Phone</h3>
                    <a href="tel:+12146744198" className="text-muted-foreground hover:text-primary transition-colors">
                      (214) 674-4198
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Connect</h3>
                    <div className="flex space-x-4 mt-2">
                      {["linkedin", "instagram"].map((social) => (
                        <a
                          key={social}
                          href={
                            social === "linkedin"
                              ? "https://linkedin.com"
                              : social === "instagram"
                              ? "https://instagram.com/inquerium"
                              : `https://${social}.com`
                          }
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <span className="sr-only">{social}</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                          >
                            {social === "twitter" && (
                              <>
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                              </>
                            )}
                            {social === "linkedin" && (
                              <>
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                <rect width="4" height="12" x="2" y="9" />
                                <circle cx="4" cy="4" r="2" />
                              </>
                            )}
                            {social === "facebook" && (
                              <>
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                              </>
                            )}
                            {social === "instagram" && (
                              <>
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                              </>
                            )}
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="relative p-6 rounded-lg bg-gradient-to-br from-primary/20 via-primary/10 to-transparent">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Ready to get started?</h3>
                <p className="text-muted-foreground mb-4">
                  Schedule a free consultation to discuss your lead generation needs.
                </p>
                <a
                  href="https://calendly.com/team-inquerium/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full mt-2"
                >
                  Book a Call
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
