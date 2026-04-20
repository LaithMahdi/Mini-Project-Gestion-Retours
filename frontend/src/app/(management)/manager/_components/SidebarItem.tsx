import { cn } from "lib/utils";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  icon: IconSvgElement;
  label: string;
  href: string;
}

export const SidebarItem = ({ icon, label, href }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    pathname === href ||
    (href !== "/" && href !== "/admin" && pathname?.startsWith(`${href}/`));

  const onclick = () => {
    router.push(href);
  };
  return (
    <button
      onClick={onclick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-600 dark:text-slate-400 text-sm font-medium pl-6 transition-all hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-300/20 h-12",
        isActive &&
          "text-sky-400 bg-sky-500/10 hover:bg-sky-500/20 hover:text-sky-400",
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <HugeiconsIcon
          icon={icon}
          size={22}
          className={cn(
            "text-slate-500 dark:text-slate-400",
            isActive && "text-sky-400",
          )}
        />
        {label}
      </div>

      <div
        className={cn(
          "ml-auto opacity-0 border-2 h-full transition-all",
          isActive && "opacity-100 border-sky-400",
        )}
      />
    </button>
  );
};
