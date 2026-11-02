import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Apple devices render SF Pro from the system; everyone else gets Inter.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: { default: "AR Agents: AI agents for accounts receivable", template: "%s · AR Agents" },
  description: "AI agents that call and text your past-due customers, so you get paid.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable}`}>
      <body className="min-h-full bg-white font-sans text-ink-900">{children}</body>
    </html>
  );
}
