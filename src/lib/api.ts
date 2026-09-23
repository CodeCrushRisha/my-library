import type { Workout } from "@/types/workout";

const BASE = "https://api.abcz.workers.dev/api/fitlog";

export async function getAllWorkouts(): Promise<Workout[]> {
  const res = await fetch(BASE, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch workouts");
  const data: unknown = await res.json();

  if (Array.isArray(data)) return data as Workout[];
  if (data && typeof data === "object" && "workouts" in data) {
    return (data as { workouts: Workout[] }).workouts;
  }
  return [];
}

export async function getWorkoutById(id: string): Promise<Workout> {
  const res = await fetch(`${BASE}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Workout not found");
  return (await res.json()) as Workout;
}