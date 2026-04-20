import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingNavbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-700/60 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="text-xl font-black tracking-tight text-white">
          RetourPro
        </div>

        <div className="hidden items-center gap-7 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-slate-300 transition hover:text-cyan-300"
          >
            Fonctionnalites
          </a>
          <a
            href="#entities"
            className="text-sm font-medium text-slate-300 transition hover:text-emerald-300"
          >
            Entites
          </a>
          <a
            href="#kpis"
            className="text-sm font-medium text-slate-300 transition hover:text-amber-300"
          >
            KPIs
          </a>
        </div>

        <Link href="/login">
          <Button className="rounded-full bg-cyan-500 px-5 text-slate-950 hover:bg-cyan-400">
            Connexion
          </Button>
        </Link>
      </div>
    </nav>
  );
}
