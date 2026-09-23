import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
      <h1 className="font-display text-lime-400 text-8xl font-bold">404</h1>
      <h2 className="font-display text-white text-2xl font-bold uppercase mt-4 tracking-wide">
        Rep Not Found
      </h2>
      <p className="text-neutral-500 mt-3 max-w-md text-sm">
        That page skipped leg day and disappeared. Let&apos;s get you back to the
        gym floor.
      </p>
      <Link
        href="/"
        className="mt-6 bg-lime-400 text-black text-xs font-bold tracking-widest px-6 py-3 rounded-md hover:bg-lime-300 transition"
      >
        BACK TO LIBRARY
      </Link>
    </div>
  );
}