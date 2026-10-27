import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ServicesSection } from "@/components/sections/services-section";
import { EmergencyBand } from "@/components/sections/emergency-band";
import { GallerySection } from "@/components/sections/gallery-section";
import { TimelineSection } from "@/components/sections/timeline-section";
import TeamSection from "@/components/sections/team-section";
import { StrengthSection } from "@/components/sections/strength-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ThemeToggle } from "@/components/theme-toggle";
import { Motion } from "@/components/motion";
import { contact, services } from "@/content/site";

const companyLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "History", href: "#history" },
  { label: "Team", href: "#team" },
  { label: "Group companies", href: "#group" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  return (
    <>
      <main id="main" className="cq">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <EmergencyBand />
        <GallerySection />
        <TimelineSection />
        <TeamSection />
        <StrengthSection />
        <ContactSection />
      </main>

      <footer className="cq on-dark border-t border-line bg-navy text-ink">
        <div className="wrap grid gap-12 pb-28 pt-[clamp(64px,8vw,96px)] md:pb-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image src="/images/logo.webp" alt="Zeus Power International" width={170} height={68} sizes="170px" className="h-12 w-auto" />
            <p className="mt-6 max-w-[36ch] text-[0.9375rem] text-ink-2">
              24/7 emergency breakdown and preventive maintenance for electrical, fire protection, air-conditioning and
              solar systems. A subsidiary of Illukkumbura Industrial Automation (Pvt) Ltd.
            </p>
            <ul className="mt-6 flex gap-5 text-[0.9375rem] font-medium">
              <li>
                <a href="https://www.facebook.com/zpiosrilanka/" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline">
                  Facebook<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/zeus-power-international/" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline">
                  LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Company" className="lg:col-span-2 lg:col-start-6">
            <h2 className="text-[0.875rem] font-semibold">Company</h2>
            <ul className="mt-4 grid gap-2.5 text-[0.9375rem] text-ink-2">
              {companyLinks.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="no-underline hover:text-ink">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services" className="lg:col-span-2">
            <h2 className="text-[0.875rem] font-semibold">Services</h2>
            <ul className="mt-4 grid gap-2.5 text-[0.9375rem] text-ink-2">
              {services.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="no-underline hover:text-ink">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3 lg:col-start-10">
            <h2 className="text-[0.875rem] font-semibold">24/7 emergency line</h2>
            <a href={contact.phoneHref} className="num mt-3 block text-[1.5rem] font-[650] tracking-[-0.02em] no-underline hover:text-white/80">
              {contact.phoneDisplay}
            </a>
            <a href={contact.emailHref} className="mt-2 block text-[0.9375rem] text-ink-2 hover:text-ink">
              {contact.email}
            </a>
            <address className="mt-4 text-[0.9375rem] not-italic leading-relaxed text-ink-2">
              {contact.address.join(", ")}
            </address>
          </div>

          <div className="flex flex-col gap-5 border-t border-line pt-8 text-[0.8125rem] text-ink-3 md:flex-row md:items-center md:justify-between lg:col-span-12">
            <p>&copy; {new Date().getFullYear()} Zeus Power International (Pvt) Ltd. All rights reserved.</p>
            <div className="flex items-center gap-3">
              <ThemeToggle withLabel className="!h-11 !text-[0.875rem]" />
              <a href="#top" className="btn btn-outline !h-11 !text-[0.875rem]">
                <ArrowUp className="h-4 w-4" aria-hidden="true" /> Back to top
              </a>
            </div>
          </div>
        </div>
      </footer>
      <Motion />
    </>
  );
}
