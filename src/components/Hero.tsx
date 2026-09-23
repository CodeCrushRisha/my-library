export default function Hero() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 pt-8">
      <div className="bg-neutral-950 border border-neutral-900 rounded-2xl grid md:grid-cols-[1.3fr_1fr] gap-8 items-center p-8 md:p-12 overflow-hidden">
        <div>
          <p className="text-lime-400 text-[11px] tracking-[0.25em] font-bold mb-4">
            WORKOUT LIBRARY
          </p>
          <h1 className="font-display text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] uppercase">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="text-neutral-400 mt-5 max-w-md text-sm leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="inline-block mt-7 bg-lime-400 text-black text-xs font-bold tracking-widest px-6 py-3 rounded-md hover:bg-lime-300 transition"
          >
            BROWSE WORKOUTS
          </a>
        </div>
        <div className="relative flex justify-center">
          <img
            src="/assets/banner.png"
            alt="Workout illustration"
            className="max-h-[340px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}