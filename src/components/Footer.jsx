"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Linkedin, Instagram, Mail, MapPin, ArrowRight } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: "Programs",
      links: [
        { name: "Incubate", href: "/#programs" },
        { name: "Connect", href: "/#programs" },
        { name: "Accelerate", href: "/#programs" },
        { name: "Return", href: "/#programs" },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Podcast", href: "/#podcast" },
        { name: "Ecosystem", href: "/#ecosystem" },
        { name: "Partners", href: "/#partners" },
        { name: "Contact", href: "/#contact" },
      ]
    },
    {
      title: "Community",
      links: [
        { name: "Vision", href: "/#vision" },
        { name: "Join Us", href: "/#get-involved" },
        { name: "Alumni", href: "/#community" },
        { name: "Partners", href: "/#partners" },
      ]
    }
  ]

  return (
    <footer className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-50 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-maroon-700 to-maroon-800 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-helvetica font-black text-3xl tracking-tight">A</span>
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-maroon-300 rounded-full opacity-80"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-helvetica font-black tracking-tight text-maroon-800">AggieX</span>
                <span className="text-sm font-helvetica font-medium text-gray-500 uppercase tracking-wider">Innovation Engine</span>
              </div>
            </div>
            
            <p className="text-gray-600 font-helvetica leading-relaxed mb-8 max-w-md">
              Building the next generation of Aggie entrepreneurs through unified innovation infrastructure. 
              Connecting Texas A&M's research, talent, and alumni network into a world-class startup engine.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-gray-600 font-helvetica">
                <MapPin className="h-4 w-4 text-maroon-600" />
                <span>College Station, Texas</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 font-helvetica">
                <Mail className="h-4 w-4 text-maroon-600" />
                <a href="mailto:team@aggiex.org" className="hover:text-maroon-700 transition-colors">
                  team@aggiex.org
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <motion.a
                href="https://www.linkedin.com/company/aggiex"
                whileHover={{ y: -3, scale: 1.1 }}
                className="w-10 h-10 bg-maroon-100 hover:bg-maroon-200 rounded-lg flex items-center justify-center text-maroon-700 hover:text-maroon-800 transition-all duration-300"
              >
                <Linkedin size={18} />
                <span className="sr-only">LinkedIn</span>
              </motion.a>
              <motion.a
                href="https://www.instagram.com/aggiex"
                whileHover={{ y: -3, scale: 1.1 }}
                className="w-10 h-10 bg-maroon-100 hover:bg-maroon-200 rounded-lg flex items-center justify-center text-maroon-700 hover:text-maroon-800 transition-all duration-300"
              >
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </motion.a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {footerSections.map((section) => (
                <div key={section.title}>
                  <h3 className="font-helvetica font-bold text-lg text-gray-900 mb-6">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          to={link.href}
                          className="text-gray-600 hover:text-maroon-700 transition-colors font-helvetica group flex items-center gap-2"
                        >
                          <span>{link.name}</span>
                          <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm text-gray-500 font-helvetica">
              <span>&copy; {currentYear} AggieX. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Built by Aggies, for Aggies</span>
            </div>
            
            <div className="flex gap-6 text-sm">
              <Link to="/terms" className="text-gray-500 hover:text-maroon-700 transition-colors font-helvetica">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-gray-500 hover:text-maroon-700 transition-colors font-helvetica">
                Privacy Policy
              </Link>
              <a 
                href="https://instagram.com/aggiex" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 hover:text-maroon-700 transition-colors font-helvetica"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
