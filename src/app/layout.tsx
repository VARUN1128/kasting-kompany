import type { Metadata } from "next";
import { Archivo_Black, Work_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "KASTING KOMPANY — BRUTALIST CREATIVE NETWORK FOR INDIAN CINEMA",
  description: "Raw, unapologetic professional network for India's creative industry. Build your identity. Get cast.",
  keywords: ["Casting India", "Malayalam Cinema", "Tamil Cinema", "Brutalist Casting", "Actors Network"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivoBlack.variable} ${workSans.variable} ${spaceMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-black font-sans selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}
