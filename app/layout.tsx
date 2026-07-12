import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "TaxScheduler — Scheduling + Document Tracking for Tax Preparers",
  description:
    "Calendly-style booking with per-appointment document checklists, Kanban status boards, and automated client nudges — built exclusively for tax preparers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans min-h-screen flex flex-col">
        {children}
        <Footer />
      </body>
    </html>
  );
}
