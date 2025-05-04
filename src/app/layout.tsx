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
  title: "PiRhoTech | Digital Innovation Agency",
  description: "Web. Apps. Growth. Designed to scale your business.",
  keywords: [
    "digital agency",
    "web development",
    "app development",
    "SEO",
    "branding",
    "PiRhoTech",
  ],
  authors: [{ name: "PiRhoTech Agency" }],
  creator: "PiRhoTech Agency",
  openGraph: {
    title: "PiRhoTech | Digital Innovation Agency",
    description: "Web. Apps. Growth. Designed to scale your business.",
    url: "https://pirhotech.com",
    siteName: "PiRhoTech",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
