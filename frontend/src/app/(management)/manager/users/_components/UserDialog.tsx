import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Item } from "./types";
import { useForm } from "react-hook-form";
import {
  roles,
  UserFormData,
  userFormSchema,
  createUserSchema,
} from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/custom_form_field";
import { Form } from "@/components/ui/form";
import apiClient from "@/lib/api-client";
import { toast } from "sonner";
import { USERS_ENDPOINT, USERS_KEY } from "@/config";
import { useEffect } from "react";
import { SelectItem } from "@/components/ui/select";

interface Props {
  item?: Item;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserDialog = (props: Props) => {
  const { item, open, onOpenChange } = props;
  const queryClient = useQueryClient();
  const isCreating = !item;

  const form = useForm<UserFormData>({
    resolver: zodResolver(isCreating ? createUserSchema : userFormSchema),
    mode: "all",
    defaultValues: {
      nom: item?.nom ?? "",
      email: item?.email ?? "",
      role: (item?.role ?? "USER") as "USER" | "MANAGER",
      password: "",
    },
  });

  useEffect(() => {
    if (item) {
      form.reset({
        nom: item.nom,
        email: item.email,
        role: item.role as "USER" | "MANAGER",
        password: "",
      });
    }
  }, [item, form, open]);

  const mutation = useMutation({
    mutationFn: async (data: UserFormData) => {
      if (item) {
        const updateData = {
          nom: data.nom,
          email: data.email,
          role: data.role,
          ...(data.password && { password: data.password }),
        };
        await apiClient.patch(`${USERS_ENDPOINT}/patch/${item.id}`, updateData);
      } else {
        await apiClient.post(`${USERS_ENDPOINT}/create`, data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_KEY] });
      toast.success(
        item
          ? "Utilisateur modifié avec succès."
          : "Utilisateur créé avec succès.",
      );
      onOpenChange(false);
      form.reset();
    },
    onError: () => {
      toast.error("Erreur lors de l'opération.");
    },
  });

  const handleSubmit = (data: UserFormData) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {item ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <CustomFormField
              control={form.control}
              name="nom"
              label="Nom"
              placeholder="Entrez le nom de l'utilisateur"
              disabled={mutation.isPending}
              fieldType={FormFieldType.INPUT}
            />

            <CustomFormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Entrez l'email"
              disabled={mutation.isPending}
              fieldType={FormFieldType.INPUT}
            />

            <CustomFormField
              control={form.control}
              name="role"
              label="Rôle"
              placeholder="Sélectionner un rôle"
              fieldType={FormFieldType.SELECT}
              disabled={mutation.isPending}
            >
              {roles.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </CustomFormField>

            {item == null && (
              <CustomFormField
                control={form.control}
                name="password"
                label={`Mot de passe ${!isCreating ? "(optionnel)" : ""}`}
                placeholder={
                  isCreating
                    ? "Entrez le mot de passe"
                    : "Laissez vide pour ne pas changer"
                }
                fieldType={FormFieldType.PASSWORD}
                disabled={mutation.isPending}
              />
            )}

            <div className="flex gap-3 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={mutation.isPending}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending
                  ? item
                    ? "Modification..."
                    : "Création..."
                  : item
                    ? "Modifier"
                    : "Créer"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;
