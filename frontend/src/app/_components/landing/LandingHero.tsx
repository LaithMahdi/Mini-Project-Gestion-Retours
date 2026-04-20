import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingHero() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-18 pt-16 text-center md:pt-24">
      <p className="mx-auto mb-6 inline-flex animate-in fade-in-0 slide-in-from-top-2 duration-700 rounded-full border border-cyan-300/30 dark:border-cyan-300/30 bg-cyan-300/10 dark:bg-cyan-300/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-700 dark:text-cyan-200">
        Plateforme operationnelle des retours
      </p>

      <h1 className="mx-auto max-w-5xl animate-in fade-in-0 slide-in-from-bottom-4 duration-700 text-balance text-4xl font-black leading-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
        Gestion des retours produits, non-conformites et historique
        <span className="block bg-linear-to-r from-cyan-600 dark:from-cyan-300 via-emerald-600 dark:via-emerald-300 to-amber-600 dark:to-amber-300 bg-clip-text text-transparent">
          dans une seule interface pro
        </span>
      </h1>

      <p className="mx-auto mt-6 max-w-3xl animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-150 text-pretty text-base text-slate-600 dark:text-slate-300 sm:text-lg">
        Suivez chaque action en temps reel, appliquez les permissions par role
        et gardez une tracabilite complete de la chaine de traitement.
      </p>

      <div className="mt-10 flex animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-300 flex-wrap items-center justify-center gap-3">
        <Link href="/login">
          <Button
            size="lg"
            className="rounded-full bg-cyan-500 px-8 font-semibold text-white dark:text-slate-950 hover:bg-cyan-400"
          >
            Commencer maintenant
          </Button>
        </Link>
        <a
          href="#features"
          className="inline-flex h-11 items-center rounded-full border border-slate-300 dark:border-slate-600 px-7 text-sm font-semibold text-slate-900 dark:text-slate-200 transition hover:border-slate-400 dark:hover:border-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/70"
        >
          Explorer les fonctionnalites
        </a>
      </div>
    </section>
  );
}
