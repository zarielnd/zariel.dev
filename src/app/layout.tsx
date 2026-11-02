import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zariel Dev — Full Stack Software Engineer",
  description:
    "Portfolio of Zariel, a Full Stack Software Engineer specializing in modern web architecture, scalable systems, and creative frontend engineering.",
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Go",
    "Temporal",
  ],
  authors: [{ name: "Zariel" }],
  openGraph: {
    title: "Zariel Dev — Full Stack Software Engineer",
    description:
      "Explore modern, scalable web applications and interactive software engineering projects.",
    url: "https://zariel.dev",
    siteName: "Zariel Dev",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zariel Dev — Full Stack Software Engineer",
    description: "Full Stack Software Engineer portfolio and interactive projects.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
