import { ETAT_TRAITEMENT_OPTIONS } from "@/constants";
import { z } from "zod";

export const ETAT_TRAITEMENT_FORM_OPTIONS = ETAT_TRAITEMENT_OPTIONS.filter(
  (option) => option.value !== "ALL",
);

export const returnFormSchema = z.object({
  client: z.string().trim().min(1, "Le client est requis"),
  produit: z.string().trim().min(1, "Le produit est requis"),
  raison: z.string().trim().min(1, "La raison du retour est requise"),
  etatTraitement: z
    .string()
    .refine(
      (value) =>
        ETAT_TRAITEMENT_FORM_OPTIONS.some((option) => option.value === value),
      "Etat du traitement invalide",
    ),
  date: z.string().min(1, "La date est requise"),
});
