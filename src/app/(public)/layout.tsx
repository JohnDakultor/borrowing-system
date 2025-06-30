import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const year = new Date().getFullYear();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Borrowing System",
  description: "A modern borrowing system to track and manage checkouts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="flex min-h-screen flex-col">
          {/* Header */}
          <header className="w-full border-b bg-white/70 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <h1 className="text-xl font-semibold tracking-tight">
                Borrowing System
              </h1>
              {/* <nav className="space-x-4 text-sm font-medium">
                <a href="/" className="hover:underline">
                  Home
                </a>
                <a href="#" className="hover:underline">
                  About
                </a>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </nav> */}
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer className="w-full border-t bg-white/70 backdrop-blur-md mt-16">
            <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-muted-foreground">
              © {year} Borrowly. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
