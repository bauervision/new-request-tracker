import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { RequestProvider, ToastContextProvider } from "./context";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SideBar } from "@/components/SideBar";

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

          <div>
            <ToastContextProvider>
              <SidebarProvider>
                <SideBar />
                <SidebarTrigger />
                <RequestProvider>{children}</RequestProvider>
              </SidebarProvider>
            </ToastContextProvider>
          </div>
        </main>
      </body>
    </html>
  );
}
