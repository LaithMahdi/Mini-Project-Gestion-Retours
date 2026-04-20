"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { RETURNS_ENDPOINT, RETURNS_KEY } from "@/config";
import apiClient from "@/lib/api-client";
import { ReturnForm, type ReturnFormData } from "./_components/RetutnForm";
import { useRouter } from "next/navigation";
import { useId } from "@/hooks/use-id";
import { type Item } from "../../_components/types";
import {
  extractReturnItem,
  fetchReturnById,
} from "../../_components/functions";

const Page = () => {
  const id = useId();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    isFetching,
    data: item,
    isError,
    error,
  } = useQuery<Item>({
    queryKey: [RETURNS_KEY, id],
    enabled: Boolean(id),
    queryFn: async () => {
      const response = await fetchReturnById(String(id));
      return extractReturnItem<Item>(response.data);
    },
  });

  const createReturnMutation = useMutation({
    mutationFn: async (payload: ReturnFormData) => {
      await apiClient.put(`${RETURNS_ENDPOINT}/update/${id}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RETURNS_KEY] });
      toast.success("Retour mis a jour avec succes.");
      router.push("/manager/returns");
    },
    onError: () => {
      toast.error("Erreur lors de la mise a jour du retour.");
    },
  });

  const handleSubmit = async (data: ReturnFormData) => {
    await createReturnMutation.mutateAsync({
      produit: data.produit,
      client: data.client,
      raison: data.raison,
      etatTraitement: data.etatTraitement,
      date: data.date,
    });
  };

  if (isFetching || !item) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg text-slate-600 dark:text-slate-300">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg text-rose-600 dark:text-rose-400">
          {error instanceof Error
            ? error.message
            : "Erreur lors du chargement du retour."}
        </p>
      </div>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Retours Clients
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Mettre a jour une demande de retour pour un client
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-900">
          <ReturnForm
            data={item}
            onSubmit={handleSubmit}
            isLoading={createReturnMutation.isPending}
          />
        </div>
      </div>
    </section>
  );
};

export default Page;
