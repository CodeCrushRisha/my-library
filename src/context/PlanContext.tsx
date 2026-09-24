"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { PlanWorkout, ToastState, Workout } from "@/types/workout";

interface PlanContextValue {
  plan: PlanWorkout[];
  saved: Workout[];
  toast: ToastState | null;
  addToPlan: (w: Workout) => void;
  saveForLater: (w: Workout) => void;
  removeFromPlan: (id: string | number) => void;
  removeFromSaved: (id: string | number) => void;
  markDone: (id: string | number) => void;
}

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanWorkout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [toast, setToast] = useState<ToastState | null>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    try {
      const p = JSON.parse(localStorage.getItem("mylib_plan") || "[]");
      const s = JSON.parse(localStorage.getItem("mylib_saved") || "[]");
      setPlan(p);
      setSaved(s);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    localStorage.setItem("mylib_plan", JSON.stringify(plan));
    localStorage.setItem("mylib_saved", JSON.stringify(saved));
  }, [plan, saved]);

  const showToast = (msg: string, type: ToastState["type"] = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const addToPlan = (w: Workout) => {
    if (plan.length >= 5)
      return showToast("⚠️ Plan is full (max 5)", "error");
    if (plan.some((x) => x.id === w.id))
      return showToast("❌ Already in plan", "error");
    setPlan([...plan, { ...w, done: false }]);
    showToast("✅ Added to today's plan");
  };

  const saveForLater = (w: Workout) => {
    if (saved.some((x) => x.id === w.id))
      return showToast("❌ Already saved", "error");
    setSaved([...saved, w]);
    showToast("✅ Saved for later");
  };

  const removeFromPlan = (id: string | number) => {
    setPlan(plan.filter((x) => x.id !== id));
    showToast("🗑️ Removed from plan");
  };

  const removeFromSaved = (id: string | number) => {
    setSaved(saved.filter((x) => x.id !== id));
    showToast("🗑️ Removed from saved");
  };

  const markDone = (id: string | number) => {
    setPlan(plan.map((x) => (x.id === id ? { ...x, done: true } : x)));
    showToast("💪 Marked as done");
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        toast,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
        markDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan(): PlanContextValue {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside PlanProvider");
  return ctx;
}