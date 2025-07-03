import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "@/providers/Providers";
import ProvidersWrapper from "@/providers/ProvidersWrapper";

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "CineVerse - Explore the Latest and Popular Movies",
  description: "Discover a wide selection of movies at CineVerse. Browse through new releases, popular films, and find your next favorite movie with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} >
      <body className="antialiased min-h-screen bg-background font-sans text-foreground" suppressHydrationWarning>
        <div>
          <ProvidersWrapper>{children}</ProvidersWrapper>
        </div>
      </body>
    </html>
  );
}
