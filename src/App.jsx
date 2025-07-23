import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Blog from "./pages/Blog"
import BlogDetail from './pages/BlogDetail'
import Careers from "./pages/Careers"
import Admin from "./pages/Admin"
import { Toaster } from "./components/ui/toaster"
import { ThemeProvider } from "./components/theme-provider"
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from './hooks/useAnalytics';

function App() {
  const location = useLocation();
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent('visit', location.pathname);
  }, [location, trackEvent]);

  return (
    <ThemeProvider defaultTheme="light" storageKey="inquerium-theme">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}

export default App
