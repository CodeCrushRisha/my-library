import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import { PlanProvider } from "@/context/PlanContext";

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "Dark, no-nonsense gym companion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-white min-h-screen flex flex-col">
        <PlanProvider>
          <Navbar />
          {/* pb-20 = footer er height-er soman padding bottom */}
          <main className="flex-1 pb-20">{children}</main>
          <Footer />
          <Toast />
        </PlanProvider>
      </body>
    </html>
  );
}