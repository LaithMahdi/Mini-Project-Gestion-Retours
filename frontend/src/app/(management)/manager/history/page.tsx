"use client";

import PageHeader from "@/components/shared/page-header";
import { HISTORY_ENDPOINT, HISTORY_KEY } from "@/config";
import { ITEMS_PER_PAGE } from "@/constants";
import apiClient from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState as useSearchParamsState } from "nuqs";
import { DataType, Item } from "./_components/types";
import DataTableHistory from "./_components/DataTableHistory";
import { useState } from "react";
import HistoryDialog from "./_components/HistoryDialog";
import { useSessionStore } from "@/stores/use_session_store";
import { SearchParamsBoundary } from "@/components/shared/search-params-boundary";

const HistoryContent = () => {
  const [page, setPage] = useSearchParamsState(
    "page",
    parseAsInteger.withDefault(1),
  );
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

  const { isFetching, data } = useQuery<DataType>({
    queryKey: [HISTORY_KEY, page],
    queryFn: () =>
      apiClient.get(HISTORY_ENDPOINT, {
        params: {
          page,
          size: ITEMS_PER_PAGE,
        },
      }),
  });

  const totalItems = data?.data?.edgeInfo?.totalItems ?? 0;
  const hasNextPage = data?.data?.edgeInfo?.hasNext ?? false;
  const hasPreviousPage = data?.data?.edgeInfo?.hasPrevious ?? false;
  const { currentUser } = useSessionStore();

  const canEdit =
    currentUser?.role === "ADMIN" || currentUser?.role === "MANAGER";
  return (
    <>
      <PageHeader
        title="Historique des retours"
        totalItems={totalItems}
        buttonName="Ajouter un retour"
        disabled={!canEdit}
        onClick={() => setOpenEditDialog(true)}
      />

      <div className="flex items-center justify-between gap-2 w-full">
        <DataTableHistory
          isLoading={isFetching}
          paginationProps={{
            advanced: {
              totalItems,
              onPageChange: setPage,
              pageIndex: page,
              itemsPerPage: ITEMS_PER_PAGE,
            },
            isNextDisabled: !hasNextPage,
            isPreviousDisabled: !hasPreviousPage,
            onNextClick: () => setPage(page + 1),
            onPreviousClick: () => setPage(page - 1),
          }}
          items={(data?.data?.data as Item[]) || []}
        />
      </div>

      <HistoryDialog open={openEditDialog} onOpenChange={setOpenEditDialog} />
    </>
  );
};

const page = () => {
  return (
    <section className="min-h-screen flex flex-col items-start justify-start gap-3">
      <SearchParamsBoundary>
        <HistoryContent />
      </SearchParamsBoundary>
    </section>
  );
};

export default page;
