"use client";

import {
  parseAsInteger,
  parseAsString,
  useQueryState as useSearchParamsState,
} from "nuqs";

import PageHeader from "@/components/shared/page-header";
import { useQuery } from "@tanstack/react-query";
import { DataType, Item } from "./_components/types";
import apiClient from "@/lib/api-client";
import { NON_CONFORMITE_ENDPOINT, NON_CONFORMITE_KEY } from "@/config";
import { ITEMS_PER_PAGE } from "@/constants";
import DataTableNonConformites from "./_components/DataTableNonConformites";
import { useState } from "react";
import { NonConformityDialog } from "./_components/NonConformityDialog";
import NonConFormiteFilter from "./_components/NonConFormiteFilter";
import { useSessionStore } from "@/stores/use_session_store";
import { SearchParamsBoundary } from "@/components/shared/search-params-boundary";

const NonConformityContent = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [page, setPage] = useSearchParamsState(
    "page",
    parseAsInteger.withDefault(1),
  );

  const [search, setSearch] = useSearchParamsState(
    "search",
    parseAsString.withDefault(""),
  );

  const [gravity, setGravity] = useSearchParamsState(
    "gravite",
    parseAsString.withDefault("ALL"),
  );

  const { isFetching, data } = useQuery<DataType>({
    queryKey: [NON_CONFORMITE_KEY, page, search, gravity],
    queryFn: () =>
      apiClient.get(NON_CONFORMITE_ENDPOINT, {
        params: {
          page,
          size: ITEMS_PER_PAGE,
          gravite: gravity && gravity !== "ALL" ? gravity : undefined,
          produit: search || undefined,
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
        title="Non Conformités"
        totalItems={totalItems}
        buttonName="Ajouter une non-conformité"
        disabled={!canEdit}
        onClick={() => setOpenDeleteDialog(true)}
      />

      <NonConFormiteFilter
        search={search}
        gravity={gravity}
        onSearchChange={(value) => {
          setPage(1);
          setSearch(value);
        }}
        onGravityChange={(value) => {
          setPage(1);
          setGravity(value);
        }}
      />

      <div className="flex items-center justify-between gap-2 w-full">
        <DataTableNonConformites
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
      <NonConformityDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
      />
    </>
  );
};

const page = () => {
  return (
    <section className="min-h-screen flex flex-col items-start justify-start gap-3">
      <SearchParamsBoundary>
        <NonConformityContent />
      </SearchParamsBoundary>
    </section>
  );
};

export default page;
