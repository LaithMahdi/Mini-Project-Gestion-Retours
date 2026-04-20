import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InformationDiamondIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface Props {
  title: string;
  description: string;
}

export default function DescriptionTooltip({ title, description }: Props) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-full border border-sky-500/30 bg-white dark:bg-slate-800/80 text-sky-600 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-slate-700 hover:text-sky-700 dark:hover:text-sky-200"
          >
            <HugeiconsIcon icon={InformationDiamondIcon} className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="w-75 border border-sky-500/30 bg-white dark:bg-slate-900 px-3 py-3 text-slate-800 dark:text-slate-100 shadow-lg shadow-sky-500/10 rounded-md">
          <div className="space-y-1">
            <p className="text-[13px] font-medium text-sky-700 dark:text-sky-300">
              {title}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {description}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
