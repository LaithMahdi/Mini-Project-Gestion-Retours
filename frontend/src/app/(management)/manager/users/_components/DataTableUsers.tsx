import { useCallback, useState } from "react";
import { Item } from "./types";
import { DataTable } from "@/components/ui/data-table";
import { UserCard } from "./UserCard";
import { columns } from "./TableColumns";
import { ViewMode } from "./schema";
import GridPagination from "@/components/shared/GridPagination";

type Props = {
  items: Item[] | undefined;
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
  onEdit?: (item: Item) => void;
  onDelete?: (id: string | number) => void;
  isLoading: boolean;
  paginationProps?: {
    advanced?: {
      itemsPerPage: number;
      totalItems: number;
      onPageChange: (page: number) => void;
      pageIndex: number;
    };
    isNextDisabled: boolean;
    isPreviousDisabled: boolean;
    onNextClick: () => void;
    onPreviousClick: () => void;
  };
};

export default function DataTableUsers(props: Props) {
  const {
    items,
    view,
    onViewChange,
    onEdit,
    onDelete,
    isLoading,
    paginationProps,
  } = props;

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [categoriesToDelete, setCategoriesToDelete] = useState<Item[]>([]);
  const [resetSelection, setResetSelection] = useState(false);

  const onSelectedRowsChange = useCallback((rows: Item[]) => {
    setSelectedIds(rows.map((item) => item.id.toString()));
  }, []);

  const onSelectedCardsChange = useCallback((ids: string[]) => {
    setSelectedIds(ids);
  }, []);

  const handleDeleteSelected = useCallback((rows: Item[]) => {
    setCategoriesToDelete(rows);
    setShowDeleteDialog(true);
  }, []);

  const handleDeleteSuccess = useCallback(() => {
    setSelectedIds([]);
    setCategoriesToDelete([]);
    setResetSelection(true);
    setTimeout(() => setResetSelection(false), 100);
  }, []);

  const handleDialogOpenChange = useCallback((open: boolean) => {
    setShowDeleteDialog(open);
    if (!open) {
      setCategoriesToDelete([]);
    }
  }, []);

  return (
    <div className="mt-3 w-full">
      {view === ViewMode.TABLE ? (
        <DataTable
          onSelectedRowsChange={onSelectedRowsChange}
          paginationProps={paginationProps}
          columns={columns ?? []}
          data={items ?? []}
          isLoading={isLoading}
          moduleColor="hover:bg-sky-500/10"
          ModulePaginationColor="bg-sky-500"
        />
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {(items ?? []).map((item, index) => (
              <UserCard
                key={item.id}
                index={index}
                user={item}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>

          {(items?.length ?? 0) === 0 && (
            <p className="text-center text-slate-500 dark:text-slate-400 py-8">
              Aucun utilisateur trouvé.
            </p>
          )}

          <GridPagination paginationProps={paginationProps} />
        </div>
      )}
    </div>
  );
}
