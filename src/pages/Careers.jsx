import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../components/ui/use-toast';
import { useAnalytics } from '../hooks/useAnalytics';
import { Loader2, Sparkles, User, Briefcase } from "lucide-react";
import Inquerium from "../assets/inquerium_team.jpeg"
import AggieRing from "../assets/aggie_ring.jpeg"

export default function Careers() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    isStudent: false,
    major: '',
    graduationYear: '',
    position: 'Technical Lead (Programmer)',
    message: '',
  });
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formDataObj = new FormData(e.target);
    const data = Object.fromEntries(formDataObj.entries());
    data.position = formData.position;
    try {
      const response = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      await trackEvent('form_submit', '/careers', { position: formData.position, isStudent: formData.isStudent });
      toast({
        title: "Application Sent!",
        description: "We've received your application and will be in touch soon.",
      });
      e.target.reset();
    } catch (error) {
      console.error("Failed to send application:", error);
      toast({
        title: "Oh no! Something went wrong.",
        description: "There was a problem submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Animated Gradient Header */}
        <section className="relative py-24 md:py-32 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#500000] via-primary/60 to-yellow-100">
          <div className="absolute inset-0 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30 animate-pulse">
              <path fill="#500000" fillOpacity="0.2" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            </svg>
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <div className="inline-block bg-white/80 rounded-2xl px-8 py-6 shadow-2xl backdrop-blur-md animate-fadeInUp">
              <h1 className="text-5xl md:text-6xl font-extrabold text-[#500000] drop-shadow-lg mb-2 tracking-tight animate-gradient-x bg-gradient-to-r from-[#500000] via-primary to-yellow-600 bg-clip-text text-transparent">
                Build Your Career at Inquerium
              </h1>
              <div className="flex justify-center mt-2 mb-4">
                <span className="block w-24 h-1 rounded-full bg-gradient-to-r from-[#500000] via-primary to-yellow-600 animate-pulse"></span>
              </div>
              <p className="text-lg md:text-xl text-[#500000] font-medium max-w-2xl mx-auto animate-fadeIn delay-200">
                Aggie-owned. Mission-driven. Join the team powering College Station's most innovative lead generation company.
              </p>
            </div>
            <div className="mt-10 flex justify-center animate-fadeInUp delay-300">
              <img src={Inquerium} alt="Inquerium Team" className="rounded-2xl shadow-2xl w-96 max-w-full border-4 border-white/80" />
            </div>
          </div>
        </section>

        <section className="pb-20 pt-10">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              {/* Aggie Card */}
              <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-primary/20 text-center transition-transform hover:scale-[1.02] duration-300">
                <img src={AggieRing} alt="Aggie Ring" className="rounded-lg mb-4 mx-auto w-48 shadow-md" />
                <h2 className="text-2xl font-bold text-[#500000] flex items-center justify-center gap-2"><Sparkles className="text-yellow-500 animate-bounce" size={24}/> Aggie Owned and Operated</h2>
                <p className="text-[#500000]/80">Our success is built on the talent and drive of the Aggie network.</p>
              </div>

              {/* Job Positions */}
              <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-primary/20">
                <h2 className="text-2xl font-bold mb-4 text-[#500000]">Open Positions</h2>
                <div className="space-y-8">
                  <div className="transition-transform hover:scale-[1.02] duration-300">
                    <h3 className="text-xl font-semibold flex items-center gap-2 text-[#500000]"><User className="text-primary animate-fadeInUp" size={20}/> Technical Lead (Programmer)</h3>
                    <p className="text-[#500000]/80 mt-1">
                      Architect and build the core technologies that power our lead generation engine. You'll work with modern stacks, solve complex data problems, and mentor a team of talented developers. Ideal for those with a strong background in software engineering and a passion for innovation.
                    </p>
                  </div>
                  <div className="transition-transform hover:scale-[1.02] duration-300">
                    <h3 className="text-xl font-semibold flex items-center gap-2 text-[#500000]"><Briefcase className="text-primary animate-fadeInUp" size={20}/> Client Success Manager (Account Manager)</h3>
                    <p className="text-[#500000]/80 mt-1">
                      Serve as the strategic partner for our clients. You'll ensure they achieve their goals by leveraging our services, building lasting relationships, and identifying new opportunities for growth. Requires excellent communication skills and a deep understanding of client needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Application Form */}
            <div className="bg-white/90 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border-2 border-primary/30 animate-fadeInUp">
              <h2 className="text-2xl font-bold mb-6 text-[#500000]">Apply Now</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} required />
                <Input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} required />
                <Input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} />
                <div className="flex items-center space-x-2 pt-2">
                  <input type="checkbox" name="isStudent" id="isStudent" checked={formData.isStudent} onChange={handleInputChange} className="h-4 w-4 rounded border-primary/50" />
                  <label htmlFor="isStudent" className="text-sm font-medium text-[#500000]">Are you a Texas A&M student?</label>
                </div>
                {formData.isStudent && (
                  <div className="space-y-4 p-4 border rounded-md bg-background/50 animate-in fade-in-0">
                    <Input name="major" placeholder="Your Major" value={formData.major} onChange={handleInputChange} />
                    <Input name="graduationYear" placeholder="Expected Graduation Year (e.g., 2026)" value={formData.graduationYear} onChange={handleInputChange} />
                  </div>
                )}
                <div>
                  <label htmlFor="position" className="text-sm font-medium block mb-1 text-[#500000]">Position Applying For</label>
                  <select name="position" id="position" value={formData.position} onChange={handleInputChange} className="w-full p-2 border rounded-md bg-background border-primary/30">
                    <option>Technical Lead (Programmer)</option>
                    <option>Client Success Manager (Account Manager)</option>
                  </select>
                </div>
                <Textarea name="message" placeholder="Why are you a great fit for Inquerium? Tell us about your relevant experience." value={formData.message} onChange={handleInputChange} required rows={5}/>
                <Button type="submit" className="w-full bg-gradient-to-r from-[#500000] via-primary to-yellow-600 text-white font-bold shadow-lg hover:from-primary hover:to-yellow-700" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Submit Application"}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 