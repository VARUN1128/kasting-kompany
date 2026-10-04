import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kasting Kompany — Where Creative Careers Move",
  description: "The professional network for India's creative industry. Where talent builds a living portfolio and casting professionals find the right people faster.",
  keywords: ["Casting India", "Malayalam Cinema", "Tamil Cinema", "Telugu Cinema", "Bollywood", "Actors Network", "Casting Directors"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} dark h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-[#08090C] text-[#F3F4F6] font-sans selection:bg-[#E05638] selection:text-white">
        {children}
      </body>
    </html>
  );
}
