import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "AI SkillsPro - AI-Powered Product Team Skills",
  description:
    "Empower your product team with 24 AI-powered skills organized by lifecycle phase. Discovery, Definition, Delivery, and Optimization - all in one platform.",
  keywords: [
    "AI skills",
    "product management",
    "Claude AI",
    "product lifecycle",
    "digital product team",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className="font-sans antialiased bg-white dark:bg-gray-950"
      >
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
