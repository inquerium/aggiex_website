import Navbar from "../components/Navbar";
import Hero from "../components/sections/Hero";
import Vision from "../components/sections/Vision";
import Programs from "../components/sections/Programs";
import Team from "../components/sections/Team";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Vision />
        <Programs />
        <Team />
      </main>
      <Footer />
    </div>
  );
}
