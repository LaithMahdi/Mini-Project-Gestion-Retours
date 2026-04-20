"use client";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Item } from "./types";
import { Checkbox } from "@/components/ui/checkbox";
import { getRoleMeta } from "./functions";
import MoreButton from "./MoreButton";
import UserSwither from "./UserSwither";

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
        #{row.index + 1}
      </p>
    ),
  },
  {
    accessorKey: "nom",
    header: () => <div className="text-base">Nom</div>,
    cell: ({ row }) => (
      <p className="text-sm text-slate-800 dark:text-slate-100">
        {row.original.nom}
      </p>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div className="text-base">Email</div>,
    cell: ({ row }) => (
      <p className="text-sm text-slate-800 dark:text-slate-100">
        {row.original.email}
      </p>
    ),
  },
  {
    accessorKey: "role",
    header: () => <div className="text-base">Rôle</div>,
    cell: ({ row }) => {
      const role = row.original.role;
      const meta = getRoleMeta(role);
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
    accessorKey: "enabled",
    header: () => <div className="text-base">Activé</div>,
    cell: ({ row }) => {
      return <UserSwither item={row.original} />;
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
