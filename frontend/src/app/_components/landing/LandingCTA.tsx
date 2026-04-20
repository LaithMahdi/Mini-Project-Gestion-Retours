import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingCTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="rounded-3xl border border-cyan-300/25 bg-linear-to-r from-slate-900 via-slate-900 to-cyan-950/30 p-8 text-center sm:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
          Pret a accelerer
        </p>
        <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-black text-white sm:text-4xl">
          Passez d une gestion reactive a une gestion pilotee par la donnee
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
          Connectez-vous et lancez vos operations de retour avec des workflows
          structurés, des permissions claires et une experience equipe fluide.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/login">
            <Button
              size="lg"
              className="rounded-full bg-cyan-500 px-8 font-semibold text-slate-950 hover:bg-cyan-400"
            >
              Se connecter
            </Button>
          </Link>
          <a
            href="#entities"
            className="inline-flex h-11 items-center rounded-full border border-slate-500 px-7 text-sm font-semibold text-white transition hover:border-slate-300 hover:bg-slate-800/70"
          >
            Voir l architecture
          </a>
        </div>
      </div>
    </section>
  );
}
