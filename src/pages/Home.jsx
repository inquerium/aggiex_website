import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { smoothScrollTo } from "../lib/utils";
import Hero from "../components/sections/Hero";
import Vision from "../components/sections/Vision";
import Problem from "../components/sections/Problem";
import Community from "../components/sections/Community";
import Opportunity from "../components/sections/Opportunity";
import Podcast from "../components/sections/Podcast";
import Process from "../components/sections/Process";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    // Check if there's a hash in the URL for direct section access
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      // Wait for components to render, then scroll
      const timer = setTimeout(() => {
        smoothScrollTo(sectionId);
      }, 100);
      return () => clearTimeout(timer);
    }
    
    // Check if there's a stored section to scroll to (from mobile navigation)
    const storedSection = sessionStorage.getItem('scrollToSection');
    if (storedSection) {
      console.log('Found stored section to scroll to:', storedSection);
      // Clear the stored section
      sessionStorage.removeItem('scrollToSection');
      // Wait for components to render, then scroll
      const timer = setTimeout(() => {
        smoothScrollTo(storedSection);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  return (
    <main className="flex-1">
      <Hero />
      <Opportunity />
      <Vision />
      <Problem />
      <Process />
      <Podcast />
      <Community />
    </main>
  );
} 