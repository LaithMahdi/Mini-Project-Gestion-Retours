"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { RETURNS_ENDPOINT, RETURNS_KEY } from "@/config";
import apiClient from "@/lib/api-client";
import { ReturnForm, type ReturnFormData } from "./_components/RetutnForm";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createReturnMutation = useMutation({
    mutationFn: async (payload: ReturnFormData) => {
      await apiClient.post(`${RETURNS_ENDPOINT}/create`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RETURNS_KEY] });
      toast.success("Retour cree avec succes.");
      router.push("/manager/returns");
    },
    onError: () => {
      toast.error("Erreur lors de la creation du retour.");
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

  return (
    <section className="py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Retours Clients
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Créez une demande de retour pour un client
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-900">
          <ReturnForm
            onSubmit={handleSubmit}
            isLoading={createReturnMutation.isPending}
          />
        </div>
      </div>
    </section>
  );
};

export default Page;
