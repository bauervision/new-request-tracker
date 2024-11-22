import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { RequestProvider } from "./context";
import RequestTrackerNavBar from "./requests/RequestTrackerNavBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Catena",
  description: "Next Generation Integrated Logistics Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>
          <Navbar />
          <div className="mx-auto ">
            <RequestProvider>
              <div className="bg-slate-300">
                <RequestTrackerNavBar />
                <div className=" container flex flex-row justify-center items-center flex-wrap gap-4 py-2">
                  {children}
                </div>
              </div>
            </RequestProvider>
          </div>
        </main>
      </body>
    </html>
  );
}
