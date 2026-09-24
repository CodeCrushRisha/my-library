import type { Workout } from "@/types/workout";

const BASE = "https://api.abcz.workers.dev/api/fitlog";

// Normalize raw API response to our internal Workout shape
function normalize(raw: unknown): Workout {
  const r = raw as Record<string, unknown>;

  const groups = r.muscleGroups ?? r.category ?? [];
  const category = Array.isArray(groups) ? groups : [groups];

  const num = (v: unknown): number => {
    if (typeof v === "number" && !isNaN(v)) return v;
    if (typeof v === "string") {
      const n = parseInt(v.replace(/[^\d]/g, ""), 10);
      return isNaN(n) ? 0 : n;
    }
    return 0;
  };

  return {
    id: (r.id as string | number) ?? Date.now(),
    name: (r.name as string) ?? "Unknown",
    description: (r.description as string) ?? "",
    image: (r.image as string) ?? "",
    muscleGroups: category.map(String),
    category,
    equipment: (r.equipment as string) ?? "Bodyweight",
    difficulty: (r.difficulty as string) ?? "Beginner",
    sets: num(r.sets),
    reps: (r.reps as string) ?? "10",
    duration: num(r.duration),
    calories: num(r.caloriesBurned ?? r.calories), // 👈 KEY FIX
    caloriesBurned: num(r.caloriesBurned),
    rating: num(r.rating),
    instructions: Array.isArray(r.instructions)
      ? (r.instructions as string[])
      : [],
  };
}

export async function getAllWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch(BASE, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch workouts");
    const data: unknown = await res.json();

    let list: unknown[] = [];
    if (Array.isArray(data)) list = data;
    else if (data && typeof data === "object" && "workouts" in data) {
      list = (data as { workouts: unknown[] }).workouts;
    }

    return list.map(normalize);
  } catch (err) {
    console.error("API failed:", err);
    return [];
  }
}

export async function getWorkoutById(id: string): Promise<Workout> {
  const res = await fetch(`${BASE}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Workout not found");
  const data = await res.json();
  return normalize(data);
}