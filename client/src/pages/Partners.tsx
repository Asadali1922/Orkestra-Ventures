import { Handshake, Building2, GraduationCap, TrendingUp, Users, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "wouter";

export default function Partners() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-b from-[oklch(0.98_0.005_240)] to-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-display mb-6">
              Partner with <span className="text-gradient">Orkestra</span>
            </h1>
            <p className="text-body-large text-[oklch(0.4_0.02_240)] max-w-3xl mx-auto">
              Join us in building Egypt's premier AI talent ecosystem. Together,
              we can develop the next generation of AI leaders and drive
              innovation across industries.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Opportunities */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-h1 mb-6">Partnership Opportunities</h2>
            <p className="text-body-large text-[oklch(0.4_0.02_240)]">
              Multiple ways to collaborate and create impact in the AI ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card-elevated text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[oklch(0.55_0.18_260_/_0.1)] flex items-center justify-center">
                <Building2 className="h-8 w-8 text-[oklch(0.55_0.18_260)]" />
              </div>
              <h3 className="text-h3 mb-4">Government</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                Align with national AI strategies and support digital
                transformation initiatives.
              </p>
            </div>

            <div className="card-elevated text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[oklch(0.7_0.15_70_/_0.1)] flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-[oklch(0.7_0.15_70)]" />
              </div>
              <h3 className="text-h3 mb-4">Universities</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                Collaborate on research, curriculum development, and talent
                pipeline creation.
              </p>
            </div>

            <div className="card-elevated text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[oklch(0.65_0.12_180_/_0.1)] flex items-center justify-center">
                <Users className="h-8 w-8 text-[oklch(0.65_0.12_180)]" />
              </div>
              <h3 className="text-h3 mb-4">Corporates</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                Access top AI talent, provide mentorship, and drive innovation
                in your organization.
              </p>
            </div>

            <div className="card-elevated text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[oklch(0.55_0.18_260_/_0.1)] flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-[oklch(0.55_0.18_260)]" />
              </div>
              <h3 className="text-h3 mb-4">Investors</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                Get early access to AI startups and entrepreneurs with proven
                capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Partnership Benefits */}
      <section className="section-padding section-bg-light">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-h1 mb-6">Corporate Partnership Benefits</h2>
            <p className="text-body-large text-[oklch(0.4_0.02_240)]">
              Strategic advantages for organizations partnering with Orkestra
              Ventures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="card-standard">
              <div className="text-4xl font-bold text-[oklch(0.55_0.18_260)] mb-4 font-data">
                01
              </div>
              <h3 className="text-h3 mb-3">Talent Pipeline</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                Early access to top AI talent before they graduate. Participate
                in capstone projects and identify future hires.
              </p>
            </div>

            <div className="card-standard">
              <div className="text-4xl font-bold text-[oklch(0.7_0.15_70)] mb-4 font-data">
                02
              </div>
              <h3 className="text-h3 mb-3">Brand Visibility</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                Showcase your organization as an AI innovation leader. Logo
                placement, speaking opportunities, and event presence.
              </p>
            </div>

            <div className="card-standard">
              <div className="text-4xl font-bold text-[oklch(0.65_0.12_180)] mb-4 font-data">
                03
              </div>
              <h3 className="text-h3 mb-3">Mentorship Opportunities</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                Your team members can mentor participants, building leadership
                skills and staying current with AI trends.
              </p>
            </div>

            <div className="card-standard">
              <div className="text-4xl font-bold text-[oklch(0.55_0.18_260)] mb-4 font-data">
                04
              </div>
              <h3 className="text-h3 mb-3">Custom Training</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                Tailored AI training programs for your existing teams. Upskill
                your workforce with our proven curriculum.
              </p>
            </div>

            <div className="card-standard">
              <div className="text-4xl font-bold text-[oklch(0.7_0.15_70)] mb-4 font-data">
                05
              </div>
              <h3 className="text-h3 mb-3">Innovation Projects</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                Collaborate on real-world AI projects. Leverage program
                participants to explore new AI applications.
              </p>
            </div>

            <div className="card-standard">
              <div className="text-4xl font-bold text-[oklch(0.65_0.12_180)] mb-4 font-data">
                06
              </div>
              <h3 className="text-h3 mb-3">Network Access</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                Connect with other leading organizations, government entities,
                and academic institutions in our ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-h1 mb-6">Partnership Tiers</h2>
            <p className="text-body-large text-[oklch(0.4_0.02_240)]">
              Flexible partnership options to match your organization's goals and
              budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Silver - $50K */}
            <div className="card-elevated flex flex-col">
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-2 rounded-full bg-[oklch(0.65_0.12_180_/_0.1)] text-[oklch(0.65_0.12_180)] font-semibold text-sm mb-4">
                  SILVER
                </div>
                <div className="text-4xl font-bold text-[oklch(0.2_0.05_240)] mb-2 font-data">
                  $50K
                </div>
                <p className="text-body-small text-[oklch(0.4_0.02_240)]">
                  per year
                </p>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-2 text-body">
                  <span className="text-[oklch(0.65_0.12_180)]">✓</span>
                  <span>Premium logo placement on website</span>
                </li>
                <li className="flex items-start gap-2 text-body">
                  <span className="text-[oklch(0.65_0.12_180)]">✓</span>
                  <span>Hiring event access (2 events/year)</span>
                </li>
                <li className="flex items-start gap-2 text-body">
                  <span className="text-[oklch(0.65_0.12_180)]">✓</span>
                  <span>Mentorship opportunities (5 sessions)</span>
                </li>
                <li className="flex items-start gap-2 text-body">
                  <span className="text-[oklch(0.65_0.12_180)]">✓</span>
                  <span>Featured in quarterly newsletter</span>
                </li>
                <li className="flex items-start gap-2 text-body">
                  <span className="text-[oklch(0.65_0.12_180)]">✓</span>
                  <span>Social media recognition campaign</span>
                </li>
                <li className="flex items-start gap-2 text-body">
                  <span className="text-[oklch(0.65_0.12_180)]">✓</span>
                  <span>Access to alumni network</span>
                </li>
              </ul>
              <Link href="/contact" className="btn-primary w-full text-center mt-auto">
                Get Started
              </Link>
            </div>

            {/* Gold - $100K */}
            <div className="card-elevated border-2 border-[oklch(0.7_0.15_70)] flex flex-col">
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-2 rounded-full bg-[oklch(0.7_0.15_70_/_0.1)] text-[oklch(0.7_0.15_70)] font-semibold text-sm mb-4">
                  GOLD
                </div>
                <div className="text-4xl font-bold text-[oklch(0.2_0.05_240)] mb-2 font-data">
                  $100K
                </div>
                <p className="text-body-small text-[oklch(0.4_0.02_240)]">
                  per year
                </p>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-2 text-body">
                  <span className="text-[oklch(0.65_0.12_180)]">✓</span>
                  <span>All Silver benefits plus</span>
                </li>
                <li className="flex items-start gap-2 text-body">
                  <span className="text-[oklch(0.65_0.12_180)]">✓</span>
                  <span>Priority hiring access (top 10%)</span>
                </li>
                <li className="flex items-start gap-2 text-body">
                  <span className="text-[oklch(0.65_0.12_180)]">✓</span>
                  <span>Capstone project sponsorship (2 projects)</span>
                </li>
                <li className="flex items-start gap-2 text-body">
                  <span className="text-[oklch(0.65_0.12_180)]">✓</span>
                  <span>Keynote speaking opportunities</span>
                </li>
                <li className="flex items-start gap-2 text-body">
                  <span className="text-[oklch(0.65_0.12_180)]">✓</span>
                  <span>Custom training workshops (10 seats)</span>
                </li>
                <li className="flex items-start gap-2 text-body">
                  <span className="text-[oklch(0.65_0.12_180)]">✓</span>
                  <span>Quarterly talent pipeline reports</span>
                </li>
              </ul>
              <Link href="/contact" className="btn-primary w-full text-center mt-auto">
                Get Started
              </Link>
            </div>

            {/* Platinum - Custom */}
            <div className="card-elevated border-2 border-[oklch(0.55_0.18_260)] flex flex-col">
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-2 rounded-full bg-[oklch(0.55_0.18_260_/_0.1)] text-[oklch(0.55_0.18_260)] font-semibold text-sm mb-4">
                  PLATINUM
                </div>
                <div className="text-4xl font-bold text-[oklch(0.2_0.05_240)] mb-2 font-data">
                  $200K+
                </div>
                <p className="text-body-small text-[oklch(0.4_0.02_240)]">
                  Strategic Partnership
                </p>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-2 text-body">
                  <span className="text-[oklch(0.65_0.12_180)]">✓</span>
                  <span>All Gold benefits plus</span>
                </li>
                <li className="flex items-start gap-2 text-body">
                  <span className="text-[oklch(0.65_0.12_180)]">✓</span>
                  <span>Exclusive first-look hiring rights</span>
                </li>
                <li className="flex items-start gap-2 text-body">
                  <span className="text-[oklch(0.65_0.12_180)]">✓</span>
                  <span>Custom curriculum co-development</span>
                </li>
                <li className="flex items-start gap-2 text-body">
                  <span className="text-[oklch(0.65_0.12_180)]">✓</span>
                  <span>Dedicated cohort (20+ participants)</span>
                </li>
                <li className="flex items-start gap-2 text-body">
                  <span className="text-[oklch(0.65_0.12_180)]">✓</span>
                  <span>Board advisory seat</span>
                </li>
                <li className="flex items-start gap-2 text-body">
                  <span className="text-[oklch(0.65_0.12_180)]">✓</span>
                  <span>Quarterly executive briefings</span>
                </li>
                <li className="flex items-start gap-2 text-body">
                  <span className="text-[oklch(0.65_0.12_180)]">✓</span>
                  <span>Custom R&D collaboration</span>
                </li>
              </ul>
              <Link href="/contact" className="btn-secondary w-full text-center mt-auto">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Apply as Sponsor */}
      <section className="section-padding section-bg-light">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-h1 mb-6">Become a Sponsor</h2>
              <p className="text-body-large text-[oklch(0.4_0.02_240)]">
                Support the next generation of AI talent and gain visibility as a key partner in Egypt's AI ecosystem.
              </p>
            </div>

            <div className="card-elevated">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[oklch(0.3_0.02_240)] mb-2">
                      Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-[oklch(0.85_0.005_240)] rounded-lg focus:ring-2 focus:ring-[oklch(0.55_0.18_260)] focus:border-transparent"
                      placeholder="Your organization"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[oklch(0.3_0.02_240)] mb-2">
                      Industry *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-[oklch(0.85_0.005_240)] rounded-lg focus:ring-2 focus:ring-[oklch(0.55_0.18_260)] focus:border-transparent"
                    >
                      <option value="">Select industry</option>
                      <option value="technology">Technology</option>
                      <option value="finance">Finance</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="education">Education</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="retail">Retail</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[oklch(0.3_0.02_240)] mb-2">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-[oklch(0.85_0.005_240)] rounded-lg focus:ring-2 focus:ring-[oklch(0.55_0.18_260)] focus:border-transparent"
                      placeholder="Full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[oklch(0.3_0.02_240)] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-[oklch(0.85_0.005_240)] rounded-lg focus:ring-2 focus:ring-[oklch(0.55_0.18_260)] focus:border-transparent"
                      placeholder="email@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[oklch(0.3_0.02_240)] mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 border border-[oklch(0.85_0.005_240)] rounded-lg focus:ring-2 focus:ring-[oklch(0.55_0.18_260)] focus:border-transparent"
                      placeholder="+20 XXX XXX XXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[oklch(0.3_0.02_240)] mb-2">
                      Sponsorship Level *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-[oklch(0.85_0.005_240)] rounded-lg focus:ring-2 focus:ring-[oklch(0.55_0.18_260)] focus:border-transparent"
                    >
                      <option value="">Select level</option>
                      <option value="platinum">Platinum Sponsor</option>
                      <option value="gold">Gold Sponsor</option>
                      <option value="silver">Silver Sponsor</option>
                      <option value="bronze">Bronze Sponsor</option>
                      <option value="custom">Custom Package</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[oklch(0.3_0.02_240)] mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-[oklch(0.85_0.005_240)] rounded-lg focus:ring-2 focus:ring-[oklch(0.55_0.18_260)] focus:border-transparent"
                    placeholder="Tell us about your sponsorship interests and goals..."
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="sponsor-terms"
                    required
                    className="mt-1 h-4 w-4 text-[oklch(0.55_0.18_260)] focus:ring-[oklch(0.55_0.18_260)] border-[oklch(0.85_0.005_240)] rounded"
                  />
                  <label htmlFor="sponsor-terms" className="text-sm text-[oklch(0.4_0.02_240)]">
                    I agree to be contacted regarding sponsorship opportunities and understand that Orkestra Ventures will process my information according to the{" "}
                    <Link href="/privacy-policy" className="text-[oklch(0.55_0.18_260)] hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>

                <div className="flex gap-4">
                  <button type="submit" className="btn-primary flex-1">
                    Submit Sponsorship Application
                  </button>
                </div>

                <div className="mt-6 p-4 bg-[oklch(0.98_0.005_240)] rounded-lg">
                  <h4 className="font-semibold text-[oklch(0.3_0.02_240)] mb-2">Sponsorship Benefits Include:</h4>
                  <ul className="space-y-2 text-sm text-[oklch(0.4_0.02_240)]">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[oklch(0.65_0.12_180)] flex-shrink-0 mt-0.5" />
                      <span>Brand visibility across all program materials and events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[oklch(0.65_0.12_180)] flex-shrink-0 mt-0.5" />
                      <span>Early access to top AI talent for recruitment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[oklch(0.65_0.12_180)] flex-shrink-0 mt-0.5" />
                      <span>Speaking opportunities at program events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[oklch(0.65_0.12_180)] flex-shrink-0 mt-0.5" />
                      <span>Networking with AI ecosystem leaders</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[oklch(0.65_0.12_180)] flex-shrink-0 mt-0.5" />
                      <span>Recognition as a supporter of AI education in Egypt</span>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding section-bg-dark">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-h1 mb-6 text-white">
              Ready to Partner with Us?
            </h2>
            <p className="text-body-large text-[oklch(0.8_0.005_240)] mb-10">
              Let's discuss how we can collaborate to build Egypt's AI talent
              ecosystem and drive innovation in your organization.
            </p>
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
              Get in Touch <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
