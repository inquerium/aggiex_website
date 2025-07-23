import { useState } from "react";
import { Lightbulb, Users, Rocket, ArrowUpRight, ArrowRight, Cog, Zap } from "lucide-react";

const programs = [
  {
    key: "incubate",
    icon: <Lightbulb className="h-8 w-8 text-maroon-600 mb-2" />,
    title: "Incubate",
    desc: "Students and alumni ideate and prototype with guidance + access to resources.",
    bullets: [
      "Ideation workshops and brainstorming sessions",
      "MVP development and prototyping support",
      "Access to university resources and facilities",
      "Community of fellow innovators and creators",
    ],
    cta: "Start Ideating",
  },
  {
    key: "connect",
    icon: <Users className="h-8 w-8 text-maroon-600 mb-2" />,
    title: "Connect",
    desc: "Cross-pollination with alumni, VCs, researchers, and advisors.",
    bullets: [
      "Alumni mentor matching and networking events",
      "VC and investor introductions",
      "Research collaboration opportunities",
      "Industry advisor connections",
    ],
    cta: "Build Connections",
  },
  {
    key: "accelerate",
    icon: <Rocket className="h-8 w-8 text-maroon-600 mb-2" />,
    title: "Accelerate",
    desc: "Top teams join the official AggieX Accelerator cohort.",
    bullets: [
      "Intensive 12-week accelerator program",
      "Seed funding and investment opportunities",
      "Dedicated workspace and resources",
      "Demo day with investor showcase",
    ],
    cta: "Apply to Accelerator",
  },
  {
    key: "return",
    icon: <ArrowUpRight className="h-8 w-8 text-maroon-600 mb-2" />,
    title: "Return",
    desc: "Alumni give back; TAMU monetizes equity and IP; flywheel begins.",
    bullets: [
      "Alumni mentorship and investment programs",
      "TAMU equity and IP monetization",
      "Sustainable funding model",
      "Perpetual innovation flywheel",
    ],
    cta: "Give Back",
  },
];

export default function Programs() {
  const [active, setActive] = useState("incubate");
  const current = programs.find((p) => p.key === active);

  return (
    <section id="programs" className="w-full py-16 bg-gradient-to-b from-gray-50 to-white relative">
      {/* Section Transition - Continuation from Ecosystem */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-50 to-transparent"></div>
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        {/* Header with Engine Concept */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-maroon-100 to-maroon-50 px-4 py-2 text-sm text-maroon-900 font-semibold border border-maroon-200">
              <Cog className="h-4 w-4" />
              Four-Stage Innovation Engine
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              The <span className="text-maroon-700">Innovation Engine</span> That Powers<br />
              <span className="text-2xl sm:text-3xl text-maroon-600">The Infrastructure</span>
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl mx-auto">
              This proven four-stage engine transforms ideas into world-changing ventures while building a sustainable ecosystem for future innovators.
            </p>
          </div>
        </div>

        {/* Engine Visualization */}
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-r from-maroon-50 via-white to-maroon-50 rounded-xl p-6 border border-maroon-100 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-maroon-600 rounded-full"></div>
                <span className="text-sm font-semibold text-maroon-700">Infrastructure</span>
              </div>
              <ArrowRight className="h-4 w-4 text-maroon-600" />
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-maroon-600" />
                <span className="text-sm font-semibold text-maroon-700">Engine</span>
              </div>
              <ArrowRight className="h-4 w-4 text-maroon-600" />
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-maroon-600 rounded-full"></div>
                <span className="text-sm font-semibold text-maroon-700">Results</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto py-8">
          <div className="flex justify-center gap-4 mb-6 flex-wrap">
            {programs.map((p) => (
              <button
                key={p.key}
                onClick={() => setActive(p.key)}
                className={`px-6 py-2 rounded-lg font-semibold border transition-colors text-base ${active === p.key ? "bg-maroon-700 text-white border-maroon-700" : "bg-white text-maroon-700 border-maroon-200 hover:bg-maroon-50"}`}
              >
                {p.title}
              </button>
            ))}
          </div>
          
          {/* Hero-style card design */}
          <div className="relative max-w-4xl mx-auto">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-maroon-200 transform hover:scale-105 transition-transform duration-300">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-maroon-50 via-white to-maroon-100" />
              
              {/* Content */}
              <div className="relative z-10 p-8">
                <div className="grid gap-8 lg:grid-cols-2 items-center">
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
                    <button className="inline-flex items-center gap-2 bg-maroon-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-maroon-800 transition-colors">
                      {current.cta}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {/* Hero-style overlay card */}
                  <div className="relative">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center border border-maroon-200 shadow-lg">
                      <div className="text-4xl font-bold text-maroon-800 mb-2">{current.title}</div>
                      <div className="text-maroon-600 font-medium">Stage {programs.findIndex(p => p.key === active) + 1} of 4</div>
                      <div className="mt-4 text-sm text-maroon-700">
                        <div className="flex justify-center gap-1 mb-2">
                          {[1, 2, 3, 4].map((stage) => (
                            <div
                              key={stage}
                              className={`w-2 h-2 rounded-full ${
                                stage <= programs.findIndex(p => p.key === active) + 1 
                                  ? 'bg-maroon-600' 
                                  : 'bg-maroon-200'
                              }`}
                            />
                          ))}
                        </div>
                        <span>Engine Progress</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 