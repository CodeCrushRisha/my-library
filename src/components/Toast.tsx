"use client";

import { usePlan } from "@/context/PlanContext";

export default function Toast() {
  const { toast } = usePlan();
  if (!toast) return null;

  return (
    <div
      className={`fixed top-20 right-6 z-50 px-5 py-3 rounded-lg shadow-xl font-semibold text-sm text-black animate-in slide-in-from-top-2 duration-200 ${
        toast.type === "error" ? "bg-red-400" : "bg-lime-400"
      }`}
    >
      {toast.msg}
    </div>
  );
}