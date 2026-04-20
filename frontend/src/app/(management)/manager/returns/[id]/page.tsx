"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { RETURNS_KEY } from "@/config";
import { type Item } from "../_components/types";
import {
  extractReturnItem,
  fetchReturnById,
  getEtatTraitementMeta,
} from "../_components/functions";
import ReturnDetailError from "./_components/ReturnDetailError";
import ReturnDetailLoading from "./_components/ReturnDetailLoading";
import ReturnDetailCard from "./_components/ReturnDetailCard";
import { useId } from "@/hooks/use-id";

export default function ReturnDetailPage() {
  const router = useRouter();
  const id = useId();

  const {
    isFetching,
    data: item,
    isError,
    error,
  } = useQuery<Item>({
    queryKey: [RETURNS_KEY, id],
    enabled: Boolean(id),
    queryFn: async () => {
      const response = await fetchReturnById(id);
      return extractReturnItem<Item>(response.data);
    },
  });

  if (isFetching) {
    return <ReturnDetailLoading />;
  }

  if (isError || !item) {
    return <ReturnDetailError error={error} />;
  }

  const statusInfo = getEtatTraitementMeta(item.etatTraitement);

  return (
    <section className="py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <Button
              variant="outline"
              onClick={() => router.push("/manager/returns")}
              className="mb-6"
            >
              ← Retour
            </Button>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Détail du Retour #{item.id}
            </h1>
          </div>
        </div>

        <ReturnDetailCard item={item} statusInfo={statusInfo} />

        <div className="mt-8 flex gap-4 justify-between">
          <Button
            variant="outline"
            onClick={() => router.push("/manager/returns")}
          >
            Voir tous les retours
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => router.push(`/manager/returns/update/${item.id}`)}
            >
              Modifier
            </Button>
            <Button variant="destructive">Supprimer</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
