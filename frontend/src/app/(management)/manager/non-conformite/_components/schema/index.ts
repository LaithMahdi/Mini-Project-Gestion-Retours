import { z } from "zod";

export const nonConformityFormSchema = z.object({
  description: z.string().min(1, "La description est requise"),
  product: z.string().min(1, "Le produit est requis"),
  gravite: z.enum(["ELEVEE", "MOYENNE", "FAIBLE", "CRITIQUE"]),
});

export type NonConformityFormData = z.infer<typeof nonConformityFormSchema>;

export const GRAVITE_FORM_OPTIONS = [
  { value: "FAIBLE", label: "Faible" },
  { value: "MOYENNE", label: "Moyenne" },
  { value: "ELEVEE", label: "Élevée" },
  { value: "CRITIQUE", label: "Critique" },
];
