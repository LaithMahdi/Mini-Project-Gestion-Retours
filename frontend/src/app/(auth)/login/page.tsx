"use client";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import { useSessionStore } from "@/stores/use_session_store";
import { LoginForm } from "./_components/LoginForm";
import { LoginFormData } from "./_components/schema";
import { APP_NAME } from "@/constants";
import FriendlyBackground from "@/components/shared/FriendlyBackground";
import {
  COOKIE_TOKEN_KEY,
  COOKIE_USER_ROLE_KEY,
  LOGIN_ENDPOINT,
  NODE_ENV,
} from "@/config";
import { LoginApiResponse } from "./_components/interfaces";
import { decodeJWT, getCookieExpiryDate } from "@/lib/utils";

const page = () => {
  const router = useRouter();
  const { setLoggedIn, setCurrentUser } = useSessionStore();

  const loginMutation = useMutation({
    mutationFn: async (payload: LoginFormData) => {
      const response = await apiClient.post<LoginApiResponse>(LOGIN_ENDPOINT, {
        email: payload.email,
        password: payload.password,
      });

      if (!response.data?.data?.token || !response.data?.data?.user) {
        throw new Error("Invalid login response");
      }

      return response.data.data;
    },
    onSuccess: (data) => {
      const user = data.user;
      const { exp } = decodeJWT(data.token);
      const cookieExpires = getCookieExpiryDate(exp);

      setLoggedIn(true);
      setCurrentUser({
        email: user.email,
        exp: exp ?? Math.floor(Date.now() / 1000),
        id: user.id,
        role: user.role,
      });

      Cookies.set(COOKIE_TOKEN_KEY, data.token, {
        expires: cookieExpires,
        sameSite: "lax",
        secure: NODE_ENV === "production",
      });

      if (user.role) {
        Cookies.set(COOKIE_USER_ROLE_KEY, user.role, {
          expires: cookieExpires,
          sameSite: "lax",
          secure: NODE_ENV === "production",
        });
      }

      toast.success("Connexion réussie");
      router.push("/manager/returns");
    },
    onError: () => {
      toast.error("Erreur lors de la connexion");
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    await loginMutation.mutateAsync(data);
  };

  return (
    <FriendlyBackground>
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12 lg:flex-row lg:items-center justify-center lg:min-h-screen">
        <section className="lg:w-1/2 animate-[fade-up_700ms_ease-out]">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-sm shadow-slate-200/40 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            Portail securise
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Bienvenue sur{" "}
            <span className="text-sky-600 dark:text-sky-400">{APP_NAME}</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-slate-600 dark:text-slate-300">
            Un espace clair et convivial pour suivre vos retours, gagner du
            temps et garder une vue d'ensemble sur chaque dossier.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Acces rapide a vos retours",
              "Suivi en temps reel",
              "Historique toujours visible",
              "Equipe synchronisee",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm shadow-slate-200/40 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-300">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-300">
              o
            </span>
            Connectez-vous pour reprendre votre activite exactement la ou vous
            l'avez laissee.
          </div>
        </section>

        <section className="lg:w-1/2 animate-[fade-up_900ms_ease-out]">
          <div className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.5)] backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
            <LoginForm
              onSubmit={handleLogin}
              isLoading={loginMutation.isPending}
            />
            <div className="mt-6 rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              Besoin d aide ? Contactez votre responsable pour reinitialiser
              votre acces.
            </div>
          </div>
        </section>
      </div>
    </FriendlyBackground>
  );
};

export default page;
