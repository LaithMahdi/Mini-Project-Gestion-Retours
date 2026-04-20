import { cn } from "@/lib/utils";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { Moon01Icon, Sun01Icon, Tick02Icon } from "@hugeicons/core-free-icons";

type ThemeOption = {
  value: "light" | "dark";
  label: string;
  icon: IconSvgElement;
};

const themeOptions: ThemeOption[] = [
  { value: "light", label: "Clair", icon: Sun01Icon },
  { value: "dark", label: "Sombre", icon: Moon01Icon },
];

type Props = {
  currentTheme: string | undefined;
  onChangeTheme: (value: "light" | "dark") => void;
};

export default function AvatarThemeSwitcher({
  currentTheme,
  onChangeTheme,
}: Props) {
  return (
    <div className="px-4 py-3">
      <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">
        Apparence
      </p>
      <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50">
        {themeOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChangeTheme(option.value)}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
              currentTheme === option.value
                ? "bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm shadow-black/5 dark:shadow-black/20"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300",
            )}
          >
            <HugeiconsIcon icon={option.icon} className="size-3.5" />
            {option.label}
            {currentTheme === option.value && (
              <HugeiconsIcon
                icon={Tick02Icon}
                className="size-3 ml-0.5 text-sky-500"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
