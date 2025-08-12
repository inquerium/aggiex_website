import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Apply from './pages/Apply';
import AdminDashboard from './components/AdminDashboard';
import EmailVerification from './components/EmailVerification';
import NotFound from './components/NotFound';
import SectionRedirect from './components/SectionRedirect';

import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  
  // Routes that should not have Navbar and Footer
  const noHeaderFooterRoutes = ['/admin', '/verify'];
  const shouldShowHeaderFooter = !noHeaderFooterRoutes.some(route => 
    location.pathname.startsWith(route)
  );

  return (
    <ThemeProvider>
      <div className="App">
        {shouldShowHeaderFooter && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/verify/:token" element={<EmailVerification />} />
          
          {/* Section routes - redirect to home page with scroll */}
          <Route path="/opportunity" element={<SectionRedirect section="opportunity" />} />
          <Route path="/vision" element={<SectionRedirect section="vision" />} />
          <Route path="/problem" element={<SectionRedirect section="problem" />} />
          <Route path="/process" element={<SectionRedirect section="process" />} />
          <Route path="/community" element={<SectionRedirect section="community" />} />
          <Route path="/podcast" element={<SectionRedirect section="podcast" />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        {shouldShowHeaderFooter && <Footer />}
      </div>
    </ThemeProvider>
  );
}

export default App;
