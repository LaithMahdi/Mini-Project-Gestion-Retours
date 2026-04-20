"use client";

import { Button } from "@/components/ui/button";
import { MONTHS } from "@/constants";
import { cn } from "@/lib/utils";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRef } from "react";

type Props = {
  selectedMonth: number;
  onSelectMonth: (month: number) => void;
};

const ReturnsMonth = ({ selectedMonth, onSelectMonth }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollMonths = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction === "left" ? -280 : 280,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full flex items-center gap-3">
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        onClick={() => scrollMonths("left")}
        className="shrink-0"
        aria-label="Mois precedents"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
      </Button>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scroll-smooth flex-1 py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {MONTHS.map((month) => {
          const monthValue = Number(month.value);
          const isSelected = selectedMonth === monthValue;

          return (
            <button
              key={month.value}
              type="button"
              onClick={() => onSelectMonth(monthValue)}
              className={cn(
                "shrink-0 text-sm font-medium px-5 py-2 rounded-lg border transition-all duration-200 w-36",
                isSelected
                  ? "bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/25"
                  : "bg-sky-500/10 text-slate-700 dark:text-slate-200 border-sky-500/30 hover:bg-sky-500/25 hover:text-slate-900 dark:hover:text-white",
              )}
              aria-pressed={isSelected}
            >
              {month.label}
            </button>
          );
        })}
      </div>

      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        onClick={() => scrollMonths("right")}
        className="shrink-0"
        aria-label="Mois suivants"
      >
        <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
      </Button>
    </div>
  );
};

export default ReturnsMonth;
