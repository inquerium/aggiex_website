import Navbar from "../components/Navbar";
import ApplicationForm from "../components/sections/ApplicationForm";
import Footer from "../components/Footer";

export default function Apply() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <ApplicationForm />
      </main>
      <Footer />
    </div>
  );
} 