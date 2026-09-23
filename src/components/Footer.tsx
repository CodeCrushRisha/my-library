export default function Footer() {
  return (
    <footer className="bg-black border-t border-neutral-900 mt-20">
      <div className="max-w-[1200px] mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          <img src="/assets/logo.png" alt="FitLog" className="h-6 w-auto" />
          <span className="font-display text-white text-lg font-bold tracking-wide">
            FITLOG
          </span>
        </div>
        <p className="text-neutral-500 text-xs">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}