"use client";

import * as React from "react";
import type { Table } from "@tanstack/react-table";
import { cn, formatToSentenceCase } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckmarkCircle02Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  moduleColor?: string;
}

export function DataTableViewOptions<TData>({
  table,
  moduleColor,
}: DataTableViewOptionsProps<TData>) {
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="hidden h-8 lg:flex">
          <HugeiconsIcon icon={Settings01Icon} />
          Colonnes{" "}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-44 p-0"
        onCloseAutoFocus={() => triggerRef.current?.focus()}
      >
        <Command>
          <CommandInput placeholder="Rechreche..." />
          <CommandList>
            <CommandEmpty>Aucun élément.</CommandEmpty>
            <CommandGroup>
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide(),
                )
                .map((column) => {
                  return (
                    <CommandItem
                      key={column.id}
                      className={moduleColor}
                      onSelect={() =>
                        column.toggleVisibility(!column.getIsVisible())
                      }
                    >
                      <span className="truncate first-letter:uppercase">
                        {formatToSentenceCase(column.id)}
                      </span>
                      <HugeiconsIcon
                        icon={CheckmarkCircle02Icon}
                        className={cn(
                          "ml-auto size-4 shrink-0",
                          column.getIsVisible() ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  );
                })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
