"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import type { SortKey } from "@/types/workout";

type Tab = "plan" | "saved";

function toNumber(val: unknown): number {
  if (typeof val === "number" && !isNaN(val)) return val;
  if (typeof val === "string") {
    const n = parseInt(val.replace(/[^\d]/g, ""), 10);
    return isNaN(n) ? 0 : n;
  }
  return 0;
}

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeFromSaved, markDone } = usePlan();
  const [tab, setTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortKey>("duration");

  const list = tab === "plan" ? plan : saved;

  const sortedList = useMemo(
    () => [...list].sort((a, b) => toNumber(b[sortBy]) - toNumber(a[sortBy])),
    [list, sortBy]
  );

  const totalMinutes = plan.reduce((s, w) => s + toNumber(w.duration), 0);
  const totalCalories = plan.reduce((s, w) => s + toNumber(w.calories), 0);

  const metrics: { label: string; value: number }[] = [
    { label: "Exercises", value: plan.length },
    { label: "Minutes", value: totalMinutes },
    { label: "Calories", value: totalCalories },
  ];

  return (
    <div className="max-w-300 mx-auto px-6 py-10">
      <h1 className="font-display text-white text-4xl font-bold uppercase tracking-wide">
        My Plan
      </h1>
      <p className="text-neutral-500 text-sm mt-2 mb-8">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="grid grid-cols-3 bg-neutral-950 border border-neutral-900 rounded-xl divide-x divide-neutral-900 mb-8">
        {metrics.map((m) => (
          <div key={m.label} className="p-6">
            <div className="text-neutral-500 text-xs mb-2">{m.label}</div>
            <div className="text-lime-400 font-display text-3xl font-bold">
              {m.value}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex bg-neutral-950 border border-neutral-900 rounded-md p-1 w-fit">
          <button
            onClick={() => setTab("plan")}
            className={`px-4 py-1.5 text-xs font-bold rounded ${
              tab === "plan"
                ? "bg-neutral-800 text-white"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setTab("saved")}
            className={`px-4 py-1.5 text-xs font-bold rounded ${
              tab === "saved"
                ? "bg-neutral-800 text-white"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-neutral-500 text-xs">Sort By</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="bg-neutral-950 border border-neutral-800 text-white text-xs px-3 py-2 rounded-md"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {sortedList.length === 0 ? (
        <div className="bg-neutral-950 border border-neutral-900 rounded-xl py-24 text-center">
          <h3 className="font-display text-white text-2xl font-bold uppercase tracking-wide mb-2">
            Nothing here yet
          </h3>
          <p className="text-neutral-500 text-sm mb-6">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="inline-block bg-lime-400 text-black text-xs font-bold tracking-widest px-5 py-3 rounded-md hover:bg-lime-300 transition"
          >
            GO TO WORKOUTS
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedList.map((w) => {
            const isDone = (w as { done?: boolean }).done === true;
            return (
              <div
                key={w.id}
                className="flex flex-col md:flex-row md:items-center gap-4 bg-neutral-950 border border-neutral-900 rounded-xl p-4"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={w.image}
                  alt={w.name}
                  className="w-full md:w-24 h-32 md:h-20 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h3
                    className={`font-display text-lg font-bold uppercase tracking-wide ${
                      isDone ? "text-neutral-600 line-through" : "text-white"
                    }`}
                  >
                    {w.name}
                  </h3>
                  <p className="text-neutral-500 text-xs">{w.equipment}</p>
                  <div className="flex items-center gap-4 text-xs text-neutral-400 mt-2">
                    <span>⏱ {toNumber(w.duration)} min</span>
                    <span>🔥 {toNumber(w.calories)} kcal</span>
                    <span>☆ {toNumber(w.rating)}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/workout/${w.id}`}
                    className="border border-neutral-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:border-lime-400 hover:text-lime-400 transition"
                  >
                    View Details
                  </Link>

                  {tab === "plan" && (
                    <>
                      <button
                        onClick={() => markDone(w.id)}
                        disabled={isDone}
                        className="bg-lime-400 text-black text-xs font-bold px-3 py-1.5 rounded-md disabled:opacity-40 hover:bg-lime-300 transition"
                      >
                        ✓ Mark as Done
                      </button>
                      <button
                        onClick={() => removeFromPlan(w.id)}
                        className="text-neutral-500 hover:text-red-400 text-lg px-2"
                        aria-label="Remove"
                      >
                        ✕
                      </button>
                    </>
                  )}

                  {tab === "saved" && (
                    <button
                      onClick={() => removeFromSaved(w.id)}
                      className="text-neutral-500 hover:text-red-400 text-lg px-2"
                      aria-label="Remove"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}