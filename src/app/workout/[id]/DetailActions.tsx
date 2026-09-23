"use client";

import { usePlan } from "@/context/PlanContext";
import type { Workout } from "@/types/workout";

interface DetailActionsProps {
  workout: Workout;
}

export default function DetailActions({ workout }: DetailActionsProps) {
  const { addToPlan, saveForLater, plan } = usePlan();
  const disabled = plan.length >= 5;

  return (
    <div className="flex flex-wrap gap-3 pt-2">
      <button
        onClick={() => addToPlan(workout)}
        disabled={disabled}
        className="bg-lime-400 text-black text-xs font-bold tracking-widest px-5 py-3 rounded-md disabled:opacity-40 flex items-center gap-2 hover:bg-lime-300 transition"
      >
        <span>➕</span>
        {disabled ? "PLAN FULL (5/5)" : "ADD TO TODAY'S PLAN"}
      </button>

      <button
        onClick={() => saveForLater(workout)}
        className="border border-neutral-700 text-white text-xs font-bold tracking-widest px-5 py-3 rounded-md flex items-center gap-2 hover:border-lime-400 hover:text-lime-400 transition"
      >
        <span>🔖</span> SAVE FOR LATER
      </button>
    </div>
  );
}