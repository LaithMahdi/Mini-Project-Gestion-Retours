"use client";
import {
  parseAsInteger,
  parseAsString,
  useQueryState as useSearchParamsState,
} from "nuqs";
import { RETURNS_ENDPOINT, RETURNS_KEY } from "@/config";
import apiClient from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { DataType, Item } from "./_components/types";
import { ITEMS_PER_PAGE } from "@/constants";
import DataTableReturns from "./_components/DataTableReturns";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/shared/page-header";
import ReturnsMonth from "./_components/ReturnsMonth";
import ReturnsFilter from "./_components/ReturnsFilter";
import { useSessionStore } from "@/stores/use_session_store";
import { SearchParamsBoundary } from "@/components/shared/search-params-boundary";

const ReturnsContent = () => {
  const defaultMonth = new Date().getMonth() + 1;

  const [page, setPage] = useSearchParamsState(
    "page",
    parseAsInteger.withDefault(1),
  );
  const [numberOfMonths, setNumberOfMonths] = useSearchParamsState(
    "numberOfMonths",
    parseAsInteger.withDefault(defaultMonth),
  );
  const [searchBy, setSearchBy] = useSearchParamsState(
    "searchBy",
    parseAsString.withDefault("client"),
  );
  const [search, setSearch] = useSearchParamsState(
    "search",
    parseAsString.withDefault(""),
  );
  const [etatTraitement, setEtatTraitement] = useSearchParamsState(
    "etatTraitement",
    parseAsString.withDefault("ALL"),
  );
  const router = useRouter();

  const normalizedSearchBy: "client" | "produit" =
    searchBy === "produit" || searchBy === "product" ? "produit" : "client";
  const normalizedSearch = search.trim();

  const { isFetching, data } = useQuery<DataType>({
    queryKey: [
      RETURNS_KEY,
      page,
      numberOfMonths,
      normalizedSearchBy,
      normalizedSearch,
      etatTraitement,
    ],
    queryFn: () =>
      apiClient.get(RETURNS_ENDPOINT, {
        params: {
          page,
          size: ITEMS_PER_PAGE,
          numberOfMonths,
          etatTraitement:
            etatTraitement && etatTraitement !== "ALL"
              ? etatTraitement
              : undefined,
          client:
            normalizedSearchBy === "client" && normalizedSearch
              ? normalizedSearch
              : undefined,
          produit:
            normalizedSearchBy === "produit" && normalizedSearch
              ? normalizedSearch
              : undefined,
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
        title="Retours clients"
        totalItems={totalItems}
        buttonName="Ajouter un retour"
        disabled={!canEdit}
        onClick={() => router.push("/manager/returns/create")}
      />
      <ReturnsMonth
        selectedMonth={numberOfMonths}
        onSelectMonth={(month) => {
          setPage(1);
          setNumberOfMonths(month);
        }}
      />

      <ReturnsFilter
        searchBy={normalizedSearchBy}
        search={search}
        etatTraitement={etatTraitement}
        onSearchByChange={(value) => {
          setPage(1);
          setSearchBy(value);
        }}
        onSearchChange={(value) => {
          setPage(1);
          setSearch(value);
        }}
        onEtatTraitementChange={(value) => {
          setPage(1);
          setEtatTraitement(value);
        }}
      />

      <div className="flex items-center justify-between gap-2 w-full">
        <DataTableReturns
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
    </>
  );
};

const Page = () => {
  return (
    <section className="min-h-screen flex flex-col items-start justify-start gap-3">
      <SearchParamsBoundary>
        <ReturnsContent />
      </SearchParamsBoundary>
    </section>
  );
};

export default Page;
