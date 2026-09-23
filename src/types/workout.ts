export interface Workout {
  id: string | number;
  name: string;
  description: string;
  image: string;
  category: string | string[];
  equipment: string;
  difficulty: string;
  sets: number;
  reps: string;
  duration: number;
  calories: number;
  rating: number;
  instructions: string[];
}

export interface PlanWorkout extends Workout {
  done: boolean;
}

export type SortKey = "duration" | "calories" | "rating";

export interface ToastState {
  msg: string;
  type: "success" | "error";
}