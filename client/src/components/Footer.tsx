import { Link } from "wouter";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[oklch(0.15_0.02_240)] text-[oklch(0.9_0.005_240)]">
      <div className="container section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo-icon.png" alt="Orkestra Ventures" className="h-10 w-10" />
              <span className="text-lg font-bold">Orkestra Ventures</span>
            </div>
            <p className="text-body-small text-[oklch(0.7_0.005_240)] mb-6">
              Building global AI leaders from Egypt. Empowering the next
              generation of AI professionals and entrepreneurs.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[oklch(0.2_0.02_240)] hover:bg-[oklch(0.55_0.18_260)] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[oklch(0.2_0.02_240)] hover:bg-[oklch(0.55_0.18_260)] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[oklch(0.2_0.02_240)] hover:bg-[oklch(0.55_0.18_260)] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-h4 mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-body-small text-[oklch(0.7_0.005_240)] hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-body-small text-[oklch(0.7_0.005_240)] hover:text-white transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-body-small text-[oklch(0.7_0.005_240)] hover:text-white transition-colors">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="/apply" className="text-body-small text-[oklch(0.7_0.005_240)] hover:text-white transition-colors">
                  Apply Now
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-body-small text-[oklch(0.7_0.005_240)] hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-h4 mb-6">Programs</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/programs#technical"
                  className="text-body-small text-[oklch(0.7_0.005_240)] hover:text-white transition-colors"
                >
                  Technical AI Bootcamp
                </Link>
              </li>
              <li>
                <Link
                  href="/programs#business"
                  className="text-body-small text-[oklch(0.7_0.005_240)] hover:text-white transition-colors"
                >
                  Business AI Bootcamp
                </Link>
              </li>
              <li>
                <Link
                  href="/programs#executive"
                  className="text-body-small text-[oklch(0.7_0.005_240)] hover:text-white transition-colors"
                >
                  AI for Decision Makers
                </Link>
              </li>
              <li>
                <Link
                  href="/programs#mentorship"
                  className="text-body-small text-[oklch(0.7_0.005_240)] hover:text-white transition-colors"
                >
                  Mentorship Program
                </Link>
              </li>
              <li>
                <Link
                  href="/programs#career"
                  className="text-body-small text-[oklch(0.7_0.005_240)] hover:text-white transition-colors"
                >
                  Career Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-h4 mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[oklch(0.7_0.15_70)] flex-shrink-0 mt-0.5" />
                <div className="text-body-small text-[oklch(0.7_0.005_240)]">
                  <div className="mb-2">Smart Village, Cairo, Egypt</div>
                  <div>ADGM, Abu Dhabi, UAE</div>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[oklch(0.7_0.15_70)] flex-shrink-0" />
                <a
                  href="mailto:info@orkestra.ventures"
                  className="text-body-small text-[oklch(0.7_0.005_240)] hover:text-white transition-colors"
                >
                  info@orkestra.ventures
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[oklch(0.7_0.15_70)] flex-shrink-0 mt-0.5" />
                <div className="text-body-small text-[oklch(0.7_0.005_240)]">
                  <div className="mb-1">
                    <a href="tel:+201114156734" className="hover:text-white transition-colors">
                      +20 111 415 6734 (Egypt)
                    </a>
                  </div>
                  <div>
                    <a href="tel:+971569960853" className="hover:text-white transition-colors">
                      +971 56 996 0853 (UAE)
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[oklch(0.2_0.02_240)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-body-small text-[oklch(0.6_0.005_240)]">
              © {currentYear} Orkestra Ventures. A VXL Holding Group Initiative.
              All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="text-body-small text-[oklch(0.7_0.005_240)] hover:text-[oklch(0.55_0.18_260)] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-body-small text-[oklch(0.7_0.005_240)] hover:text-[oklch(0.55_0.18_260)] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
