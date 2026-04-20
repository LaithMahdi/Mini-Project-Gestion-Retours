"use client";

import { useSessionStore } from "@/stores/use_session_store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserCircle02Icon,
  Settings01Icon,
  HelpCircleIcon,
  Logout01Icon,
} from "@hugeicons/core-free-icons";
import { useTheme } from "next-themes";
import AvatarDropdownTrigger from "./AvatarDropdownTrigger";
import AvatarDropdownHeader from "./AvatarDropdownHeader";
import AvatarThemeSwitcher from "./AvatarThemeSwitcher";

interface Props {
  name?: string;
  email?: string;
}

export default function AvatarDropdown({ email, name }: Props) {
  const { signOut } = useSessionStore();
  const { theme, setTheme } = useTheme();

  const displayName = (name ?? email ?? "Utilisateur").trim() || "Utilisateur";
  const displayEmail = email ?? "";

  const logout = () => {
    signOut();
    window.location.href = "/login";
  };

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <AvatarDropdownTrigger initials={initials} />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-72 p-0 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#16181c] shadow-xl shadow-black/10 dark:shadow-black/40"
      >
        <AvatarDropdownHeader
          initials={initials}
          displayName={displayName}
          displayEmail={displayEmail}
        />

        <DropdownMenuSeparator className="mx-0 bg-slate-100 dark:bg-slate-700/50" />
        <DropdownMenuGroup className="px-1.5 py-1">
          <DropdownMenuItem className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 hover:text-slate-900 dark:hover:text-white focus:bg-slate-100 dark:focus:bg-slate-700/60 cursor-pointer transition-colors">
            <HugeiconsIcon
              icon={UserCircle02Icon}
              className="size-4 text-slate-400 dark:text-slate-500"
            />
            Paramètres du profil
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 hover:text-slate-900 dark:hover:text-white focus:bg-slate-100 dark:focus:bg-slate-700/60 cursor-pointer transition-colors">
            <HugeiconsIcon
              icon={Settings01Icon}
              className="size-4 text-slate-400 dark:text-slate-500"
            />
            Préférences
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 hover:text-slate-900 dark:hover:text-white focus:bg-slate-100 dark:focus:bg-slate-700/60 cursor-pointer transition-colors">
            <HugeiconsIcon
              icon={HelpCircleIcon}
              className="size-4 text-slate-400 dark:text-slate-500"
            />
            Aide & Support
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="mx-0 bg-slate-100 dark:bg-slate-700/50" />

        <AvatarThemeSwitcher
          currentTheme={theme}
          onChangeTheme={(value) => setTheme(value)}
        />

        <DropdownMenuSeparator className="mx-0 bg-slate-100 dark:bg-slate-700/50" />
        <div className="px-1.5 py-1.5">
          <DropdownMenuItem
            onClick={logout}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-300 focus:bg-rose-50 dark:focus:bg-rose-500/10 cursor-pointer transition-colors"
          >
            <HugeiconsIcon icon={Logout01Icon} className="size-4" />
            Se déconnecter
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
