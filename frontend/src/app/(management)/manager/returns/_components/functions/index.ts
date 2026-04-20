import { ETAT_TRAITEMENT_META } from "../types";
import { RETURNS_ENDPOINT } from "@/config";
import apiClient from "@/lib/api-client";

type ReturnApiResponse<T> = {
  data?: T;
};

export async function fetchReturnById(id: string) {
  return apiClient.get(`${RETURNS_ENDPOINT}/${id}`);
}

export function extractReturnItem<T>(response: ReturnApiResponse<T>): T {
  if (!response?.data) {
    throw new Error("Retour non trouvé");
  }

  return response.data;
}

export function getEtatTraitementMeta(value: string) {
  return (
    ETAT_TRAITEMENT_META[value] ?? {
      label: value,
      className: "border-slate-400/30 bg-slate-500/10 text-slate-300",
    }
  );
}
