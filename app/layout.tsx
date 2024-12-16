import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { RequestProvider, ToastContextProvider } from "./context/DataContext";

import ProtectedRoute from "@/components/ProtectedRoute";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SideBar } from "@/components/SideBar";
import { UserProvider } from "./context/UserContext";
import { WorkflowProvider } from "./context/WorkflowContext";

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
          <UserProvider>
            <ProtectedRoute requiredRoles={["admin", "user"]}>
              <Navbar />

              <div>
                <ToastContextProvider>
                  <SidebarProvider>
                    <SideBar />
                    <SidebarTrigger />
                    <WorkflowProvider>
                      <RequestProvider>{children}</RequestProvider>
                    </WorkflowProvider>
                  </SidebarProvider>
                </ToastContextProvider>
              </div>
            </ProtectedRoute>
          </UserProvider>
        </main>
      </body>
    </html>
  );
}
