import { Target, Eye, Award, Users, Globe, Lightbulb, TrendingUp, Shield } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-b from-[oklch(0.98_0.005_240)] to-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-display mb-6">
              Building the Future of{" "}
              <span className="text-gradient">AI Innovation</span>
            </h1>
            <p className="text-body-large text-[oklch(0.4_0.02_240)] max-w-3xl mx-auto">
              Orkestra Ventures is a VXL Holding Group initiative dedicated to
              discovering, developing, and deploying AI talent from Egypt to
              serve global markets.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h1 mb-8 text-center">Our Story</h2>
            <div className="space-y-6 text-body text-[oklch(0.4_0.02_240)]">
              <p>
                Orkestra Ventures was founded on a transformative vision: to bridge the global AI talent gap by unlocking exceptional potential from emerging markets. As artificial intelligence reshapes industries across continents, we recognized that talent knows no borders—yet opportunities often do. We exist to change that paradigm.
              </p>
              <p>
                Born from VXL Holding Group's commitment to global innovation, Orkestra Ventures is more than an AI training program—it's a catalyst for worldwide technological advancement. We're building a borderless ecosystem where talented professionals from Egypt, the Middle East, Africa, and beyond can access world-class education, connect with international mentors, and launch careers that span continents.
              </p>
              <p>
                Our 16-week intensive program represents a new model for global talent development: combining Silicon Valley-caliber technical training, international business strategy, cross-cultural mentorship from industry leaders worldwide, and direct pathways to opportunities in Egypt, the Gulf, Europe, North America, and beyond. We're not just training AI professionals—we're cultivating a generation of global AI leaders who will drive innovation across borders and industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding section-bg-light">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="card-elevated">
              <div className="w-16 h-16 mb-6 rounded-2xl bg-[oklch(0.55_0.18_260_/_0.1)] flex items-center justify-center">
                <Target className="h-8 w-8 text-[oklch(0.55_0.18_260)]" />
              </div>
              <h2 className="text-h2 mb-4">Our Mission</h2>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                To democratize access to world-class AI education and create pathways for talented professionals from emerging markets to compete, innovate, and lead on the global stage. We bridge continents, cultures, and opportunities—transforming potential into impact by connecting exceptional talent with international mentors, cutting-edge knowledge, and career opportunities that span from Cairo to Silicon Valley, from Dubai to London, and beyond.
              </p>
            </div>

            <div className="card-elevated">
              <div className="w-16 h-16 mb-6 rounded-2xl bg-[oklch(0.7_0.15_70_/_0.1)] flex items-center justify-center">
                <Eye className="h-8 w-8 text-[oklch(0.7_0.15_70)]" />
              </div>
              <h2 className="text-h2 mb-4">Our Vision</h2>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                To build a borderless AI talent ecosystem that positions emerging markets as powerhouses of global innovation. We envision a future where geographical origin is no barrier to technological leadership—where AI professionals from Cairo, Lagos, Karachi, and beyond are recognized as world-class innovators driving transformation at Fortune 500 companies, leading startups, shaping policy, and solving humanity's greatest challenges. Our vision is a world where talent, not location, determines opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Alignment */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-h1 mb-6">Strategic Alignment</h2>
            <p className="text-body-large text-[oklch(0.4_0.02_240)]">
              Orkestra Ventures aligns with national and regional AI strategies
              to drive economic growth and technological advancement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-standard text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[oklch(0.55_0.18_260_/_0.1)] flex items-center justify-center">
                <Globe className="h-8 w-8 text-[oklch(0.55_0.18_260)]" />
              </div>
              <h3 className="text-h3 mb-4">Egypt Vision 2030</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                Supporting Egypt's digital transformation goals and building a
                knowledge-based economy through AI talent development.
              </p>
            </div>

            <div className="card-standard text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[oklch(0.7_0.15_70_/_0.1)] flex items-center justify-center">
                <Target className="h-8 w-8 text-[oklch(0.7_0.15_70)]" />
              </div>
              <h3 className="text-h3 mb-4">UAE AI Strategy 2031</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                Creating talent pipelines to support UAE's ambition to become a
                global AI hub and leader in AI adoption.
              </p>
            </div>

            <div className="card-standard text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[oklch(0.65_0.12_180_/_0.1)] flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-[oklch(0.65_0.12_180)]" />
              </div>
              <h3 className="text-h3 mb-4">MENA Tech Growth</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                Accelerating regional technology adoption and innovation through
                skilled AI professionals and entrepreneurs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VXL Holding Group */}
      <section className="section-padding section-bg-light">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="card-elevated">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-1">
                  <div className="w-32 h-32 mx-auto lg:mx-0 rounded-2xl bg-[oklch(0.55_0.18_260_/_0.1)] flex items-center justify-center">
                    <Award className="h-16 w-16 text-[oklch(0.55_0.18_260)]" />
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <h2 className="text-h2 mb-4">VXL Holding Group</h2>
                  <p className="text-body text-[oklch(0.4_0.02_240)] mb-4">
                    Orkestra Ventures is a proud initiative of VXL Holding Group,
                    a leading investment and technology holding company committed
                    to driving innovation across emerging markets.
                  </p>
                  <p className="text-body text-[oklch(0.4_0.02_240)]">
                    VXL Holding Group brings decades of experience in technology
                    investments, ecosystem building, and talent development. This
                    expertise ensures Orkestra Ventures has the resources,
                    network, and strategic guidance needed to create lasting
                    impact in the AI talent landscape.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-h1 mb-6">Our Values</h2>
            <p className="text-body-large text-[oklch(0.4_0.02_240)]">
              The principles that guide everything we do at Orkestra Ventures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-standard">
              <Award className="h-12 w-12 text-[oklch(0.55_0.18_260)] mb-4" />
              <h3 className="text-h4 mb-3">Excellence</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                We maintain the highest standards in curriculum, mentorship, and
                outcomes. Mediocrity has no place in our program.
              </p>
            </div>

            <div className="card-standard">
              <Users className="h-12 w-12 text-[oklch(0.7_0.15_70)] mb-4" />
              <h3 className="text-h4 mb-3">Inclusivity</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                Talent exists everywhere. We're committed to discovering and
                developing it regardless of background or circumstance.
              </p>
            </div>

            <div className="card-standard">
              <Lightbulb className="h-12 w-12 text-[oklch(0.65_0.12_180)] mb-4" />
              <h3 className="text-h4 mb-3">Innovation</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                We constantly evolve our curriculum and methods to stay ahead of
                industry needs and technological advances.
              </p>
            </div>

            <div className="card-standard">
              <Globe className="h-12 w-12 text-[oklch(0.55_0.18_260)] mb-4" />
              <h3 className="text-h4 mb-3">Global Mindset</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                We prepare our graduates to compete and succeed in global
                markets, not just local opportunities.
              </p>
            </div>

            <div className="card-standard">
              <Shield className="h-12 w-12 text-[oklch(0.7_0.15_70)] mb-4" />
              <h3 className="text-h4 mb-3">Integrity</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                We operate with transparency, honesty, and ethical practices in
                all our interactions and decisions.
              </p>
            </div>

            <div className="card-standard">
              <TrendingUp className="h-12 w-12 text-[oklch(0.65_0.12_180)] mb-4" />
              <h3 className="text-h4 mb-3">Impact</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                Every decision is measured by its impact on our graduates'
                careers and the broader AI ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="section-padding section-bg-light">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-h1 mb-6">Our Approach</h2>
            <p className="text-body-large text-[oklch(0.4_0.02_240)]">
              What makes Orkestra Ventures different from traditional training
              programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-standard">
              <div className="text-5xl font-bold text-[oklch(0.55_0.18_260)] mb-4 font-data">
                01
              </div>
              <h3 className="text-h4 mb-3">Selective Admissions</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                We accept only 100 professionals per cohort, ensuring quality
                over quantity and maintaining our 1:5 mentorship ratio.
              </p>
            </div>

            <div className="card-standard">
              <div className="text-5xl font-bold text-[oklch(0.7_0.15_70)] mb-4 font-data">
                02
              </div>
              <h3 className="text-h4 mb-3">Intensive Curriculum</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                16 weeks of immersive learning combining theory, practice, and
                real-world projects that build portfolio-ready work.
              </p>
            </div>

            <div className="card-standard">
              <div className="text-5xl font-bold text-[oklch(0.65_0.12_180)] mb-4 font-data">
                03
              </div>
              <h3 className="text-h4 mb-3">Expert Mentorship</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                Access to 20+ mentors from Egypt, UAE, and international markets
                who provide guidance, connections, and career support.
              </p>
            </div>

            <div className="card-standard">
              <div className="text-5xl font-bold text-[oklch(0.55_0.18_260)] mb-4 font-data">
                04
              </div>
              <h3 className="text-h4 mb-3">Industry Partnerships</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                Direct connections to hiring partners in Egypt, UAE, and global
                markets through our extensive partner network.
              </p>
            </div>

            <div className="card-standard">
              <div className="text-5xl font-bold text-[oklch(0.7_0.15_70)] mb-4 font-data">
                05
              </div>
              <h3 className="text-h4 mb-3">Career Support</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                Comprehensive career services including resume building,
                interview preparation, and salary negotiation support.
              </p>
            </div>

            <div className="card-standard">
              <div className="text-5xl font-bold text-[oklch(0.65_0.12_180)] mb-4 font-data">
                06
              </div>
              <h3 className="text-h4 mb-3">Lifelong Community</h3>
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                Join a growing network of AI professionals, entrepreneurs, and
                leaders who support each other's continued growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-h1 mb-6">Our Journey</h2>
            <p className="text-body-large text-[oklch(0.4_0.02_240)]">
              Building a global AI talent platform with Egypt as the launchpad for regional and international expansion.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-32">
                  <div className="text-h3 font-bold text-[oklch(0.55_0.18_260)] font-data">
                    2026
                  </div>
                </div>
                <div className="flex-1 card-standard">
                  <h3 className="text-h4 mb-2">Global Platform Kickoff</h3>
                  <p className="text-body text-[oklch(0.4_0.02_240)]">
                    Orkestra Ventures launches in Egypt with inaugural cohort of 100 AI professionals. Strategic partnerships established across government, academia, and industry in Egypt and UAE. Program infrastructure deployed for global scalability.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-32">
                  <div className="text-h3 font-bold text-[oklch(0.7_0.15_70)] font-data">
                    2027
                  </div>
                </div>
                <div className="flex-1 card-standard">
                  <h3 className="text-h4 mb-2">Regional Expansion</h3>
                  <p className="text-body text-[oklch(0.4_0.02_240)]">
                    Scale to multiple cohorts annually across Egypt and UAE. Launch advanced specialization tracks and executive AI programs. Establish alumni network spanning MENA region with placement partnerships across GCC markets.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-32">
                  <div className="text-h3 font-bold text-[oklch(0.65_0.12_180)] font-data">
                    2028+
                  </div>
                </div>
                <div className="flex-1 card-standard">
                  <h3 className="text-h4 mb-2">Global AI Talent Hub</h3>
                  <p className="text-body text-[oklch(0.4_0.02_240)]">
                    Establish MENA as a recognized global AI talent hub. Expand to additional international markets. Launch venture fund and innovation lab to support graduate startups. Create sustainable ecosystem connecting talent, capital, and opportunity worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Partnerships */}
      <section className="section-padding section-bg-light">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-h1 mb-6">Global Partnerships</h2>
            <p className="text-body-large text-[oklch(0.4_0.02_240)]">
              Building a world-class ecosystem through strategic partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[oklch(0.55_0.18_260_/_0.1)] flex items-center justify-center">
                <Globe className="h-10 w-10 text-[oklch(0.55_0.18_260)]" />
              </div>
              <h3 className="text-h4 mb-2">Government</h3>
              <p className="text-body-small text-[oklch(0.4_0.02_240)]">
                MCIT, ITIDA, and other government entities supporting digital
                transformation
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[oklch(0.7_0.15_70_/_0.1)] flex items-center justify-center">
                <Award className="h-10 w-10 text-[oklch(0.7_0.15_70)]" />
              </div>
              <h3 className="text-h4 mb-2">Universities</h3>
              <p className="text-body-small text-[oklch(0.4_0.02_240)]">
                Leading Egyptian and international universities for research and
                talent
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[oklch(0.65_0.12_180_/_0.1)] flex items-center justify-center">
                <Users className="h-10 w-10 text-[oklch(0.65_0.12_180)]" />
              </div>
              <h3 className="text-h4 mb-2">Corporates</h3>
              <p className="text-body-small text-[oklch(0.4_0.02_240)]">
                Tech companies and enterprises providing opportunities and
                mentorship
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[oklch(0.55_0.18_260_/_0.1)] flex items-center justify-center">
                <TrendingUp className="h-10 w-10 text-[oklch(0.55_0.18_260)]" />
              </div>
              <h3 className="text-h4 mb-2">Investors</h3>
              <p className="text-body-small text-[oklch(0.4_0.02_240)]">
                VCs and angel investors supporting graduate entrepreneurship
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
