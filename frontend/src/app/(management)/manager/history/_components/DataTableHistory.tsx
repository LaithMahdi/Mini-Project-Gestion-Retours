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

export default function DataTableHistory({
  items,
  paginationProps,
  isLoading,
}: Props) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const onSelectedRowsChange = useCallback((rows: Item[]) => {
    setSelectedIds(rows.map((item) => item.id.toString()));
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
