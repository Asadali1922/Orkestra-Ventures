import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/lib/trpc";
import { Users, Star, Briefcase, Linkedin, Award, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function Mentors() {
  const [selectedExpertise, setSelectedExpertise] = useState<string>("all");
  
  // Fetch mentors from API
  const { data: mentors, isLoading } = trpc.mentors.getAll.useQuery();

  // Extract unique expertise areas
  const expertiseAreas = mentors
    ? Array.from(
        new Set(
          mentors
            .flatMap((m: any) => m.expertise?.split(",").map((e: string) => e.trim()))
            .filter(Boolean)
        )
      ).sort()
    : [];

  // Filter mentors by expertise
  const filteredMentors = mentors?.filter((mentor: any) => {
    if (selectedExpertise === "all") return true;
    return mentor.expertise?.includes(selectedExpertise);
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-b from-[oklch(0.98_0.005_240)] to-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-display mb-6">
              Meet Our <span className="text-gradient">Expert Mentors</span>
            </h1>
            <p className="text-body-large text-[oklch(0.4_0.02_240)] max-w-3xl mx-auto">
              Learn from world-class entrepreneurs, executives, and industry leaders who have
              raised billions in capital, built successful companies, and transformed industries
              with AI and technology.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 bg-[oklch(0.96_0.005_240)] border-y border-[oklch(0.9_0.005_240)]">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-body-small text-[oklch(0.4_0.02_240)]">
              Mentor network access provided and managed by{" "}
              <a 
                href="https://www.globalinnovationdojo.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[oklch(0.55_0.18_260)] hover:text-[oklch(0.45_0.18_260)] font-semibold underline"
              >
                Global Innovation Dojo
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding-sm">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="card-data">
              <Users className="h-12 w-12 mx-auto mb-4 text-[oklch(0.55_0.18_260)]" />
              <div className="text-4xl font-bold text-[oklch(0.55_0.18_260)] mb-2 font-data">
                {mentors?.length || 47}+
              </div>
              <div className="text-body-small text-[oklch(0.4_0.02_240)]">
                Expert Mentors
              </div>
            </div>

            <div className="card-data">
              <Award className="h-12 w-12 mx-auto mb-4 text-[oklch(0.7_0.15_70)]" />
              <div className="text-4xl font-bold text-[oklch(0.7_0.15_70)] mb-2 font-data">
                200+
              </div>
              <div className="text-body-small text-[oklch(0.4_0.02_240)]">
                Combined Exits
              </div>
            </div>

            <div className="card-data">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-[oklch(0.65_0.12_180)]" />
              <div className="text-4xl font-bold text-[oklch(0.65_0.12_180)] mb-2 font-data">
                $10B+
              </div>
              <div className="text-body-small text-[oklch(0.4_0.02_240)]">
                Capital Raised
              </div>
            </div>

            <div className="card-data">
              <Star className="h-12 w-12 mx-auto mb-4 text-[oklch(0.55_0.18_260)]" />
              <div className="text-4xl font-bold text-[oklch(0.55_0.18_260)] mb-2 font-data">
                5.0
              </div>
              <div className="text-body-small text-[oklch(0.4_0.02_240)]">
                Average Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="section-padding-sm section-bg-light">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h3 mb-6 text-center">Filter by Expertise</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSelectedExpertise("all")}
                className={`px-4 py-2 rounded-lg text-body-small font-medium transition-all ${
                  selectedExpertise === "all"
                    ? "bg-[oklch(0.55_0.18_260)] text-white"
                    : "bg-white text-[oklch(0.4_0.02_240)] hover:bg-[oklch(0.98_0.005_240)]"
                }`}
              >
                All Mentors
              </button>
              {(expertiseAreas.slice(0, 12) as string[]).map((expertise: string) => (
                <button
                  key={expertise}
                  onClick={() => setSelectedExpertise(expertise)}
                  className={`px-4 py-2 rounded-lg text-body-small font-medium transition-all ${
                    selectedExpertise === expertise
                      ? "bg-[oklch(0.55_0.18_260)] text-white"
                      : "bg-white text-[oklch(0.4_0.02_240)] hover:bg-[oklch(0.98_0.005_240)]"
                  }`}
                >
                  {expertise}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mentors Grid */}
      <section className="section-padding">
        <div className="container">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[oklch(0.55_0.18_260)]"></div>
              <p className="mt-4 text-body text-[oklch(0.4_0.02_240)]">Loading mentors...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredMentors?.map((mentor: any) => (
                <div key={mentor.id} className="card-elevated group hover:shadow-2xl transition-all duration-300">
                  {/* Mentor Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[oklch(0.55_0.18_260)] to-[oklch(0.7_0.15_70)] flex items-center justify-center text-white text-2xl font-bold">
                        {mentor.firstName?.[0]}{mentor.lastName?.[0]}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-h4 mb-1 truncate">
                        {mentor.firstName} {mentor.lastName}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-4 w-4 text-[oklch(0.7_0.15_70)] fill-current" />
                        <span className="text-body-small font-semibold text-[oklch(0.4_0.02_240)]">
                          {mentor.rating || "5.0"}
                        </span>
                        <span className="text-body-small text-[oklch(0.5_0.02_240)]">
                          • {mentor.sessionsCompleted || 0} sessions
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Company */}
                  {mentor.company && (
                    <div className="flex items-center gap-2 mb-3">
                      <Briefcase className="h-4 w-4 text-[oklch(0.55_0.18_260)]" />
                      <span className="text-body-small text-[oklch(0.4_0.02_240)] truncate">
                        {mentor.company}
                      </span>
                    </div>
                  )}

                  {/* Expertise Tags */}
                  {mentor.expertise && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {mentor.expertise
                        .split(",")
                        .slice(0, 3)
                        .map((exp: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-[oklch(0.98_0.005_240)] text-[oklch(0.55_0.18_260)] text-body-small rounded-md"
                          >
                            {exp.trim()}
                          </span>
                        ))}
                    </div>
                  )}

                  {/* Bio */}
                  <p className="text-body-small text-[oklch(0.4_0.02_240)] mb-4 line-clamp-3">
                    {mentor.bio}
                  </p>

                  {/* LinkedIn Link */}
                  {mentor.linkedin && (
                    <a
                      href={mentor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-body-small text-[oklch(0.55_0.18_260)] hover:text-[oklch(0.7_0.15_70)] transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span>View LinkedIn Profile</span>
                    </a>
                  )}

                  {/* Availability Badge */}
                  <div className="mt-4 pt-4 border-t border-[oklch(0.95_0.005_240)]">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-body-small font-medium ${
                        mentor.availability === "available"
                          ? "bg-[oklch(0.65_0.12_180_/_0.1)] text-[oklch(0.65_0.12_180)]"
                          : "bg-[oklch(0.5_0.02_240_/_0.1)] text-[oklch(0.5_0.02_240)]"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          mentor.availability === "available"
                            ? "bg-[oklch(0.65_0.12_180)]"
                            : "bg-[oklch(0.5_0.02_240)]"
                        }`}
                      ></span>
                      {mentor.availability === "available" ? "Available" : "Busy"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && filteredMentors?.length === 0 && (
            <div className="text-center py-20">
              <p className="text-body text-[oklch(0.4_0.02_240)]">
                No mentors found for this expertise area.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding section-bg-light">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-h2 mb-6">Ready to Learn from the Best?</h2>
            <p className="text-body-large text-[oklch(0.4_0.02_240)] mb-8">
              Join Orkestra Ventures and get direct access to our network of world-class mentors.
              Apply now to start your AI career transformation.
            </p>
            <a href="/apply" className="btn-primary inline-block">
              Apply to Program
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
