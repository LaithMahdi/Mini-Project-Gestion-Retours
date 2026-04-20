"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { Moon01Icon, Sun01Icon, Tick02Icon } from "@hugeicons/core-free-icons";

type ThemeOption = {
  value: "light" | "dark";
  label: string;
  icon: typeof Sun01Icon;
};

const themeOptions: ThemeOption[] = [
  { value: "light", label: "Clair", icon: Sun01Icon },
  { value: "dark", label: "Sombre", icon: Moon01Icon },
];

export default function LandingThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(
    undefined,
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get initial theme from localStorage or system preference
    const saved = localStorage.getItem("theme");
    if (saved) {
      setCurrentTheme(saved);
      if (saved === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      // Check system preference
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const theme = isDark ? "dark" : "light";
      setCurrentTheme(theme);
      if (isDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const handleChangeTheme = (value: "light" | "dark") => {
    if (value === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setCurrentTheme(value);
    localStorage.setItem("theme", value);
  };

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm">
      {themeOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => handleChangeTheme(option.value)}
          className={cn(
            "flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
            currentTheme === option.value
              ? "bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm shadow-black/5 dark:shadow-black/20"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300",
          )}
          aria-label={`Changer le thème en ${option.label}`}
        >
          <HugeiconsIcon icon={option.icon} className="size-3.5" />
          <span className="hidden sm:inline">{option.label}</span>
          {currentTheme === option.value && (
            <HugeiconsIcon icon={Tick02Icon} className="size-3 text-sky-500" />
          )}
        </button>
      ))}
    </div>
  );
}
