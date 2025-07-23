"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Twitter, Linkedin, Facebook, Instagram, Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {/*<img src="/placeholder.svg?height=32&width=32" alt="Inquerium Logo" className="h-8 w-8 rounded" />*/}
              <span className="text-xl font-bold">Inquerium</span>
            </div>
            <p className="text-muted-foreground">
              Transforming lead generation through innovative strategies and top talent.
            </p>
            <div className="flex space-x-4">
                {/*<Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="text-muted-foreground hover:text-primary transition-colors"
              >*/}
              <motion.a
                href="https://www.linkedin.com/feed/"
                whileHover={{ y: -3 }}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </motion.a>
                {/*<Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="text-muted-foreground hover:text-primary transition-colors"
              >*/}
              <motion.a
                href="https://www.instagram.com/inquerium/"
                whileHover={{ y: -3 }}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </motion.a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Services", "About", "Team", "Testimonials", "Contact", "Blog", "Careers"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Blog" ? "/blog" : item === "Careers" ? "/careers" : `/#${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                "Digital Marketing",
                "Content Strategy",
                "Lead Qualification",
                "Market Research",
                "CRM Integration",
              ].map((item) => (
                <li key={item}>
                  <Link to={`/#services`} className="text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <address className="not-italic space-y-2 text-muted-foreground">
              <p>College Station, TX</p>
              <p className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:team@inquerium.com" className="hover:text-primary transition-colors">
                  team@inquerium.com
                </a>
              </p>
              <h3 className="font-bold text-lg">Phone</h3>
                    <a href="tel:+12146744198" className="text-muted-foreground hover:text-primary transition-colors">
                      (214) 674-4198
                    </a>
            </address>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {currentYear} Inquerium. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <a href="https://instagram.com/inquerium" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
