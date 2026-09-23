export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-3">
      <div className="w-10 h-10 border-2 border-lime-400 border-t-transparent rounded-full animate-spin" />
      <p className="text-neutral-500 text-sm">Loading workouts…</p>
    </div>
  );
}