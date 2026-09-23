import Link from "next/link";
import type { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  const cats = Array.isArray(workout.category)
    ? workout.category
    : [workout.category];

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group bg-neutral-950 border border-neutral-900 rounded-xl overflow-hidden hover:border-lime-400/40 transition"
    >
      <div className="aspect-16/10 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workout.image}
          alt={workout.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

      <div className="p-4 space-y-2.5">
        <div className="flex gap-1.5 flex-wrap">
          {cats.map((c, i) => (
            <span
              key={`${c}-${i}`}
              className="text-[10px] font-bold bg-lime-400 text-black px-2 py-0.5 rounded-sm uppercase tracking-wider"
            >
              {c}
            </span>
          ))}
        </div>

        <h3 className="font-display text-white text-lg font-bold uppercase tracking-wide leading-tight">
          {workout.name}
        </h3>
        <p className="text-neutral-500 text-xs">{workout.equipment}</p>

        <div className="flex items-center gap-4 text-xs text-neutral-400 pt-1">
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full border border-neutral-700 flex items-center justify-center text-[8px]">
              ⏱
            </span>
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full border border-neutral-700 flex items-center justify-center text-[8px]">
              🔥
            </span>
            {workout.calories} kcal
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full border border-neutral-700 flex items-center justify-center text-[8px]">
              ☆
            </span>
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}