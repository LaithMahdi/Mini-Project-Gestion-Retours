"use client";

import { usePathname } from "next/navigation";
import MobileSidebar from "./MobileSidebar";
import AvatarDropdown from "./AvatarDropdown";
import { useSessionStore } from "@/stores/use_session_store";
import { APP_NAME } from "@/constants";

const Navbar = () => {
  const { currentUser } = useSessionStore();
  const pathname = usePathname();

  const pageTitle =
    pathname === "/admin"
      ? "Dashboard"
      : (pathname?.split("/").filter(Boolean).pop() ?? "Dashboard")
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <nav className="h-full px-4 md:px-6 flex items-center gap-3 bg-white/90 dark:bg-slate-900/95 backdrop-blur-sm shadow-lg shadow-sky-500/5">
      <MobileSidebar />

      <div className="flex items-center gap-3 min-w-0">
        <div className="lg:hidden text-sm font-semibold text-slate-900 dark:text-white truncate">
          {APP_NAME}
        </div>
        <div className="min-w-0">
          <h1 className="text-sm md:text-base font-semibold text-slate-900 dark:text-white truncate">
            {pageTitle}
          </h1>
          <p className="hidden md:block text-xs text-slate-500 dark:text-slate-400 truncate">
            Manage your workspace and settings
          </p>
        </div>
      </div>

      <div className="flex flex-1 justify-end pl-2">
        <AvatarDropdown
          email={currentUser?.email ?? ""}
          name={currentUser?.role ?? ""}
        />
      </div>
    </nav>
  );
};

export default Navbar;
