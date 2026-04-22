"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { SelectItem } from "@/components/ui/select";
import apiClient from "@/lib/api-client";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  nonConformityFormSchema,
  type NonConformityFormData,
  GRAVITE_FORM_OPTIONS,
} from "./schema";
import {
  NON_CONFORMITE_ENDPOINT,
  NON_CONFORMITE_KEY,
  RETURNS_ENDPOINT,
  RETURNS_KEY,
} from "@/config";
import { useEffect } from "react";
import { Item } from "./types";
import { RetourDataType } from "../../history/_components/types";

interface Props {
  item?: Item;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NonConformityDialog(props: Props) {
  const { open, onOpenChange, item } = props;
  const queryClient = useQueryClient();

  const form = useForm<NonConformityFormData>({
    resolver: zodResolver(nonConformityFormSchema),
    mode: "all",
    defaultValues: {
      description: item?.description ?? "",
      product: item ? `${item?.productId}` : "",
      gravite: item?.gravite ?? "FAIBLE",
    },
  });

  useEffect(() => {
    if (item) {
      form.reset({
        description: item?.description ?? "",
        product: item ? `${item?.productId}` : "",
        gravite: item?.gravite ?? "FAIBLE",
      });
    }
  }, [item, form]);

  const { data: productsData, isLoading: isLoadingProducts } =
    useQuery<RetourDataType>({
      queryKey: [`${RETURNS_KEY}-all`],
      queryFn: () => apiClient.get(`${RETURNS_ENDPOINT}/all`),
    });

  const { mutate: createNonConformity, isPending: isCreating } = useMutation({
    mutationFn: async (data: NonConformityFormData) => {
      return item
        ? apiClient.patch(`${NON_CONFORMITE_ENDPOINT}/patch/${item.id}`, {
            description: data.description,
            gravite: data.gravite,
          })
        : apiClient.post(`${NON_CONFORMITE_ENDPOINT}/${data.product}`, {
            description: data.description,
            gravite: data.gravite,
          });
    },
    onSuccess: () => {
      toast.success(
        item
          ? "Non-conformité modifiée avec succès."
          : "Non-conformité créée avec succès.",
      );
      queryClient.invalidateQueries({ queryKey: [NON_CONFORMITE_KEY] });
      form.reset();
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error("Erreur lors de la création de la non-conformité.");
      console.error("Failed to create non-conformity", error);
    },
  });

  const handleSubmit = async (data: NonConformityFormData) => {
    createNonConformity(data);
  };

  const products = productsData?.data?.data ?? [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>
            {item ? "Modifier la non-conformité" : "Ajouter une Non-conformité"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {item ? (
              <div></div>
            ) : (
              <CustomFormField
                control={form.control}
                name="product"
                label="Produit"
                placeholder={
                  isLoadingProducts
                    ? "Chargement..."
                    : "Sélectionner un produit"
                }
                fieldType={FormFieldType.SELECT}
                disabled={
                  isCreating ||
                  isLoadingProducts ||
                  (products?.length ?? 0) === 0
                }
              >
                {(products?.length ?? 0) > 0 &&
                  products?.map((product) => (
                    <SelectItem key={product.id} value={`${product.id}`}>
                      {product.produit}
                    </SelectItem>
                  ))}
              </CustomFormField>
            )}

            <CustomFormField
              control={form.control}
              name="description"
              label="Description"
              placeholder="Décrivez la non-conformité..."
              fieldType={FormFieldType.TEXTAREA}
              disabled={isCreating}
            />

            <CustomFormField
              control={form.control}
              name="gravite"
              label="Gravité"
              placeholder="Sélectionner la gravité"
              fieldType={FormFieldType.SELECT}
              disabled={isCreating}
            >
              {GRAVITE_FORM_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </CustomFormField>

            <div className="flex gap-3 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isCreating}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isCreating}>
                {isCreating
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
}
