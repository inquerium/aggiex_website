import { useState } from "react";
import { Rocket, Lightbulb, Award, GraduationCap, ArrowRight } from "lucide-react";

const programs = [
  {
    key: "accelerator",
    icon: <Rocket className="h-8 w-8 text-maroon-600 mb-2" />,
    title: "AggieX Accelerator",
    desc: "12-week intensive program to rapidly scale promising Aggie-founded startups.",
    bullets: [
      "$50,000 in seed funding",
      "Dedicated workspace",
      "Industry-specific mentorship",
      "Demo day with investors",
    ],
    cta: "Apply Now",
  },
  {
    key: "incubator",
    icon: <Lightbulb className="h-8 w-8 text-maroon-600 mb-2" />,
    title: "AggieX Incubator",
    desc: "Supportive environment for early-stage ideas to develop into viable businesses.",
    bullets: [
      "Co-working space",
      "Business model development",
      "Prototype development assistance",
      "Market validation support",
    ],
    cta: "Join Incubator",
  },
  {
    key: "funding",
    icon: <Award className="h-8 w-8 text-maroon-600 mb-2" />,
    title: "AggieX Venture Fund",
    desc: "Investment fund to provide capital to promising Aggie startups.",
    bullets: [
      "Pre-seed investments up to $100,000",
      "Connections to angel investors",
      "VC network introductions",
      "Fundraising strategy support",
    ],
    cta: "Learn About Funding",
  },
  {
    key: "academy",
    icon: <GraduationCap className="h-8 w-8 text-maroon-600 mb-2" />,
    title: "AggieX Academy",
    desc: "Entrepreneurial education programs for Aggies.",
    bullets: [
      "Entrepreneurship workshops",
      "Founder speaker series",
      "Skill-building bootcamps",
      "Industry-specific training",
    ],
    cta: "Explore Courses",
  },
];

export default function Programs() {
  const [active, setActive] = useState("accelerator");
  const current = programs.find((p) => p.key === active);

  return (
    <section id="programs" className="w-full py-16 bg-gray-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-maroon-100 px-3 py-1 text-sm text-maroon-900 font-semibold">Programs</div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">Comprehensive Support System</h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl mx-auto">
              AggieX offers a suite of programs designed to support entrepreneurs at every stage of their journey.
            </p>
          </div>
        </div>
        <div className="mx-auto py-12">
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            {programs.map((p) => (
              <button
                key={p.key}
                onClick={() => setActive(p.key)}
                className={`px-6 py-2 rounded-lg font-semibold border transition-colors text-base ${active === p.key ? "bg-maroon-700 text-white border-maroon-700" : "bg-white text-maroon-700 border-maroon-200 hover:bg-maroon-50"}`}
              >
                {p.title.replace("AggieX ", "")}
              </button>
            ))}
          </div>
          <div className="grid gap-8 lg:grid-cols-2 items-center bg-white rounded-xl shadow p-8 border max-w-4xl mx-auto">
            <div>
              {current.icon}
              <h3 className="text-2xl font-bold mb-2 text-maroon-800">{current.title}</h3>
              <p className="text-gray-600 mb-4">{current.desc}</p>
              <ul className="space-y-2 mb-6">
                {current.bullets.map((b, i) => (
                  <li key={i} className="flex items-center text-maroon-700 font-medium">
                    <ArrowRight className="h-4 w-4 mr-2 text-maroon-600" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <a href="#get-involved" className="inline-block bg-maroon-700 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-maroon-800 transition">{current.cta}</a>
            </div>
            <div className="relative h-[260px] flex items-center justify-center">
              {/* Placeholder for program image or illustration */}
              <div className="w-full h-full bg-maroon-100 rounded-lg flex items-center justify-center text-maroon-700 text-2xl font-bold opacity-60">
                {current.title.replace("AggieX ", "")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 