import Navbar from "../components/Navbar";
import Hero from "../components/sections/Hero";
import Vision from "../components/sections/Vision";
import Problem from "../components/sections/Problem";
import Community from "../components/sections/Community";
import Opportunity from "../components/sections/Opportunity";
import Podcast from "../components/sections/Podcast";
import Process from "../components/sections/Process";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Opportunity />
        <Vision />
        <Problem />
        <Process />
        <Podcast />
        <Community />      </main>
      <Footer />
    </div>
  );
} 