import type { Metadata, Viewport } from "next";
import { Martian_Mono } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { profile } from "@/lib/content";
import "./globals.css";

/**
 * Display face. Wide, squared, and mechanical — it earns its keep only
 * at large sizes and short strings, so it is scoped to the name and
 * section headers rather than exposed as a body option.
 */
const martian = Martian_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-martian",
  display: "swap",
});

const description =
  "Senior software engineer building AI-enabled security products and secure cloud platforms for federal, defense, and research environments.";

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description,
  authors: [{ name: profile.name }],
  keywords: [
    "software engineer",
    "AI engineering",
    "cloud security",
    "platform engineering",
    "FedRAMP",
    "AWS GovCloud",
    "Kubernetes",
    "TypeScript",
  ],
  openGraph: {
    type: "profile",
    title: `${profile.name} — ${profile.role}`,
    description,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08090c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${martian.variable} ${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-void text-text antialiased">
        {/*
          Entrance animations render as inline opacity:0 in the prerendered
          HTML, so without JS the page would be blank. Reveal everything
          when scripting is off.
        */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
