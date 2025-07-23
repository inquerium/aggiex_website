"use client"

import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "./ui/button"
import { Menu, X } from "lucide-react"
import { useTheme } from "./theme-provider"
import { Moon, Sun } from "lucide-react"
import InqueriumLogo from "../assets/Inquerium_logo.png"

const mainLinks = [
  { name: 'Home', to: '/' },
  { name: 'Services', to: '/#services' },
  { name: 'About', to: '/#about' },
  { name: 'Contact', to: '/#contact' },
];

const moreLinks = [
  { name: 'Our Story', to: '/#story' },
  { name: 'Team', to: '/#team' },
  { name: 'Advisors', to: '/#advisors' },
  { name: 'Testimonials', to: '/#testimonials' },
  { name: 'Blog', to: '/blog' },
  { name: 'Careers', to: '/careers' },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleMenu = () => setMobileOpen(!mobileOpen)
  const closeMenu = () => setMobileOpen(false)

  // Click outside handler for dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  // Helper to handle anchor navigation
  const handleNav = (to, closeDropdown) => (e) => {
    if (to.startsWith('/#')) {
      e.preventDefault();
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const id = to.replace('/#', '');
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const id = to.replace('/#', '');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      if (closeDropdown) closeDropdown();
    } else {
      if (closeDropdown) closeDropdown();
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-background/90 backdrop-blur-sm shadow-md transition-colors duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={InqueriumLogo} alt="Inquerium Logo" className="h-10 w-auto" />
          {/*<span className="text-xl font-extrabold tracking-tight text-foreground">Inquerium</span>*/}
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          {mainLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors px-2 py-1 rounded ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`
              }
              onClick={handleNav(link.to)}
            >
              {link.name}
            </NavLink>
          ))}
          <div className="relative" ref={dropdownRef}>
             <button
              className="text-sm font-semibold px-2 py-1 rounded text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              onClick={() => setDropdownOpen(v => !v)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              More
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute right-0 mt-2 w-56 rounded-xl bg-card shadow-2xl border text-card-foreground overflow-hidden z-50"
                >
                  {moreLinks.map(link => (
                    <NavLink
                      key={link.name}
                      to={link.to}
                      className={({ isActive }) =>
                        `block px-5 py-3 text-base font-medium transition-colors ${isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'}`
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
        <div className="flex items-center gap-2">
           <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="mr-2"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="hidden md:block"
            >
              <a
                href="https://calendly.com/team-inquerium/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Get Started
              </a>
            </motion.div>
          <button className="md:hidden p-2" onClick={toggleMenu}>
            <span className="sr-only">Toggle menu</span>
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden bg-card border-t"
          >
            {[...mainLinks, ...moreLinks].map(link => (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive }) =>
                  `block text-lg font-semibold py-2 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`
                }
                onClick={handleNav(link.to, closeMenu)}
              >
                {link.name}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
