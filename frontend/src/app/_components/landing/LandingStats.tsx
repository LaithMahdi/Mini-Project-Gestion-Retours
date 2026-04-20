const kpis = [
  { value: "100%", label: "Tracabilite des actions", color: "text-cyan-300" },
  {
    value: "24/7",
    label: "Disponibilite operationnelle",
    color: "text-amber-300",
  },
  {
    value: "-40%",
    label: "Delai moyen de traitement",
    color: "text-emerald-300",
  },
  { value: "4", label: "Roles metiers geres", color: "text-fuchsia-300" },
];

export default function LandingStats() {
  return (
    <section id="kpis" className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid grid-cols-1 gap-4 rounded-3xl border border-slate-700/70 bg-slate-900/55 p-6 sm:grid-cols-2 lg:grid-cols-4 lg:p-8">
        {kpis.map((kpi, index) => (
          <div
            key={kpi.label}
            className="rounded-2xl border border-slate-700/60 bg-slate-950/70 p-5 text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <p className={`text-4xl font-black ${kpi.color}`}>{kpi.value}</p>
            <p className="mt-2 text-sm text-slate-300">{kpi.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
