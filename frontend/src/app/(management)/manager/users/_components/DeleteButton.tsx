"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { USERS_ENDPOINT, USERS_KEY } from "@/config";
import apiClient from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Item } from "./types";

interface Props {
  data: Item;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

const DeleteButton = ({ data, open, onOpenChange }: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return apiClient.delete(`${USERS_ENDPOINT}/delete/${data.id}`);
    },
    onSuccess: () => {
      toast.success("Utilisateur supprimé avec succès.");
      queryClient.invalidateQueries({ queryKey: [USERS_KEY] });
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error("Erreur lors de la suppression de l'utilisateur.");
      console.error("Failed to delete user", error);
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-slate-900 dark:text-white">
            Confirmation de suppression
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-600 dark:text-slate-300">
            Cette action est irreversible. Le utilisateur &nbsp;
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {data.nom}
            </span>{" "}
            &nbsp;sera supprime definitivement.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
            className="py-2 px-4 bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600 hover:text-slate-900 dark:hover:text-white"
          >
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-rose-500 hover:bg-rose-600 text-white py-2 px-4"
            disabled={isPending}
            onClick={() => mutate()}
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
