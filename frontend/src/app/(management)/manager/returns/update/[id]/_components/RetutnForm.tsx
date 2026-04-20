"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/custom_form_field";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { Item } from "../../../_components/types";
import {
  ETAT_TRAITEMENT_FORM_OPTIONS,
  returnFormSchema,
} from "../../../create/_components/schema";

export type ReturnFormData = z.infer<typeof returnFormSchema>;

const getTodayIsoDate = () => new Date().toISOString().split("T")[0];

interface Props {
  data: Item;
  onSubmit?: (data: ReturnFormData) => Promise<void> | void;
  isLoading?: boolean;
}

export function ReturnForm(props: Props) {
  const { onSubmit, isLoading = false } = props;
  const form = useForm<ReturnFormData>({
    resolver: zodResolver(returnFormSchema),
    mode: "all",
    defaultValues: {
      client: props.data.client || "",
      produit: props.data.produit || "",
      raison: props.data.raison || "",
      etatTraitement: props.data.etatTraitement || "EN_ATTENTE",
      date: props.data.date || getTodayIsoDate(),
    },
  });

  const handleSubmit = async (data: ReturnFormData) => {
    await onSubmit?.(data);
    form.reset({
      client: "",
      produit: "",
      raison: "",
      etatTraitement: "EN_ATTENTE",
      date: getTodayIsoDate(),
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Modifier un retour client
            </h1>
            <p className="text-sm text-muted-foreground">
              Veuillez remplir les informations du retour client ci-dessous.
            </p>
          </div>

          <div className="grid gap-5">
            <CustomFormField
              control={form.control}
              name="client"
              label="Client"
              placeholder="Ex: Acme Corp"
              fieldType={FormFieldType.INPUT}
              disabled={isLoading}
            />

            <CustomFormField
              control={form.control}
              name="produit"
              label="Produit"
              placeholder="Ex: Laptop Dell XPS 13"
              fieldType={FormFieldType.INPUT}
              disabled={isLoading}
            />

            <CustomFormField
              control={form.control}
              name="raison"
              label="Raison du retour"
              placeholder="Ex: Le produit est defectueux..."
              fieldType={FormFieldType.TEXTAREA}
              disabled={isLoading}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <CustomFormField
                control={form.control}
                name="date"
                label="Date"
                fieldType={FormFieldType.DATE_PICKER}
                inputType="date"
                disabled={isLoading}
              />

              <CustomFormField
                control={form.control}
                name="etatTraitement"
                label="Etat du traitement"
                placeholder="Selectionnez un statut"
                fieldType={FormFieldType.SELECT}
                disabled={isLoading}
              >
                {ETAT_TRAITEMENT_FORM_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </CustomFormField>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Modification en cours..." : "Modifier le retour"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
