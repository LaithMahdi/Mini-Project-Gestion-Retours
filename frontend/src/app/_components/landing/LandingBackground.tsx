export default function LandingBackground() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-28 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-0 top-96 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute -left-20 bottom-20 h-72 w-72 rounded-full bg-amber-400/15 blur-3xl" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]" />
    </>
  );
}
