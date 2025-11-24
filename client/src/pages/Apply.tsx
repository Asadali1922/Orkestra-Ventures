import { CheckCircle, Upload, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function Apply() {
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    
    // Program Selection
    track: "" as "technical" | "business" | "",
    careerPath: "" as "egypt" | "uae" | "international" | "entrepreneurship" | "",
    
    // Background
    education: "",
    currentRole: "",
    yearsExperience: "",
    technicalBackground: "",
    
    // Application Details
    motivation: "",
    goals: "",
    linkedinUrl: "",
    portfolioUrl: "",
  });

  const submitApplication = trpc.applications.submit.useMutation({
    onSuccess: () => {
      toast.success(
        "Application submitted successfully! We'll review your application and get back to you within 5 business days."
      );
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        track: "",
        careerPath: "",
        education: "",
        currentRole: "",
        yearsExperience: "",
        technicalBackground: "",
        motivation: "",
        goals: "",
        linkedinUrl: "",
        portfolioUrl: "",
      });
    },
    onError: (error) => {
      toast.error("Failed to submit application. Please try again.");
      console.error("Application submission error:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.track || !formData.careerPath) {
      toast.error("Please select both a track and career path");
      return;
    }

    // Submit to database
    submitApplication.mutate({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      city: formData.city,
      track: formData.track as "technical" | "business",
      careerPath: formData.careerPath as "egypt" | "uae" | "international" | "entrepreneurship",
      education: formData.education,
      currentRole: formData.currentRole || undefined,
      yearsExperience: formData.yearsExperience ? parseInt(formData.yearsExperience) : undefined,
      technicalBackground: formData.technicalBackground || undefined,
      motivation: formData.motivation,
      goals: formData.goals,
      linkedinUrl: formData.linkedinUrl || undefined,
      portfolioUrl: formData.portfolioUrl || undefined,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const value =
      e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-b from-[oklch(0.98_0.005_240)] to-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-display mb-6">
              Apply to <span className="text-gradient">Orkestra Ventures</span>
            </h1>
            <p className="text-body-large text-[oklch(0.4_0.02_240)] max-w-3xl mx-auto">
              Take the first step toward launching your global AI career. Join
              100 talented professionals in our next cohort.
            </p>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="section-padding section-bg-light">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-h1 mb-6">Application Process</h2>
            <p className="text-body-large text-[oklch(0.4_0.02_240)]">
              A simple 4-step process to join Orkestra Ventures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="card-standard text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[oklch(0.55_0.18_260_/_0.1)] flex items-center justify-center">
                <span className="text-2xl font-bold text-[oklch(0.55_0.18_260)] font-data">
                  1
                </span>
              </div>
              <h3 className="text-h4 mb-2">Submit Application</h3>
              <p className="text-body-small text-[oklch(0.4_0.02_240)]">
                Complete the form below with your information and motivation.
              </p>
            </div>

            <div className="card-standard text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[oklch(0.7_0.15_70_/_0.1)] flex items-center justify-center">
                <span className="text-2xl font-bold text-[oklch(0.7_0.15_70)] font-data">
                  2
                </span>
              </div>
              <h3 className="text-h4 mb-2">Initial Review</h3>
              <p className="text-body-small text-[oklch(0.4_0.02_240)]">
                Our team reviews your application within 5 business days.
              </p>
            </div>

            <div className="card-standard text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[oklch(0.65_0.12_180_/_0.1)] flex items-center justify-center">
                <span className="text-2xl font-bold text-[oklch(0.65_0.12_180)] font-data">
                  3
                </span>
              </div>
              <h3 className="text-h4 mb-2">Interview</h3>
              <p className="text-body-small text-[oklch(0.4_0.02_240)]">
                Qualified candidates are invited for a 30-minute interview.
              </p>
            </div>

            <div className="card-standard text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[oklch(0.55_0.18_260_/_0.1)] flex items-center justify-center">
                <span className="text-2xl font-bold text-[oklch(0.55_0.18_260)] font-data">
                  4
                </span>
              </div>
              <h3 className="text-h4 mb-2">Decision</h3>
              <p className="text-body-small text-[oklch(0.4_0.02_240)]">
                Receive your decision and enrollment information within 3 days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="card-elevated">
              <h2 className="text-h2 mb-8">Application Form</h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-h3 mb-6 pb-3 border-b border-[oklch(0.9_0.005_240)]">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-body font-medium text-[oklch(0.2_0.05_240)] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-[oklch(0.9_0.005_240)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.18_260)] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-body font-medium text-[oklch(0.2_0.05_240)] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-[oklch(0.9_0.005_240)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.18_260)] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-body font-medium text-[oklch(0.2_0.05_240)] mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-[oklch(0.9_0.005_240)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.18_260)] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-body font-medium text-[oklch(0.2_0.05_240)] mb-2">
                        Country *
                      </label>
                      <input
                        type="text"
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-[oklch(0.9_0.005_240)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.18_260)] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-body font-medium text-[oklch(0.2_0.05_240)] mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-[oklch(0.9_0.005_240)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.18_260)] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Program Selection */}
                <div>
                  <h3 className="text-h3 mb-6 pb-3 border-b border-[oklch(0.9_0.005_240)]">
                    Program Selection
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-body font-medium text-[oklch(0.2_0.05_240)] mb-2">
                        Track *
                      </label>
                      <select
                        name="track"
                        required
                        value={formData.track}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-[oklch(0.9_0.005_240)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.18_260)] focus:border-transparent"
                      >
                        <option value="">Select track</option>
                        <option value="technical">Technical Track</option>
                        <option value="business">Business Track</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-body font-medium text-[oklch(0.2_0.05_240)] mb-2">
                        Career Path *
                      </label>
                      <select
                        name="careerPath"
                        required
                        value={formData.careerPath}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-[oklch(0.9_0.005_240)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.18_260)] focus:border-transparent"
                      >
                        <option value="">Select career path</option>
                        <option value="egypt">Egypt Career Path</option>
                        <option value="uae">UAE Career Path</option>
                        <option value="international">International Career Path</option>
                        <option value="entrepreneurship">Entrepreneurship Path</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Background */}
                <div>
                  <h3 className="text-h3 mb-6 pb-3 border-b border-[oklch(0.9_0.005_240)]">
                    Background
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-body font-medium text-[oklch(0.2_0.05_240)] mb-2">
                        Education *
                      </label>
                      <textarea
                        name="education"
                        required
                        rows={3}
                        value={formData.education}
                        onChange={handleChange}
                        placeholder="Describe your educational background (degree, university, major)"
                        className="w-full px-4 py-3 rounded-lg border border-[oklch(0.9_0.005_240)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.18_260)] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-body font-medium text-[oklch(0.2_0.05_240)] mb-2">
                        Current Role
                      </label>
                      <input
                        type="text"
                        name="currentRole"
                        value={formData.currentRole}
                        onChange={handleChange}
                        placeholder="e.g., Software Engineer, Product Manager"
                        className="w-full px-4 py-3 rounded-lg border border-[oklch(0.9_0.005_240)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.18_260)] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-body font-medium text-[oklch(0.2_0.05_240)] mb-2">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        name="yearsExperience"
                        min="0"
                        max="50"
                        value={formData.yearsExperience}
                        onChange={handleChange}
                        placeholder="0-50"
                        className="w-full px-4 py-3 rounded-lg border border-[oklch(0.9_0.005_240)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.18_260)] focus:border-transparent"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-body font-medium text-[oklch(0.2_0.05_240)] mb-2">
                        Technical Background
                      </label>
                      <textarea
                        name="technicalBackground"
                        rows={3}
                        value={formData.technicalBackground}
                        onChange={handleChange}
                        placeholder="Describe your technical skills, programming languages, frameworks, etc."
                        className="w-full px-4 py-3 rounded-lg border border-[oklch(0.9_0.005_240)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.18_260)] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Application Details */}
                <div>
                  <h3 className="text-h3 mb-6 pb-3 border-b border-[oklch(0.9_0.005_240)]">
                    Application Details
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-body font-medium text-[oklch(0.2_0.05_240)] mb-2">
                        Why do you want to join Orkestra Ventures? *
                      </label>
                      <textarea
                        name="motivation"
                        required
                        rows={4}
                        value={formData.motivation}
                        onChange={handleChange}
                        placeholder="Tell us about your motivation to join our program"
                        className="w-full px-4 py-3 rounded-lg border border-[oklch(0.9_0.005_240)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.18_260)] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-body font-medium text-[oklch(0.2_0.05_240)] mb-2">
                        What are your career goals? *
                      </label>
                      <textarea
                        name="goals"
                        required
                        rows={4}
                        value={formData.goals}
                        onChange={handleChange}
                        placeholder="Describe your short-term and long-term career goals"
                        className="w-full px-4 py-3 rounded-lg border border-[oklch(0.9_0.005_240)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.18_260)] focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-body font-medium text-[oklch(0.2_0.05_240)] mb-2">
                          LinkedIn Profile
                        </label>
                        <input
                          type="url"
                          name="linkedinUrl"
                          value={formData.linkedinUrl}
                          onChange={handleChange}
                          placeholder="https://linkedin.com/in/yourprofile"
                          className="w-full px-4 py-3 rounded-lg border border-[oklch(0.9_0.005_240)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.18_260)] focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-body font-medium text-[oklch(0.2_0.05_240)] mb-2">
                          Portfolio/Website
                        </label>
                        <input
                          type="url"
                          name="portfolioUrl"
                          value={formData.portfolioUrl}
                          onChange={handleChange}
                          placeholder="https://yourportfolio.com"
                          className="w-full px-4 py-3 rounded-lg border border-[oklch(0.9_0.005_240)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.18_260)] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-[oklch(0.9_0.005_240)]">
                  <Button
                    type="submit"
                    disabled={submitApplication.isPending}
                    className="w-full md:w-auto px-8 py-4 bg-[oklch(0.55_0.18_260)] hover:bg-[oklch(0.50_0.18_260)] text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    {submitApplication.isPending ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                  <p className="text-body-small text-[oklch(0.4_0.02_240)] mt-4">
                    By submitting this application, you agree to our terms and
                    conditions and privacy policy.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="section-padding section-bg-light">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-h1 mb-6">What Happens Next?</h2>
            <div className="space-y-6 text-left">
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-[oklch(0.55_0.18_260)] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-h4 mb-2">Confirmation Email</h3>
                  <p className="text-body text-[oklch(0.4_0.02_240)]">
                    You'll receive an email confirmation within 24 hours
                    acknowledging receipt of your application.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-[oklch(0.55_0.18_260)] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-h4 mb-2">Application Review</h3>
                  <p className="text-body text-[oklch(0.4_0.02_240)]">
                    Our team will carefully review your application and
                    qualifications within 5 business days.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-[oklch(0.55_0.18_260)] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-h4 mb-2">Interview Invitation</h3>
                  <p className="text-body text-[oklch(0.4_0.02_240)]">
                    If selected, you'll receive an invitation for a 30-minute
                    video interview with our team.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-[oklch(0.55_0.18_260)] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-h4 mb-2">Final Decision</h3>
                  <p className="text-body text-[oklch(0.4_0.02_240)]">
                    You'll receive our final decision and next steps within 3
                    days of your interview.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
