import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Mail, MapPin, Phone, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="Inquerium Logo"
              width={32}
              height={32}
              className="rounded"
            />
            <span className="text-xl font-bold">Inquerium</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#services" className="text-sm font-medium hover:underline underline-offset-4">
              Services
            </Link>
            <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
            <Link href="#story" className="text-sm font-medium hover:underline underline-offset-4">
              Our Story
            </Link>
            <Link href="#team" className="text-sm font-medium hover:underline underline-offset-4">
              Team
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4">
              Testimonials
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
          <Button className="hidden md:inline-flex">Get Started</Button>
          <Button variant="outline" size="icon" className="md:hidden">
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Transforming Lead Generation in College Station
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Inquerium connects businesses with their ideal customers through innovative lead generation
                    strategies powered by top talent.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg">Schedule a Consultation</Button>
                  <Button size="lg" variant="outline" className="bg-background text-foreground">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=550&width=550"
                  width={550}
                  height={550}
                  alt="Hero Image"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Services</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Comprehensive Lead Generation Solutions
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We deliver tailored strategies to help businesses connect with their ideal customers and drive growth.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              {[
                {
                  title: "Digital Marketing",
                  description: "Strategic campaigns that target your ideal customers across digital platforms.",
                },
                {
                  title: "Content Strategy",
                  description: "Compelling content that attracts and engages your target audience.",
                },
                {
                  title: "Lead Qualification",
                  description: "Advanced filtering to ensure you only receive high-quality, conversion-ready leads.",
                },
                {
                  title: "Market Research",
                  description: "In-depth analysis to identify untapped opportunities in your market.",
                },
                {
                  title: "CRM Integration",
                  description: "Seamless integration with your existing systems for efficient lead management.",
                },
                {
                  title: "Analytics & Reporting",
                  description: "Comprehensive insights to measure and optimize your lead generation efforts.",
                },
              ].map((service, index) => (
                <Card key={index} className="flex flex-col items-center text-center">
                  <CardContent className="flex flex-col items-center p-6">
                    <div className="mb-4 rounded-full bg-muted p-2.5">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">About Inquerium</div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    College Station's Premier Lead Generation Company
                  </h2>
                  <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Founded in College Station, Inquerium has quickly established itself as the leading force in
                    innovative lead generation. Our unique advantage comes from our deep connections to the vibrant
                    entrepreneurial and technological ecosystem of College Station.
                  </p>
                  <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    With access to exceptional talent and cutting-edge methodologies, we deliver results that
                    consistently exceed expectations. Our team combines industry expertise with fresh perspectives to
                    create lead generation strategies that truly work.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button variant="outline" className="bg-background text-foreground">
                    Our Approach
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=550&width=550"
                  width={550}
                  height={550}
                  alt="About Inquerium"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="story" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Story</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">How Inquerium Was Born</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A partnership forged through complementary skills and a shared vision.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl mt-8">
              <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
                <div className="relative hidden md:block">
                  <div className="absolute left-1/2 h-full w-[2px] -translate-x-1/2 bg-muted"></div>
                  <div className="sticky top-20 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M12 2v1" />
                      <path d="M12 21v1" />
                      <path d="m4.93 4.93-.7-.7" />
                      <path d="m19.07 19.07 .7.7" />
                      <path d="M2 12h1" />
                      <path d="M21 12h1" />
                      <path d="m4.93 19.07 -.7.7" />
                      <path d="m19.07 4.93 .7-.7" />
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  </div>
                </div>
                <div className="space-y-8">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">The Beginning at Aggies Create</h3>
                      <p className="text-muted-foreground mb-4">
                        Avik Khadayat was leading consultancy projects at Aggies Create, where he identified a recurring
                        need for website development and lead generation services. Meanwhile, Zach Nowroozi was
                        exploring entrepreneurial opportunities, leveraging his technical expertise in Python,
                        JavaScript, and C++.
                      </p>
                      <p className="text-muted-foreground">
                        Though working in different capacities within the same organization, their paths were destined
                        to cross in a way that would transform lead generation in College Station.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">The Catalyst: Valiant Living</h3>
                      <p className="text-muted-foreground mb-4">
                        The turning point came when Valiant Living, a healthcare company, approached Avik with a
                        specific challenge: they needed to connect with hospitals that could refer patients for detox
                        services rather than to competitors.
                      </p>
                      <p className="text-muted-foreground">
                        Recognizing the scale of the project, Avik—known for his expertise in closing leads and finding
                        mentors—needed technical support to identify and qualify potential leads efficiently.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">The Partnership Forms</h3>
                      <p className="text-muted-foreground mb-4">
                        Having heard about Zach's exceptional programming abilities within Aggies Create, Avik reached
                        out for collaboration. Zach's skills in data scraping and lead identification perfectly
                        complemented Avik's talent for relationship building and closing deals.
                      </p>
                      <p className="text-muted-foreground">
                        Together, they successfully delivered for Valiant Living, with Zach developing sophisticated
                        tools to identify potential healthcare partners while Avik's team handled the personal outreach.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">The Inquerium Vision</h3>
                      <p className="text-muted-foreground mb-4">
                        The success of their collaboration revealed a powerful business model: combining technical
                        innovation with personalized outreach to revolutionize lead generation. They realized they had
                        created something special—Avik's team could put boots on the ground, while Zach could leverage
                        his programming expertise to identify qualified leads from various sources.
                      </p>
                      <p className="text-muted-foreground">
                        This perfect synergy of skills led to the founding of Inquerium, a company built on the
                        principle that effective lead generation requires both cutting-edge technology and human
                        connection.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="team" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Leadership</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Meet Our Founders</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Visionary leaders who combined their unique strengths to revolutionize lead generation.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 mt-8">
              <Card className="overflow-hidden">
                <div className="aspect-square">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="Avik Khadayat"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold">Avik Khadayat</h3>
                  <p className="text-sm text-muted-foreground mb-4">Co-Founder & CEO</p>
                  <p className="text-muted-foreground mb-4">
                    A specialist in closing leads and building relationships, Avik brings his experience as a former
                    team lead at Aggies Create to Inquerium. His talent for identifying opportunities and connecting
                    with decision-makers drives our client acquisition strategy.
                  </p>
                  <p className="text-muted-foreground">
                    As Supervisor at the McFerrin Center for Entrepreneurship, Avik continues to mentor the next
                    generation of business leaders while applying those same principles to grow Inquerium.
                  </p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <div className="aspect-square">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="Zach Nowroozi"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold">Zach Nowroozi</h3>
                  <p className="text-sm text-muted-foreground mb-4">Co-Founder & CTO</p>
                  <p className="text-muted-foreground mb-4">
                    A technical expert in Python, JavaScript, and C++, Zach leads our data-driven approach to lead
                    generation. His innovative programming solutions enable Inquerium to identify and qualify leads with
                    unprecedented efficiency and accuracy.
                  </p>
                  <p className="text-muted-foreground">
                    As Director of the Incubator at Aggies Create, Zach continues to foster innovation while developing
                    cutting-edge technologies that keep Inquerium at the forefront of the industry.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <Image
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="Our Advantage"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">Our Advantage</div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    The Perfect Blend of Technology and Human Connection
                  </h2>
                  <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    What sets Inquerium apart is our unique approach that combines advanced technical solutions with
                    personalized outreach, powered by College Station's best talent.
                  </p>
                </div>
                <ul className="grid gap-2 py-4">
                  {[
                    "Technical expertise that identifies qualified leads with precision",
                    "Relationship-building skills that convert leads into lasting partnerships",
                    "Access to innovative thinkers and problem solvers",
                    "Boots-on-the-ground approach combined with data-driven strategies",
                    "Deep understanding of industry-specific lead generation challenges",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Our Clients Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don't just take our word for it. Here's what businesses have to say about working with Inquerium.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              {[
                {
                  quote:
                    "Inquerium transformed our approach to lead generation. Their innovative strategies helped us increase qualified leads by 150% in just three months.",
                  author: "Sarah Johnson",
                  company: "TechStart Solutions",
                },
                {
                  quote:
                    "The team at Inquerium brings a level of expertise and creativity that's unmatched. They've become an essential extension of our marketing department.",
                  author: "Michael Chen",
                  company: "Horizon Financial",
                },
                {
                  quote:
                    "Working with Inquerium has been a game-changer for our business. Their data-driven approach and access to top talent delivers consistent results.",
                  author: "Jessica Martinez",
                  company: "GrowthPath Industries",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="flex flex-col justify-between">
                  <CardContent className="p-6">
                    <div className="flex mb-4 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
                        </svg>
                      ))}
                    </div>
                    <p className="mb-4 italic">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">Contact Us</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Transform Your Lead Generation?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get in touch with our team to discuss how Inquerium can help your business grow.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 mt-8">
              <Card>
                <CardContent className="p-6">
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label
                          htmlFor="first-name"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          First name
                        </label>
                        <input
                          id="first-name"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="last-name"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Last name
                        </label>
                        <input
                          id="last-name"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="company"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Company
                      </label>
                      <input
                        id="company"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter your company name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter your message"
                      />
                    </div>
                    <Button className="w-full">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
              <div className="flex flex-col justify-center space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <MapPin className="h-6 w-6 text-primary" />
                      <div>
                        <h3 className="font-bold">Location</h3>
                        <p className="text-muted-foreground">College Station, TX</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Mail className="h-6 w-6 text-primary" />
                      <div>
                        <h3 className="font-bold">Email</h3>
                        <p className="text-muted-foreground">info@inquerium.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Phone className="h-6 w-6 text-primary" />
                      <div>
                        <h3 className="font-bold">Phone</h3>
                        <p className="text-muted-foreground">(979) 555-1234</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Users className="h-6 w-6 text-primary" />
                      <div>
                        <h3 className="font-bold">Connect</h3>
                        <div className="flex space-x-4 mt-2">
                          {["twitter", "linkedin", "facebook", "instagram"].map((social) => (
                            <Link
                              key={social}
                              href={`#${social}`}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <span className="sr-only">{social}</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                              >
                                {social === "twitter" && (
                                  <>
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                                  </>
                                )}
                                {social === "linkedin" && (
                                  <>
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                    <rect width="4" height="12" x="2" y="9" />
                                    <circle cx="4" cy="4" r="2" />
                                  </>
                                )}
                                {social === "facebook" && (
                                  <>
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                  </>
                                )}
                                {social === "instagram" && (
                                  <>
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                  </>
                                )}
                              </svg>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="Inquerium Logo"
              width={32}
              height={32}
              className="rounded"
            />
            <p className="text-center text-sm leading-loose md:text-left">
              &copy; {new Date().getFullYear()} Inquerium. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm underline underline-offset-4">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm underline underline-offset-4">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
