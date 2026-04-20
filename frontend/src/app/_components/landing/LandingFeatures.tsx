const features = [
  {
    title: "Workflow CRUD complet",
    description:
      "Creation, edition, suppression et consultation avec validation front-back coherente.",
  },
  {
    title: "Filtrage et pagination",
    description:
      "Navigation fluide sur de gros volumes de donnees grace aux filtres metiers et pages serveur.",
  },
  {
    title: "Securite par roles",
    description:
      "Les actions sensibles sont verrouillees selon le role avec controles middleware + UI.",
  },
  {
    title: "Historique auditable",
    description:
      "Chaque action est tracee pour un suivi qualite fiable et une analyse retrospective rapide.",
  },
];

export default function LandingFeatures() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
          Valeur produit
        </p>
        <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
          Fonctionnalites principales
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-slate-700/70 bg-gradient-to-br from-slate-900/80 to-slate-950 p-7 animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
            style={{ animationDelay: `${index * 120}ms` }}
          >
            <h3 className="text-lg font-bold text-white">{feature.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
