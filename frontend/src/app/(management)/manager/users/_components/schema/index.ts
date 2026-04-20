import { GridIcon, TableIcon } from "@hugeicons/core-free-icons";
import { z } from "zod";

export const userFormSchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("L'email doit être valide"),
  role: z.enum(["USER", "MANAGER"]),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .optional()
    .or(z.literal("")),
});

export type UserFormData = z.infer<typeof userFormSchema>;

export const createUserSchema = userFormSchema.extend({
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export type CreateUserData = z.infer<typeof createUserSchema>;

export enum UserRole {
  USER = "USER",
  MANAGER = "MANAGER",
}

export const roles = [
  { value: UserRole.USER, label: "Utilisateur" },
  { value: UserRole.MANAGER, label: "Manager" },
];

export enum ViewMode {
  TABLE = "TABLE",
  GRID = "GRID",
}

export const viewsModes = [
  { value: ViewMode.TABLE, label: "Tableau", icon: TableIcon },
  { value: ViewMode.GRID, label: "Grille", icon: GridIcon },
];
