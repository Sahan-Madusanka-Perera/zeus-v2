import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { MobileCallBar } from "@/components/mobile-call-bar";
import { contact } from "@/content/site";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const siteUrl = "https://www.zeuspower.lk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Zeus Power International (Pvt) Ltd | Emergency Technical Services Sri Lanka",
  description: `Sri Lanka's 24/7 emergency breakdown and preventive maintenance crew for electrical, fire detection/protection, air-conditioning and solar systems. Call ${contact.phoneDisplay}.`,
  keywords: [
    "Zeus Power International",
    "ZPI",
    "Emergency Electrical Breakdown Sri Lanka",
    "Fire Detection Sri Lanka",
    "Air-Conditioning Systems",
    "Technical Services Colombo",
    "Solar Services Sri Lanka",
  ],
  authors: [{ name: "Zeus Power International" }],
  creator: "Zeus Power International",
  publisher: "Zeus Power International",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Zeus Power International | 24/7 Emergency Breakdown Services",
    description:
      "24/7 emergency breakdown and preventive maintenance for electrical, fire detection/protection and air-conditioning systems in Sri Lanka.",
    url: siteUrl,
    siteName: "Zeus Power International",
    images: [
      {
        url: "/images/service1.webp",
        width: 2048,
        height: 1463,
        alt: "Zeus Power International technician running a thermal scan of a switchboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zeus Power International",
    description: "24/7 technical services in Sri Lanka for electrical, fire, and AC systems.",
    images: ["/images/service1.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a0f1e" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1e" },
  ],
};

// Runs before first paint so a saved evening theme never flashes. Light is the default.
const themeScript = `(function(){try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}})();`;

const directionContract = `<!--
THESIS: An established engineering firm, stated plainly: the real thermography technician, a headline that names the job, the four service lines docked to the hero. Refuses costume; trust comes from clarity, photography and lineage.
OWN-WORLD: White and cool-slate grounds with slate-900 ink; navy #0A0F1E behind photography, emergency band and footer; crimson #E11D48 only for action and the live line; Geist 650, tight tracking; 6px controls, 10px panels, one long soft shadow for floating panels.
STORY: Mid-breakdown, a plant manager reads the headline and calls; a planner opens a service line, checks history, people and group, then books maintenance.
FIRST VIEWPORT: Full-bleed technician photo, left navy scrim; 68px headline left, sub, crimson Call +94 70 303 7037 and glass Explore services; white four-service panel floating 40px off the base; transparent nav, crimson Call 24/7 button.
FORM: Premium corporate standard, the canon comp of decision round seed b4b36878 (reroll 1). Approved comp: .impeccable/mocks/decision/canon.webp.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Zeus Power International (Pvt) Ltd",
    image: `${siteUrl}/images/service1.webp`,
    logo: `${siteUrl}/images/logo.webp`,
    description:
      "Emergency electrical breakdowns and services in electrical systems, fire detection/protection, and air-conditioning systems.",
    "@id": siteUrl,
    url: siteUrl,
    telephone: "+94703037037",
    email: contact.email,
    areaServed: "LK",
    parentOrganization: {
      "@type": "Organization",
      name: "Illukkumbura Industrial Automation (Pvt) Ltd",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "655/1, Gunathilaka Gardens, Elvitigala Mawatha",
      addressLocality: "Colombo 05",
      addressCountry: "LK",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/zpiosrilanka/",
      "https://www.linkedin.com/company/zeus-power-international/",
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={geist.variable}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div hidden dangerouslySetInnerHTML={{ __html: directionContract }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-[6px] focus:bg-surface focus:px-4 focus:py-3 focus:text-ink focus:shadow-raise"
        >
          Skip to content
        </a>
        <Navbar />
        {children}
        <MobileCallBar />
      </body>
    </html>
  );
}
