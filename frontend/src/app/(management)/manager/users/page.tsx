"use client";

import PageHeader from "@/components/shared/page-header";
import { USERS_ENDPOINT, USERS_KEY } from "@/config";
import { ITEMS_PER_PAGE } from "@/constants";
import apiClient from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  parseAsInteger,
  useQueryState as useSearchParamsState,
  parseAsStringEnum,
  parseAsString,
} from "nuqs";
import { DataType, Item } from "./_components/types";
import DataTableUsers from "./_components/DataTableUsers";
import UserDialog from "./_components/UserDialog";
import { useState } from "react";
import { ViewMode } from "./_components/schema";
import { toast } from "sonner";
import UserFilter from "./_components/UserFilter";
import { SearchParamsBoundary } from "@/components/shared/search-params-boundary";

const UsersContent = () => {
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();
  const queryClient = useQueryClient();
  const [page, setPage] = useSearchParamsState(
    "page",
    parseAsInteger.withDefault(1),
  );
  const [view, setView] = useSearchParamsState(
    "view",
    parseAsStringEnum<ViewMode>(
      Object.values(ViewMode) as ViewMode[],
    ).withDefault(ViewMode.TABLE),
  );

  const [search, setSearch] = useSearchParamsState(
    "search",
    parseAsString.withDefault(""),
  );

  const [role, setRole] = useSearchParamsState(
    "role",
    parseAsString.withDefault(""),
  );

  const { isFetching, data } = useQuery<DataType>({
    queryKey: [USERS_KEY, page, search, role],
    queryFn: () =>
      apiClient.get(USERS_ENDPOINT, {
        params: {
          page,
          size: ITEMS_PER_PAGE,
          nom: search,
          role: role === "ALL" ? undefined : role,
        },
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string | number) => {
      await apiClient.delete(`${USERS_ENDPOINT}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_KEY] });
      toast.success("Utilisateur supprimé avec succès.");
    },
    onError: () => {
      toast.error("Erreur lors de la suppression de l'utilisateur.");
    },
  });

  const totalItems = data?.data?.edgeInfo?.totalItems ?? 0;
  const hasNextPage = data?.data?.edgeInfo?.hasNext ?? false;
  const hasPreviousPage = data?.data?.edgeInfo?.hasPrevious ?? false;

  const handleEdit = (item: Item) => {
    setSelectedItem(item);
    setOpenEditDialog(true);
  };

  const handleDelete = (id: string | number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setOpenEditDialog(open);
    if (!open) {
      setSelectedItem(undefined);
    }
  };

  const handleAddUser = () => {
    setSelectedItem(undefined);
    setOpenEditDialog(true);
  };

  return (
    <>
      <PageHeader
        title="Mes utilisateurs"
        totalItems={totalItems}
        buttonName="Ajouter un utilisateur"
        onClick={handleAddUser}
      />
      <UserFilter
        role={role}
        onRoleChange={setRole}
        search={search}
        onSearchChange={setSearch}
        view={view}
        setView={setView}
      />

      <div className="flex items-center justify-between gap-2 w-full">
        <DataTableUsers
          view={view}
          onViewChange={setView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isFetching || deleteMutation.isPending}
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

      <UserDialog
        item={selectedItem}
        open={openEditDialog}
        onOpenChange={handleOpenChange}
      />
    </>
  );
};

const Page = () => {
  return (
    <section className="min-h-screen flex flex-col items-start justify-start gap-3">
      <SearchParamsBoundary>
        <UsersContent />
      </SearchParamsBoundary>
    </section>
  );
};

export default Page;
