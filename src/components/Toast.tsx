"use client";

import { usePlan } from "@/context/PlanContext";

export default function Toast() {
  const { toast } = usePlan();
  if (!toast) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-lg shadow-xl font-semibold text-sm text-black ${
        toast.type === "error" ? "bg-red-400" : "bg-lime-400"
      }`}
    >
      {toast.msg}
    </div>
  );
}