import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "AR Agents: AI agents for accounts receivable", template: "%s · AR Agents" },
  description: "AI agents that call and text your past-due customers, so you get paid.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-white text-slate-900">{children}</body>
    </html>
  );
}
