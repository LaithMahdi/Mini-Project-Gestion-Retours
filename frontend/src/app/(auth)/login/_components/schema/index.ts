import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .email("Veuillez entrer un email valide")
    .trim()
    .min(1, "L'email est requis"),
  password: z
    .string()
    .min(1, "Le mot de passe est requis")
    .min(5, "Le mot de passe doit contenir au moins 5 caractères"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
