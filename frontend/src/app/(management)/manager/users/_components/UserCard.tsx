"use client";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Item } from "./types";
import MoreButton from "./MoreButton";
import { cn } from "@/lib/utils";
import { getRoleMeta } from "./functions";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon } from "@hugeicons/core-free-icons";
import UserSwither from "./UserSwither";

interface Props {
  user: Item;
  index: number;
  onDelete?: (id: string | number) => void;
  onEdit?: (user: Item) => void;
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

const getAvatarColor = (index: number) => {
  const colors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-green-500",
    "bg-orange-500",
    "bg-red-500",
    "bg-indigo-500",
    "bg-cyan-500",
  ];
  return colors[index % colors.length];
};

export function UserCard(props: Props) {
  const { user, index } = props;
  const initials = getInitials(user.nom);
  const avatarColor = getAvatarColor(index);

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 h-full flex flex-col border-0 bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-0">
      <div
        className={cn(
          "h-20 rounded-t-lg bg-linear-to-r",
          avatarColor,
          "opacity-90",
        )}
      />
      <div className="px-6 pb-4">
        <div className="flex items-end justify-between gap-4 -mt-10 mb-4">
          <div
            className={cn(
              "flex items-center justify-center w-20 h-20 rounded-lg text-white font-bold text-xl shadow-lg",
              avatarColor,
            )}
          >
            {initials}
          </div>
          <MoreButton item={user} />
        </div>
        <div className="space-y-1 mb-4">
          <CardTitle className="text-lg font-bold text-slate-900 dark:text-white truncate">
            {user.nom}
          </CardTitle>
          <CardDescription className="flex items-center gap-2 text-slate-600 dark:text-slate-400 truncate">
            <HugeiconsIcon icon={Mail01Icon} className="w-4 h-4 shrink-0" />
            <span className="truncate text-xs">{user.email}</span>
          </CardDescription>
        </div>
        <div className="h-px bg-slate-200 dark:bg-slate-700 my-4" />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
              Rôle
            </span>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold border",
                getRoleMeta(user.role).className,
              )}
            >
              {user.roleDisplayName}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
              Statut
            </span>
            <UserSwither item={user} />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 dark:text-slate-500">
              ID utilisateur
            </span>
            <code className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">
              #{index + 1}
            </code>
          </div>
        </div>
      </div>
    </Card>
  );
}
