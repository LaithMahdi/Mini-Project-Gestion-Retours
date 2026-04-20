"use client";

import { Button } from "@/components/ui/button";
import { LockPasswordIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import FriendlyBackground from "@/components/shared/FriendlyBackground";

const page = () => {
  const router = useRouter();
  return (
    <FriendlyBackground>
      <section className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg text-center">
          <div className="mb-8">
            <div className="text-7xl font-semibold text-rose-500 mb-4">403</div>
            <h1 className="text-4xl font-semibold text-slate-900 dark:text-white mb-2">
              Acces refuse
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Vous n'avez pas les permissions necessaires pour acceder a cette
              ressource.
            </p>
          </div>

          <div className="mb-8 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/70 bg-white/80 text-rose-500 shadow-sm shadow-slate-200/40 backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
              <HugeiconsIcon icon={LockPasswordIcon} className="size-9" />
            </div>
          </div>

          <div className="mb-10 rounded-3xl border border-white/70 bg-white/80 p-6 text-left shadow-[0_25px_80px_-40px_rgba(15,23,42,0.35)] backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
            <p className="text-slate-700 dark:text-slate-200 text-sm">
              Votre role utilisateur n'inclut pas les permissions requises pour
              acceder a cette section. Contactez votre administrateur si vous
              pensez que c'est une erreur.
            </p>
          </div>

          <div className="flex flex-col gap-3">
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

          <div className="mt-8 pt-6 text-sm text-slate-500 dark:text-slate-300">
            Besoin d'aide?
            <a
              href="mailto:support@retourpro.com"
              className="ml-1 font-medium text-sky-600 transition hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300"
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
