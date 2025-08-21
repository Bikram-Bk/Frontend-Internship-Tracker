import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./Home/Navbar";
import Footer from "./Home/Footer";
import "../styles/globals.css";
import QueryProvider from "./provider/query_provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./context/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Internship Issue Tracker",
  description: "A simple issue tracking application for internships",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <QueryProvider>
          <AuthProvider>
            <Navbar />
            <Toaster />
            <main className="flex-grow container mx-auto p-4">{children}</main>
            <Footer />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
