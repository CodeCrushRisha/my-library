"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const linkClass = (href: string) =>
    `px-4 py-1.5 rounded-full text-sm font-medium transition ${
      pathname === href
        ? "bg-lime-400 text-black"
        : "text-gray-300 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-40 bg-black/95 backdrop-blur border-b border-neutral-900">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 py-3.5">
        <Link href="/" className="flex items-center gap-2">
          <img src="/assets/logo.png" alt="FitLog" className="h-7 w-auto" />
          <span className="font-display text-white text-xl font-bold tracking-wide">
            FITLOG
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <Link href="/" className={linkClass("/")}>
            Workouts
          </Link>
          <Link href="/my-plan" className={linkClass("/my-plan")}>
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <Link href="/my-plan" className="flex items-center gap-1.5">
            <span className="text-gray-400">Plan</span>
            <span className="bg-lime-400 text-black text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              {plan.length}
            </span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-1.5">
            <span className="text-gray-400">Saved</span>
            <span className="border border-neutral-700 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}