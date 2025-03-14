import { Toaster } from "@/Components/ui/sonner"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import './Frame.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "airena",
  description: "The next generation streaming platform for gamers and sports enthusiasts. ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
