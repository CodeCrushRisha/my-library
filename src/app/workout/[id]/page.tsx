import { notFound } from "next/navigation";
import { getWorkoutById } from "@/lib/api";
import DetailActions from "./DetailActions";
import type { Workout } from "@/types/workout";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkoutDetail({ params }: PageProps) {
  const { id } = await params;

  let workout: Workout;
  try {
    workout = await getWorkoutById(id);
  } catch {
    notFound();
  }

  const cats = Array.isArray(workout.category)
    ? workout.category
    : [workout.category];

  const specs: [string, string | number][] = [
    ["EQUIPMENT", workout.equipment],
    ["DIFFICULTY", workout.difficulty],
    ["SETS", workout.sets],
    ["REPS", workout.reps],
    ["DURATION", `${workout.duration} min`],
    ["CALORIES", `${workout.calories} kcal`],
    ["RATING", workout.rating],
  ];

  return (
    <div className="max-w-300 mx-auto px-6 py-10">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* LEFT: Image */}
        <div className="rounded-2xl overflow-hidden border border-neutral-900 bg-neutral-950">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={workout.image}
            alt={workout.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT: Content */}
        <div className="space-y-6">
          <h1 className="font-display text-white text-4xl md:text-5xl font-bold uppercase tracking-wide leading-none">
            {workout.name}
          </h1>

          <p className="text-neutral-400 text-sm leading-relaxed">
            {workout.description}
          </p>

          {/* Category tags — FIXED with unique key */}
          <div className="flex gap-2 flex-wrap">
            {cats.map((c, i) => (
              <span
                key={`${c}-${i}`}
                className="text-[10px] font-bold bg-lime-400 text-black px-2.5 py-1 rounded-sm uppercase tracking-wider"
              >
                {c}
              </span>
            ))}
          </div>

          {/* Specs Panel */}
          <div className="bg-neutral-950 border border-neutral-900 rounded-xl divide-y divide-neutral-900">
            {specs.map(([k, v]) => (
              <div key={k} className="flex justify-between px-5 py-3 text-sm">
                <span className="text-neutral-500 uppercase tracking-widest text-xs font-semibold">
                  {k}
                </span>
                <span className="text-white font-semibold text-sm">{v}</span>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-lime-400 text-xs font-bold tracking-[0.2em] mb-3">
              INSTRUCTIONS
            </h3>
            <ol className="space-y-2 text-neutral-300 text-sm">
              {workout.instructions?.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-lime-400 font-bold min-w-4">
                    {i + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Action Buttons */}
          <DetailActions workout={workout} />
        </div>
      </div>
    </div>
  );
}