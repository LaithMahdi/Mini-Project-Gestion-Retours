"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkBadge03Icon, Search02Icon } from "@hugeicons/core-free-icons";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import FriendlyBackground from "@/components/shared/FriendlyBackground";

const page = () => {
  const router = useRouter();

  return (
    <FriendlyBackground>
      <section className="mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/70 bg-white/80 text-sky-600 shadow-sm shadow-slate-200/40 backdrop-blur dark:border-white/10 dark:bg-slate-900/70 dark:text-sky-300">
              <HugeiconsIcon icon={Search02Icon} className="size-12" />
            </div>
          </div>

          <div className="mb-4">
            <span className="text-7xl font-semibold text-transparent bg-clip-text bg-linear-to-r from-sky-500 to-blue-600">
              404
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white mb-4">
            Page non trouvée
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            Desole, la page que vous recherchez n'existe pas ou a ete deplacee.
            Verifiez l'URL et reessayez.
          </p>

          <div className="rounded-3xl border border-white/70 bg-white/80 p-6 text-left shadow-[0_25px_80px_-40px_rgba(15,23,42,0.35)] backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
            <p className="text-slate-700 dark:text-slate-200 text-sm font-semibold">
              Suggestions
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={CheckmarkBadge03Icon}
                  className="size-5 text-sky-500"
                />
                Verifiez l'URL pour les erreurs de frappe
              </li>
              <li className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={CheckmarkBadge03Icon}
                  className="size-5 text-sky-500"
                />
                Verifiez que vous avez les permissions d'acces
              </li>
              <li className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={CheckmarkBadge03Icon}
                  className="size-5 text-sky-500"
                />
                Retournez a l'accueil et naviguez a nouveau
              </li>
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              className="rounded-full bg-sky-600 text-white shadow-lg shadow-sky-500/25 transition hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400"
              onClick={() => router.push("/")}
            >
              Retour a l'accueil
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-sky-200 text-sky-700 hover:bg-sky-50 dark:border-sky-500/40 dark:text-sky-200 dark:hover:bg-sky-500/10"
              onClick={() => router.push("/login")}
            >
              Se reconnecter
            </Button>
          </div>

          <div className="mt-10 pt-6 text-sm text-slate-500 dark:text-slate-300">
            Besoin d'aide?{" "}
            <a
              href="mailto:support@retourpro.com"
              className="font-medium text-sky-600 transition hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300"
            >
              Contactez le support
            </a>
          </div>
        </div>
      </section>
    </FriendlyBackground>
  );
};

export default page;
