import { CheckCircle, Award, Users, Briefcase, TrendingUp, Globe, Target, Rocket, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import NewsletterPopup from "../components/NewsletterPopup";
import { useState, useEffect } from "react";

export default function Home() {
  const locations = ["Egypt", "The UAE", "Saudi Arabia", "Pakistan", "India", "Anywhere"];
  const [currentLocation, setCurrentLocation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLocation((prev) => (prev + 1) % locations.length);
    }, 2500); // Change every 2.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <NewsletterPopup />
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-b from-[oklch(0.98_0.005_240)] to-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <span className="badge-accent">AI Venture Studio</span>
            </div>
            <h1 className="text-display mb-6">
              <div className="leading-tight">Launch Your Global AI Career</div>
              <div className="text-[oklch(0.2_0.02_240)] leading-tight">From</div>
              <div className="inline-block relative overflow-hidden" style={{ width: '100%', maxWidth: '480px', minWidth: '200px', height: '1.2em', perspective: '1000px' }}>
                <span 
                  key={currentLocation}
                  className="text-gradient absolute left-0 top-0 w-full animate-flip-word text-center"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {locations[currentLocation]}
                </span>
              </div>
            </h1>
            <p className="text-body-large text-[oklch(0.4_0.02_240)] mb-10 max-w-3xl mx-auto">
              Orkestra Ventures is a 16-week intensive AI training program that
              transforms talented professionals into global AI leaders. Build
              cutting-edge skills, connect with international mentors, and
              launch your career in Egypt, UAE, or globally.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/apply" className="btn-primary inline-flex items-center gap-2">
                Apply Now <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/programs" className="btn-secondary">
                Explore Programs
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="text-4xl lg:text-5xl font-bold text-[oklch(0.55_0.18_260)] mb-2 font-data animate-scale-in">
                  100
                </div>
                <div className="text-body-small text-[oklch(0.4_0.02_240)]">
                  Professionals
                </div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="text-4xl lg:text-5xl font-bold text-[oklch(0.7_0.15_70)] mb-2 font-data animate-scale-in" style={{ animationDelay: '0.2s' }}>
                  20+
                </div>
                <div className="text-body-small text-[oklch(0.4_0.02_240)]">
                  Expert Mentors
                </div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="text-4xl lg:text-5xl font-bold text-[oklch(0.65_0.12_180)] mb-2 font-data animate-scale-in" style={{ animationDelay: '0.3s' }}>
                  5+
                </div>
                <div className="text-body-small text-[oklch(0.4_0.02_240)]">
                  Strategic Partners
                </div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="text-4xl lg:text-5xl font-bold text-[oklch(0.55_0.18_260)] mb-2 font-data animate-scale-in" style={{ animationDelay: '0.4s' }}>
                  16
                </div>
                <div className="text-body-small text-[oklch(0.4_0.02_240)]">
                  Weeks Program
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Orkestra */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-h1 mb-6">What is Orkestra Ventures?</h2>
            <p className="text-body-large text-[oklch(0.4_0.02_240)]">
              We're building the next generation of AI leaders through intensive
              training, world-class mentorship, and global career opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-elevated text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[oklch(0.55_0.18_260_/_0.1)] flex items-center justify-center">
                <Users className="h-8 w-8 text-[oklch(0.55_0.18_260)]" />
              </div>
              <h3 className="text-h3 mb-4">Intensive Training</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                16-week program covering AI fundamentals, applied machine
                learning, and advanced deep learning with hands-on projects.
              </p>
            </div>

            <div className="card-elevated text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[oklch(0.7_0.15_70_/_0.1)] flex items-center justify-center">
                <Target className="h-8 w-8 text-[oklch(0.7_0.15_70)]" />
              </div>
              <h3 className="text-h3 mb-4">Expert Mentorship</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                1:5 mentorship ratio with Egyptian, UAE, and international
                experts providing guidance throughout your journey.
              </p>
            </div>

            <div className="card-elevated text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[oklch(0.65_0.12_180_/_0.1)] flex items-center justify-center">
                <Rocket className="h-8 w-8 text-[oklch(0.65_0.12_180)]" />
              </div>
              <h3 className="text-h3 mb-4">Career Acceleration</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                Direct pathways to opportunities in Egypt, UAE, international
                markets, and entrepreneurship support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="section-padding section-bg-light">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-h1 mb-6">Choose Your Track</h2>
            <p className="text-body-large text-[oklch(0.4_0.02_240)]">
              Three specialized tracks designed to launch your AI career, whether
              you're technical, business-focused, or a decision maker.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Technical Track */}
            <div className="card-elevated">
              <div className="mb-6">
                <span className="badge-accent">Technical Track</span>
              </div>
              <h3 className="text-h2 mb-4">AI Technical Track</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)] mb-6">
                Master AI/ML development from fundamentals to advanced deep
                learning. Build production-ready AI systems.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[oklch(0.65_0.12_180)] flex-shrink-0 mt-0.5" />
                  <span className="text-body">
                    AI Fundamentals & Python Programming
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[oklch(0.65_0.12_180)] flex-shrink-0 mt-0.5" />
                  <span className="text-body">
                    Machine Learning & Model Development
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[oklch(0.65_0.12_180)] flex-shrink-0 mt-0.5" />
                  <span className="text-body">
                    Deep Learning & Neural Networks
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[oklch(0.65_0.12_180)] flex-shrink-0 mt-0.5" />
                  <span className="text-body">
                    Production AI Systems & MLOps
                  </span>
                </li>
              </ul>
              <Link href="/programs#technical" className="btn-tertiary">
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Business Track */}
            <div className="card-elevated">
              <div className="mb-6">
                <span className="badge-accent">Business Track</span>
              </div>
              <h3 className="text-h2 mb-4">AI Business Track</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)] mb-6">
                Lead AI transformation in organizations. Build AI-powered
                businesses and drive strategic innovation.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[oklch(0.7_0.15_70)] flex-shrink-0 mt-0.5" />
                  <span className="text-body">
                    AI Strategy & Business Transformation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[oklch(0.7_0.15_70)] flex-shrink-0 mt-0.5" />
                  <span className="text-body">
                    AI Product Management & Design
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[oklch(0.7_0.15_70)] flex-shrink-0 mt-0.5" />
                  <span className="text-body">
                    AI Entrepreneurship & Venture Building
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[oklch(0.7_0.15_70)] flex-shrink-0 mt-0.5" />
                  <span className="text-body">
                    Go-to-Market & Scaling Strategies
                  </span>
                </li>
              </ul>
              <Link href="/programs#business" className="btn-tertiary">
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* AI for Decision Makers Track */}
            <div className="card-elevated">
              <div className="mb-6">
                <span className="badge-accent">Executive Track</span>
              </div>
              <h3 className="text-h2 mb-4">AI for Decision Makers</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)] mb-6">
                Strategic AI leadership for executives. Drive organizational AI transformation and make informed technology decisions.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[oklch(0.55_0.18_260)] flex-shrink-0 mt-0.5" />
                  <span className="text-body">
                    AI Strategy & Digital Transformation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[oklch(0.55_0.18_260)] flex-shrink-0 mt-0.5" />
                  <span className="text-body">
                    AI Governance & Risk Management
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[oklch(0.55_0.18_260)] flex-shrink-0 mt-0.5" />
                  <span className="text-body">
                    AI Investment & ROI Assessment
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[oklch(0.55_0.18_260)] flex-shrink-0 mt-0.5" />
                  <span className="text-body">
                    Leading AI-Driven Organizations
                  </span>
                </li>
              </ul>
              <Link href="/programs#decision-makers" className="btn-tertiary">
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Orkestra */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-h1 mb-6">Why Choose Orkestra?</h2>
            <p className="text-body-large text-[oklch(0.4_0.02_240)]">
              We're not just another training program. We're your launchpad to a
              global AI career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-standard">
              <Award className="h-12 w-12 text-[oklch(0.55_0.18_260)] mb-4" />
              <h3 className="text-h4 mb-3">World-Class Curriculum</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                Industry-aligned curriculum designed by AI experts from leading
                tech companies and research institutions.
              </p>
            </div>

            <div className="card-standard">
              <Users className="h-12 w-12 text-[oklch(0.7_0.15_70)] mb-4" />
              <h3 className="text-h4 mb-3">1:5 Mentorship Ratio</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                Unprecedented access to mentors with deep expertise in AI,
                ensuring personalized guidance.
              </p>
            </div>

            <div className="card-standard">
              <Globe className="h-12 w-12 text-[oklch(0.65_0.12_180)] mb-4" />
              <h3 className="text-h4 mb-3">Global Career Pathways</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                Direct connections to opportunities in Egypt, UAE, and
                international markets through our partner network.
              </p>
            </div>

            <div className="card-standard">
              <Target className="h-12 w-12 text-[oklch(0.55_0.18_260)] mb-4" />
              <h3 className="text-h4 mb-3">Hands-On Projects</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                Build real-world AI solutions that demonstrate your skills to
                potential employers and investors.
              </p>
            </div>

            <div className="card-standard">
              <TrendingUp className="h-12 w-12 text-[oklch(0.7_0.15_70)] mb-4" />
              <h3 className="text-h4 mb-3">Career Support</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                Resume building, interview prep, salary negotiation, and direct
                introductions to hiring partners.
              </p>
            </div>

            <div className="card-standard">
              <Rocket className="h-12 w-12 text-[oklch(0.65_0.12_180)] mb-4" />
              <h3 className="text-h4 mb-3">Entrepreneurship Support</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                Venture building support, investor connections, and access to
                funding opportunities for AI startups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="section-padding section-bg-light">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-h1 mb-6">Our Commitment to Excellence</h2>
            <p className="text-body-large text-[oklch(0.4_0.02_240)]">
              Measurable outcomes that demonstrate our impact on careers and the
              AI ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card-data">
              <div className="text-5xl lg:text-6xl font-bold text-[oklch(0.55_0.18_260)] mb-4 font-data">
                100+
              </div>
              <h3 className="text-h4 mb-2">AI Projects</h3>
              <p className="text-body-small text-[oklch(0.4_0.02_240)]">
                Production-ready AI solutions built by our graduates
              </p>
            </div>

            <div className="card-data">
              <div className="text-5xl lg:text-6xl font-bold text-[oklch(0.7_0.15_70)] mb-4 font-data">
                10%+
              </div>
              <h3 className="text-h4 mb-2">Employment Rate</h3>
              <p className="text-body-small text-[oklch(0.4_0.02_240)]">
                Graduates placed in AI roles or launched startups
              </p>
            </div>

            <div className="card-data">
              <div className="text-5xl lg:text-6xl font-bold text-[oklch(0.65_0.12_180)] mb-4 font-data">
                30+
              </div>
              <h3 className="text-h4 mb-2">Partner Organizations</h3>
              <p className="text-body-small text-[oklch(0.4_0.02_240)]">
                Government, universities, and corporations supporting our mission
              </p>
            </div>

            <div className="card-data">
              <div className="text-5xl lg:text-6xl font-bold text-[oklch(0.55_0.18_260)] mb-4 font-data">
                80%+
              </div>
              <h3 className="text-h4 mb-2">Completion Rate</h3>
              <p className="text-body-small text-[oklch(0.4_0.02_240)]">
                High engagement and program completion success
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Opportunities */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-h1 mb-6">Your Global Career Awaits</h2>
            <p className="text-body-large text-[oklch(0.4_0.02_240)]">
              Train in Egypt, launch globally. Access competitive opportunities across multiple markets and build a world-class AI career from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card-standard text-center flex flex-col">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[oklch(0.55_0.18_260_/_0.1)] flex items-center justify-center">
                <Globe className="h-8 w-8 text-[oklch(0.55_0.18_260)]" />
              </div>
              <h3 className="text-h4 mb-3">Egypt Tech Ecosystem</h3>
              <p className="text-body-small text-[oklch(0.4_0.02_240)]" style={{ minHeight: '60px' }}>
                Join leading Egyptian tech companies and fast-growing startups in Cairo's thriving AI hub
              </p>
              <div className="text-body-small font-semibold text-[oklch(0.55_0.18_260)] font-data mt-auto pt-3">
                40K+ EGP Monthly
              </div>
            </div>

            <div className="card-standard text-center flex flex-col">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[oklch(0.7_0.15_70_/_0.1)] flex items-center justify-center">
                <Target className="h-8 w-8 text-[oklch(0.7_0.15_70)]" />
              </div>
              <h3 className="text-h4 mb-3">UAE & GCC Markets</h3>
              <p className="text-body-small text-[oklch(0.4_0.02_240)]" style={{ minHeight: '60px' }}>
                Access premium opportunities in Dubai, Abu Dhabi, and across the Gulf region
              </p>
              <div className="text-body-small font-semibold text-[oklch(0.7_0.15_70)] font-data mt-auto pt-3">
                30K+ AED Monthly
              </div>
            </div>

            <div className="card-standard text-center flex flex-col">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[oklch(0.65_0.12_180_/_0.1)] flex items-center justify-center">
                <Users className="h-8 w-8 text-[oklch(0.65_0.12_180)]" />
              </div>
              <h3 className="text-h4 mb-3">International Remote</h3>
              <p className="text-body-small text-[oklch(0.4_0.02_240)]" style={{ minHeight: '60px' }}>
                Work remotely for Fortune 500 companies and global tech giants from anywhere
              </p>
              <div className="text-body-small font-semibold text-[oklch(0.65_0.12_180)] font-data mt-auto pt-3">
                15K+ USD Monthly
              </div>
            </div>

            <div className="card-standard text-center flex flex-col">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[oklch(0.55_0.18_260_/_0.1)] flex items-center justify-center">
                <Rocket className="h-8 w-8 text-[oklch(0.55_0.18_260)]" />
              </div>
              <h3 className="text-h4 mb-3">Entrepreneurship</h3>
              <p className="text-body-small text-[oklch(0.4_0.02_240)]" style={{ minHeight: '60px' }}>
                Launch your AI startup with seed funding, mentorship, and global market access
              </p>
              <div className="text-body-small font-semibold text-[oklch(0.55_0.18_260)] font-data mt-auto pt-3">
                Venture Support & Capital
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding section-bg-dark">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-h1 mb-6 text-white">
              Ready to Transform Your Career?
            </h2>
            <p className="text-body-large text-[oklch(0.8_0.005_240)] mb-10">
              Applications for our next cohort are now open. Join 100 talented
              professionals in the journey to become global AI leaders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/apply" className="btn-primary inline-flex items-center gap-2">
                Apply Now <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/contact" className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white hover:text-[oklch(0.2_0.05_240)] transition-all duration-200">
                Contact Us
              </Link>
            </div>
            <p className="text-body-small text-[oklch(0.7_0.005_240)] mt-8">
              Application Deadline: Rolling Admissions • Program Start: Q2 2026
            </p>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
