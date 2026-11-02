import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { personalInfo, socialLinks } from "@/data/personal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zariel.dev"),
  title: {
    default: "Zariel Dev — Full Stack Software Engineer",
    template: "%s | Zariel Dev",
  },
  description:
    "Portfolio of Zariel, a Full Stack Software Engineer specializing in modern web architecture, scalable systems, and creative frontend engineering.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Go",
    "Temporal",
    "NestJS",
    "Tailwind CSS",
    "Web Architecture",
  ],
  authors: [{ name: personalInfo.name, url: "https://zariel.dev" }],
  creator: personalInfo.name,
  publisher: personalInfo.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Zariel Dev — Full Stack Software Engineer",
    description:
      "Explore modern, scalable web applications and interactive software engineering projects.",
    url: "https://zariel.dev",
    siteName: "Zariel Dev",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/imgs/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Zariel Dev — Full Stack Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zariel Dev — Full Stack Software Engineer",
    description: "Full Stack Software Engineer portfolio and interactive projects.",
    images: ["/imgs/portfolio.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://zariel.dev/#website",
      "url": "https://zariel.dev",
      "name": "Zariel Dev",
      "description":
        "Portfolio of Zariel, a Full Stack Software Engineer specializing in modern web architecture, scalable systems, and creative frontend engineering.",
      "publisher": {
        "@id": "https://zariel.dev/#person",
      },
      "inLanguage": "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": "https://zariel.dev/#profilepage",
      "url": "https://zariel.dev",
      "name": "Zariel Dev — Full Stack Software Engineer",
      "isPartOf": {
        "@id": "https://zariel.dev/#website",
      },
      "about": {
        "@id": "https://zariel.dev/#person",
      },
      "mainEntity": {
        "@id": "https://zariel.dev/#person",
      },
    },
    {
      "@type": "Person",
      "@id": "https://zariel.dev/#person",
      "name": personalInfo.name,
      "url": "https://zariel.dev",
      "jobTitle": "Full Stack Software Engineer",
      "email": `mailto:${personalInfo.email}`,
      "image": "https://zariel.dev/imgs/logo.png",
      "sameAs": socialLinks.map((link) => link.url),
      "knowsAbout": [
        "Software Engineering",
        "Full Stack Development",
        "React",
        "Next.js",
        "TypeScript",
        "Go",
        "Temporal",
        "NestJS",
        ".NET",
        "Spring Boot",
        "Docker",
        "PostgreSQL",
        "Tailwind CSS",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div
          id="splash"
          className="splash"
          role="status"
          aria-label="Loading portfolio"
        >
          <div className="spinner-border" />
        </div>
        {children}
      </body>
    </html>
  );
}
