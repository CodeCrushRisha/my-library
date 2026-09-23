"use client";

import { useEffect, useMemo, useState } from "react";
import WorkoutCard from "./WorkoutCard";
import LoadingSpinner from "./LoadingSpinner";
import { getAllWorkouts } from "@/lib/api";
import type { SortKey, Workout } from "@/types/workout";

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

  const sorted = useMemo(
    () => [...workouts].sort((a, b) => (b[sortBy] ?? 0) - (a[sortBy] ?? 0)),
    [workouts, sortBy]
  );

  return (
    <section id="library" className="max-w-[1200px] mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-white text-4xl font-bold uppercase tracking-wide">
            The Library
          </h2>
          <p className="text-neutral-500 text-sm mt-2">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortKey)}
          className="bg-neutral-950 border border-neutral-800 text-white text-xs px-3 py-2 rounded-md"
        >
          <option value="duration">Sort By: Duration</option>
          <option value="calories">Sort By: Calories</option>
          <option value="rating">Sort By: Rating</option>
        </select>
      </div>

      {loading ? (
        <LoadingSpinner />
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