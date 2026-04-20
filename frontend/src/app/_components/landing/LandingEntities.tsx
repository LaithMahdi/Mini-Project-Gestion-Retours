import { ENTITIES } from "@/constants";
import { HugeiconsIcon } from "@hugeicons/react";

export default function LandingEntities() {
  return (
    <section id="entities" className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">
          Architecture metier
        </p>
        <h2 className="mt-3 text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">
          Entites du systeme
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {ENTITIES.map((entity, index) => (
          <article
            key={entity.title}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700/70 bg-slate-50 dark:bg-slate-900/60 p-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
            style={{ animationDelay: `${index * 120}ms` }}
          >
            <div
              className={`absolute inset-x-0 top-0 h-24 bg-linear-to-b ${entity.accent} opacity-70`}
            />
            <div className="relative z-10">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white transition group-hover:scale-105">
                <HugeiconsIcon
                  icon={entity.icon}
                  size={22}
                  color="currentColor"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {entity.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {entity.description}
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                {entity.points.map((point) => (
                  <li key={point}>- {point}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
