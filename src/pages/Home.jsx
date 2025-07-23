import Navbar from "../components/Navbar";
import Hero from "../components/sections/Hero";
import Vision from "../components/sections/Vision";
import Problem from "../components/sections/Problem";
import Opportunity from "../components/sections/Opportunity";
import Ecosystem from "../components/sections/Ecosystem";
import Programs from "../components/sections/Programs";
import Podcast from "../components/sections/Podcast";
import Community from "../components/sections/Community";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Vision />
        <Problem />
        <Opportunity />
        <Ecosystem />
        <Programs />
        <Podcast />
        <Community />
      </main>
      <Footer />
    </div>
  );
}
