import React from "react";
import AdvancedPagination from "@/components/ui/advanced-pagination";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

interface GridPaginationProps {
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
}

const GridPagination: React.FC<GridPaginationProps> = ({ paginationProps }) => {
  if (!paginationProps) return null;

  return (
    <div className="rounded-md bg-white dark:bg-slate-900/95 overflow-y-hidden border border-sky-500/20 shadow-lg shadow-sky-500/10">
      <div className="h-16 border-t border-sky-500/20 flex">
        <div className="flex items-center justify-between w-full px-5">
          {!paginationProps.advanced && (
            <div className="flex items-center gap-2 ml-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={paginationProps.onPreviousClick}
                disabled={paginationProps.isPreviousDisabled}
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={paginationProps.onNextClick}
                disabled={paginationProps.isNextDisabled}
              >
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
              </Button>
            </div>
          )}

          {paginationProps.advanced && (
            <AdvancedPagination
              ModulePaginationColor="bg-sky-500"
              itemsPerPage={paginationProps.advanced.itemsPerPage}
              totalItems={paginationProps.advanced.totalItems}
              pageIndex={paginationProps.advanced.pageIndex}
              pageCount={Math.ceil(
                paginationProps.advanced.totalItems /
                  paginationProps.advanced.itemsPerPage,
              )}
              onPageChange={paginationProps.advanced.onPageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GridPagination;
