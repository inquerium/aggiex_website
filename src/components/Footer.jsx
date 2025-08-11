"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Linkedin, Instagram, Mail, MapPin, ArrowRight } from "lucide-react"
import logo from "../assets/aggieX_logo-transparent.png"


export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: "About",
      links: [
        { name: "Vision", href: "/#vision" },
        { name: "Problem", href: "/#problem" },
        { name: "Opportunity", href: "/#opportunity" },
        { name: "Process", href: "/#process" },
      ]
    },
    {
      title: "Community",
      links: [
        { name: "Community Leaders", href: "/#community" },
        { name: "Advisory Board", href: "/#community" },
        { name: "Alumni Mentors", href: "/#community" },
        { name: "Podcast", href: "/#podcast" },
      ]
    },
    {
      title: "Get Involved",
      links: [
        { name: "Apply", href: "/apply" },
        { name: "Contact", href: "mailto:team@aggiex.org" },
        { name: "LinkedIn", href: "https://www.linkedin.com/company/aggiex" },
        { name: "Instagram", href: "https://www.instagram.com/_aggiex_" },
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
            <Link to="/" className="flex items-center gap-4 group">
            <div className="relative">
              <img 
                src={logo} 
                alt="AggieX Logo" 
                className="w-20 h-20 object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
            </div>
            
            <p className="text-gray-600 font-helvetica leading-relaxed mb-8 max-w-md">
              Texas A&M's first university-sponsored startup accelerator. 
              Building the next generation of Aggie entrepreneurs through mentorship, funding, and community.
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
                        {link.href.startsWith('http') || link.href.startsWith('mailto') ? (
                          <a
                            href={link.href}
                            className="text-gray-600 hover:text-maroon-700 transition-colors font-helvetica group flex items-center gap-2"
                          >
                            <span>{link.name}</span>
                            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        ) : (
                          <Link
                            to={link.href}
                            className="text-gray-600 hover:text-maroon-700 transition-colors font-helvetica group flex items-center gap-2"
                          >
                            <span>{link.name}</span>
                            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 font-helvetica text-sm">
              © {currentYear} AggieX. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <Link to="/terms" className="text-gray-600 hover:text-maroon-700 transition-colors font-helvetica">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-gray-600 hover:text-maroon-700 transition-colors font-helvetica">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
