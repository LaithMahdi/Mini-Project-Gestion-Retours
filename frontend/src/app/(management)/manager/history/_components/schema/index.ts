import { z } from "zod";

export const historySchema = z.object({
  retourId: z.string().min(1, "Le retourId doit être un nombre positif"),
  action: z.string().min(2, "L'action doit comporter au moins 2 caractères"),
  employeId: z.string().min(1, "L'employeId est requis"),
  date: z
    .string()
    .min(1, "La date est requise")
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "La date doit être au format ISO 8601",
    }),
});

export type HistoryFormData = z.infer<typeof historySchema>;

export const raisons = [
  "Produit reçu et enregistré",
  "Inspection initiale complétée",
  "Analysé pour défauts",
  "En cours de diagnostic technique",
  "Approuvé pour remboursement",
  "Rejeté - produit en bon état",
  "Envoyé au dépôt de remplacement",
  "Traitement des documents en cours",
  "Confirmation de remboursement envoyée",
  "Attente de collecte par client",
  "Collecté par le transporteur",
  "Reçu au centre de retour",
  "Inspection finale complétée",
  "Remboursement traité",
  "Retour fermé",
];
