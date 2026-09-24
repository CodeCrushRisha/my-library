export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur border-t border-neutral-900">
      <div className="max-w-300 mx-auto px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo.png" alt="FitLog" className="h-5 w-auto" />
          <span className="font-display text-white text-base font-bold tracking-wide">
            FITLOG
          </span>
        </div>
        <p className="text-neutral-500 text-xs text-center">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}