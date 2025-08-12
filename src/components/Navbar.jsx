"use client"

import { useState, useRef, useEffect } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { handleSmoothNavigation, smoothScrollTo } from "../lib/utils"
import logo from "../assets/aggieX_logo-transparent.png"

const mainLinks = [
  { name: 'Opportunity', to: '/opportunity' },
  { name: 'Vision', to: '/vision' },
  { name: 'Problem', to: '/problem' },
  { name: 'Process', to: '/process' },
  { name: 'Community', to: '/community' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => setMobileOpen(!mobileOpen)
  const closeMenu = () => setMobileOpen(false)

  const handleNav = (to, callback) => (e) => {
    e.preventDefault()
    console.log('Nav clicked:', to, 'Current path:', window.location.pathname)
    handleSmoothNavigation(to, callback)
  }



  return (
    <header className="mobile-navbar fixed top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo and Mobile Menu in same row */}
          <div className="flex items-center justify-between w-full lg:w-auto">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-4 group">
              <div className="relative">
                <img 
                  src={logo} 
                  alt="AggieX Logo" 
                  className="mobile-navbar logo w-20 h-20 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>

                         {/* Mobile Menu Button */}
             <button
               onClick={toggleMenu}
               className="lg:hidden p- rounded-lg hover:bg-gray-100 transition-colors"
               aria-label="Toggle menu"
             >
               <div className="w-6 h-6 flex flex-col justify-center items-center -mt-2">
                 <span className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
                 <span className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${mobileOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                 <span className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
               </div>
             </button>
           </div>

           {/* Desktop Navigation */}
           <nav className="hidden lg:flex items-center gap-6">
             {mainLinks.map(link => (
               <button
                 key={link.name}
                 onClick={handleNav(link.to)}
                 className="relative text-sm font-helvetica font-bold transition-all duration-300 px-3 py-2 rounded-lg text-gray-800 hover:text-maroon-700 hover:bg-maroon-50"
               >
                 {link.name}
               </button>
             ))}

             {/* Apply Button */}
             <Link 
               to="/apply"
               className="inline-flex items-center justify-center bg-maroon-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-maroon-700 transition-colors duration-200 text-sm shadow-sm hover:shadow-md"
             >
               Apply
             </Link>
           </nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="navbar-menu-mobile lg:hidden border-t border-gray-200 bg-white"
            >
              <div className="py-6 space-y-4">
                {mainLinks.map(link => (
                  <button
                    key={link.name}
                    onClick={(e) => {
                      console.log('Mobile menu button clicked:', link.name, link.to)
                      handleNav(link.to, closeMenu)(e)
                    }}
                    className="navbar-menu-item-mobile block w-full text-left transition-colors text-gray-800 hover:text-maroon-700 hover:bg-maroon-50"
                    style={{ cursor: 'pointer', zIndex: 1000 }}
                  >
                    {link.name.toLowerCase()}
                  </button>
                ))}

                {/* Mobile Apply Button */}
                <div className="px-4 pt-4">
                  <Link 
                    to="/apply"
                    onClick={closeMenu}
                    className="block w-full text-center bg-maroon-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-maroon-700 transition-colors duration-200 shadow-sm"
                  >
                    Apply
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
