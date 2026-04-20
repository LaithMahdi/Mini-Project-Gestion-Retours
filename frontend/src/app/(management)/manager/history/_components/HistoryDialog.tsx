import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { HistoryDataType, Item, RetourDataType } from "./types";
import { useForm } from "react-hook-form";
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
import { toast } from "sonner";
import {
  HISTORY_ENDPOINT,
  HISTORY_KEY,
  RETURNS_ENDPOINT,
  RETURNS_KEY,
  USERS_ENDPOINT,
  USERS_KEY,
} from "@/config";
import { SelectItem } from "@/components/ui/select";
import { HistoryFormData, historySchema, raisons } from "./schema";
import apiClient from "@/lib/api-client";
import { useEffect } from "react";

interface Props {
  item?: Item;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HistoryDialog = (props: Props) => {
  const { item, open, onOpenChange } = props;
  const queryClient = useQueryClient();

  const { isFetching, data } = useQuery<HistoryDataType>({
    queryKey: [USERS_KEY],
    queryFn: () => apiClient.get(`${USERS_ENDPOINT}/all`),
  });

  const { isFetching: isFetchingRetour, data: dataRetour } =
    useQuery<RetourDataType>({
      queryKey: [RETURNS_KEY],
      queryFn: () => apiClient.get(`${RETURNS_ENDPOINT}/all`),
    });

  const form = useForm<HistoryFormData>({
    resolver: zodResolver(historySchema),
    mode: "all",
    defaultValues: {
      retourId: item ? String(item.retourId) : "",
      action: item ? item.action : "",
      employeId: item ? item.employeId : "",
      date: item ? new Date(item.date).toString() : new Date().toString(),
    },
  });

  useEffect(() => {
    if (item) {
      form.reset({
        retourId: String(item.retourId),
        action: item.action,
        employeId: item.employeId,
        date: new Date(item.date).toString(),
      });
    }
  }, [item, form, open]);

  const mutation = useMutation({
    mutationFn: async (data: HistoryFormData) => {
      const dateObj = new Date(data.date);
      const formattedDate = dateObj.toISOString().split("T")[0] + "T00:00:00";

      const newData = {
        retourId: parseInt(data.retourId),
        action: data.action,
        employeId: data.employeId,
        date: formattedDate,
      };

      if (item) {
        await apiClient.put(`${HISTORY_ENDPOINT}/update/${item.id}`, newData);
      } else {
        await apiClient.post(`${HISTORY_ENDPOINT}/create`, newData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [HISTORY_KEY] });
      toast.success(
        item
          ? "Historique de retour modifié avec succès."
          : "Historique de retour créé avec succès.",
      );
      onOpenChange(false);
      form.reset();
    },
    onError: (e) => {
      console.log("Error:", e);
      toast.error("Erreur lors de l'opération.");
    },
  });

  const handleSubmit = (data: HistoryFormData) => {
    mutation.mutate(data);
  };

  const users = data?.data?.data || [];
  const retours = dataRetour?.data?.data || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Créer un historique de retour</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <CustomFormField
              control={form.control}
              name="employeId"
              label="Employé"
              placeholder="Sélectionner un employé"
              fieldType={FormFieldType.SELECT}
              disabled={mutation.isPending || isFetching}
            >
              {users.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.nom} - {option.role}
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              control={form.control}
              name="retourId"
              label="Retour"
              placeholder="Sélectionner un retour"
              fieldType={FormFieldType.SELECT}
              disabled={mutation.isPending || isFetchingRetour}
            >
              {retours.map((retour) => (
                <SelectItem key={retour.id} value={String(retour.id)}>
                  {retour.produit}
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              control={form.control}
              name="action"
              label="Action"
              placeholder="Sélectionner une action"
              fieldType={FormFieldType.SELECT}
              disabled={mutation.isPending}
            >
              {raisons.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              control={form.control}
              name="date"
              label="Date"
              placeholder="Entrez la date"
              disabled={mutation.isPending}
              fieldType={FormFieldType.DATE_PICKER}
            />

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

export default HistoryDialog;
