import { useCallback, useState } from "react";
import { Item } from "./types";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./TableColumns";

type Props = {
  items: Item[] | undefined;
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

export default function DataTableNonConformites({
  items,
  paginationProps,
  isLoading,
}: Props) {
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
      <DataTable
        onSelectedRowsChange={onSelectedRowsChange}
        paginationProps={paginationProps}
        columns={columns ?? []}
        data={items ?? []}
        isLoading={isLoading}
        moduleColor="hover:bg-sky-500/10"
        ModulePaginationColor="bg-sky-500"
      />
    </div>
  );
}
