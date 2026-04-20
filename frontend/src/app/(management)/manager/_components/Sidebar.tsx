"use client";

import { APP_NAME } from "@/constants";
import Link from "next/link";
import Navigation from "./Navigation";
import { useSessionStore } from "@/stores/use_session_store";

const Sidebar = () => {
  const { currentUser } = useSessionStore();

  return (
    <aside className="h-full bg-white dark:bg-slate-900 w-full border-r border-sky-500/20 shadow-xl">
      <div className="p-4 border-b border-sky-500/20">
        <Link href="/admin" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-sky-400 to-sky-600 flex items-center justify-center transition-transform group-hover:scale-105">
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-900 dark:text-white font-semibold text-sm">
              {APP_NAME}
            </span>
            <span className="text-sky-600 dark:text-sky-400 text-xs">
              {currentUser?.role === "ADMIN"
                ? "Administrateur"
                : currentUser?.role === "MANAGER"
                  ? "Manager"
                  : "Utilisateur"}
            </span>
          </div>
        </Link>
      </div>
      <Navigation />
    </aside>
  );
};

export default Sidebar;
