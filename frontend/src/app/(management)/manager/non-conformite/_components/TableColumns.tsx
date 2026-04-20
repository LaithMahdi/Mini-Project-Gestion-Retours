"use client";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Item } from "./types";
import { Checkbox } from "@/components/ui/checkbox";
import MoreButton from "./MoreButton";
import { getGraviteMeta } from "./functions";

export const columns: ColumnDef<Item>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
              ? "indeterminate"
              : false
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Tout sélectionner"
        className="ml-4"
      />
    ),
    cell: ({ row }) => (
      <div className="pl-4 h-full">
        <span
          className={cn(
            "flex origin-center w-2 transition-transform scale-y-0 h-full bg-sky-500 rounded-r-full absolute left-0 top-0",
            { "scale-y-100": row.getIsSelected() },
          )}
        />
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Sélectionner la ligne"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: () => <div className="text-base">ID</div>,
    cell: ({ row }) => (
      <p className="text-sm text-slate-700 dark:text-slate-200">
        #{row.original.id}
      </p>
    ),
  },
  {
    accessorKey: "description",
    header: () => <div className="text-base">Description</div>,
    cell: ({ row }) => (
      <p className="text-sm text-slate-800 dark:text-slate-100">
        {row.original.description}
      </p>
    ),
  },
  {
    accessorKey: "gravite",
    header: () => <div className="text-base">Gravité</div>,
    cell: ({ row }) => {
      const gravite = row.original.gravite;
      const meta = getGraviteMeta(gravite);
      return (
        <span
          className={cn(
            "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border",
            meta.className,
          )}
        >
          {meta.label}
        </span>
      );
    },
  },
  {
    accessorKey: "date",
    header: () => <div className="text-base">Date</div>,
    cell: ({ row }) => {
      const formattedDate = format(new Date(row.original.date), "d MMMM yyyy", {
        locale: fr,
      });
      const [day, month, year] = formattedDate.split(" ");
      const displayDate = `${day} ${month?.charAt(0).toUpperCase()}${month?.slice(1)} ${year}`;

      return (
        <div className="text-sm text-slate-600 dark:text-slate-300">
          {displayDate}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-base">Actions</div>,
    cell: ({ row }) => {
      return <MoreButton item={row.original} />;
    },
  },
];
