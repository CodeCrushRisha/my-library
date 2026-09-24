"use client";

import { useEffect, useMemo, useState } from "react";
import WorkoutCard from "./WorkoutCard";
import LoadingSpinner from "./LoadingSpinner";
import { getAllWorkouts } from "@/lib/api";
import type { SortKey, Workout } from "@/types/workout";

// Safe number parser
function toNumber(val: unknown): number {
  if (typeof val === "number" && !isNaN(val)) return val;
  if (typeof val === "string") {
    const n = parseInt(val.replace(/[^\d]/g, ""), 10);
    return isNaN(n) ? 0 : n;
  }
  return 0;
}

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortKey>("duration");

  useEffect(() => {
    getAllWorkouts()
      .then(setWorkouts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // ✅ Sort logic — highest value first
  const sorted = useMemo(() => {
    const copy = [...workouts];
    return copy.sort((a, b) => {
      const aVal = toNumber(a[sortBy]);
      const bVal = toNumber(b[sortBy]);
      return bVal - aVal; // descending (highest first)
    });
  }, [workouts, sortBy]);

  return (
    <section id="library" className="max-w-300 mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-white text-4xl font-bold uppercase tracking-wide">
            The Library
          </h2>
          <p className="text-neutral-500 text-sm mt-2">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-neutral-500 text-xs font-medium whitespace-nowrap">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="bg-neutral-950 border border-neutral-800 text-white text-xs px-3 py-2 rounded-md cursor-pointer hover:border-lime-400/40 transition focus:outline-none focus:border-lime-400"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : sorted.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-white text-xl font-bold">No workouts found</h3>
          <p className="text-neutral-500 mt-2">Try refreshing the page.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      )}
    </section>
  );
}