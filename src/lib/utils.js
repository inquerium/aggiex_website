import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Smooth scrolling utility
export const smoothScrollTo = (elementId, offset = 80) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

// Handle navigation with smooth scrolling
export const handleSmoothNavigation = (path, callback) => {
  // Extract section ID from path (remove leading slash)
  const sectionId = path.replace('/', '');
  
  // If we're not on the home page, navigate to home first
  if (window.location.pathname !== '/') {
    // Navigate to home page
    window.location.href = '/';
    // Store section to scroll to after navigation
    sessionStorage.setItem('scrollToSection', sectionId);
    if (callback) callback();
    return;
  }
  
  // If we're on the home page, scroll to the section
  smoothScrollTo(sectionId);
  
  // Execute callback if provided
  if (callback) callback();
};
