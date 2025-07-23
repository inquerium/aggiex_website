"use client"

import { useState, useRef, useEffect } from "react"
import { Link, NavLink } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const mainLinks = [
  { name: 'Vision', to: '/#vision' },
  { name: 'Programs', to: '/#programs' },
  { name: 'Podcast', to: '/#podcast' },
  { name: 'Community', to: '/#community' },
];

const moreLinks = [
  { name: 'Ecosystem', to: '/#ecosystem' },
  { name: 'Partners', to: '/#partners' },
  { name: 'Resources', to: '/#resources' },
  { name: 'Contact', to: '/#contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleMenu = () => setMobileOpen(!mobileOpen)
  const closeMenu = () => setMobileOpen(false)

  const handleNav = (to, callback) => (e) => {
    e.preventDefault()
    const element = document.querySelector(to)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    if (callback) callback()
  }

  return (
    <header className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-maroon-700 to-maroon-800 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <span className="text-white font-helvetica font-black text-2xl tracking-tight">A</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-maroon-300 rounded-full opacity-80"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-helvetica font-black tracking-tight text-maroon-800">AggieX</span>
              <span className="text-xs font-helvetica font-semibold text-gray-600 uppercase tracking-wider">Innovation Engine</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {mainLinks.map(link => (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive }) =>
                  `relative text-sm font-helvetica font-bold transition-all duration-300 px-3 py-2 rounded-lg ${isActive ? 'text-maroon-700 bg-maroon-50 shadow-sm' : 'text-gray-800 hover:text-maroon-700 hover:bg-maroon-50'}`
                }
                onClick={handleNav(link.to)}
              >
                {link.name}
              </NavLink>
            ))}
            
            {/* More Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-1 text-sm font-helvetica font-bold text-gray-800 hover:text-maroon-700 hover:bg-maroon-50 transition-all duration-300 px-3 py-2 rounded-lg"
                onClick={() => setDropdownOpen(v => !v)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                More
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute right-0 mt-3 w-48 rounded-xl bg-white shadow-xl border border-gray-200 overflow-hidden z-50"
                  >
                    {moreLinks.map(link => (
                      <NavLink
                        key={link.name}
                        to={link.to}
                        className={({ isActive }) =>
                          `block px-4 py-3 text-sm font-helvetica font-semibold transition-colors ${isActive ? 'bg-maroon-50 text-maroon-700' : 'hover:bg-maroon-50 hover:text-maroon-700 text-gray-800'}`
                        }
                        onClick={handleNav(link.to, () => setDropdownOpen(false))}
                      >
                        {link.name}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden md:block"
            >
              <a
                href="#get-involved"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-helvetica font-bold text-white bg-gradient-to-r from-maroon-700 to-maroon-800 hover:from-maroon-800 hover:to-maroon-900 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Join the Movement
              </a>
            </motion.div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-gray-800 hover:text-maroon-700 hover:bg-maroon-50 rounded-lg transition-colors" 
              onClick={toggleMenu}
            >
              <span className="sr-only">Toggle menu</span>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-white border-t border-gray-200 overflow-hidden shadow-lg"
          >
            <div className="px-6 py-4 space-y-2">
              {[...mainLinks, ...moreLinks].map(link => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  className={({ isActive }) =>
                    `block text-base font-helvetica font-bold py-3 px-4 rounded-lg transition-colors ${isActive ? 'text-maroon-700 bg-maroon-50 shadow-sm' : 'text-gray-800 hover:text-maroon-700 hover:bg-maroon-50'}`
                  }
                  onClick={handleNav(link.to, closeMenu)}
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <a
                  href="#get-involved"
                  className="block w-full text-center bg-gradient-to-r from-maroon-700 to-maroon-800 text-white hover:from-maroon-800 hover:to-maroon-900 rounded-lg text-sm font-helvetica font-bold py-3 px-4 transition-all duration-300 shadow-lg"
                >
                  Join the Movement
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
