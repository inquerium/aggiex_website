import { Lightbulb, Globe, Users } from "lucide-react";

export default function Vision() {
  return (
    <section id="vision" className="w-full py-16 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-maroon-100 px-3 py-1 text-sm text-maroon-900 font-semibold">Our Vision</div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">Building the Future of Entrepreneurship</h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl mx-auto">
              AggieX aims to create a globally recognized entrepreneurial ecosystem at Texas A&M University that fosters innovation, provides resources, and connects students, faculty, and alumni with industry partners to build successful ventures.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
          <VisionCard
            icon={<Lightbulb className="h-10 w-10 text-maroon-600 mb-2" />}
            title="Innovation Hub"
            desc="A physical and virtual space where ideas transform into viable businesses"
            content="State-of-the-art facilities designed to foster collaboration, experimentation, and growth for startups at every stage."
          />
          <VisionCard
            icon={<Globe className="h-10 w-10 text-maroon-600 mb-2" />}
            title="Global Network"
            desc="Connecting Aggies to worldwide opportunities and resources"
            content="Strategic partnerships with international accelerators, investors, and industry leaders to provide global reach for Aggie startups."
          />
          <VisionCard
            icon={<Users className="h-10 w-10 text-maroon-600 mb-2" />}
            title="Community Driven"
            desc="Powered by the strength of the Aggie network"
            content="Leveraging the vast Aggie alumni network to provide mentorship, funding, and industry connections for emerging entrepreneurs."
          />
        </div>
      </div>
    </section>
  );
}

function VisionCard({ icon, title, desc, content }) {
  return (
    <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center text-center border hover:shadow-lg transition">
      {icon}
      <h3 className="text-xl font-bold mt-2 mb-1">{title}</h3>
      <p className="text-maroon-700 font-medium mb-2">{desc}</p>
      <p className="text-gray-600 text-sm">{content}</p>
    </div>
  );
} 