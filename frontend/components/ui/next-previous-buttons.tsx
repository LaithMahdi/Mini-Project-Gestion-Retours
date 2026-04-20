import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type Props = {
  onNextClick: () => void;
  onPreviousClick: () => void;
  isNextDisabled: boolean;
  isPreviousDisabled: boolean;
  className?: string;
};

export default function NextAndPreviousButtons({
  onNextClick,
  onPreviousClick,
  isNextDisabled,
  isPreviousDisabled,

  className,
}: Props) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Button
        onClick={onPreviousClick}
        disabled={isPreviousDisabled}
        className="h-9 px-3 border hover:bg-neutral-100 transition-colors"
        variant="outline"
        aria-label="Previous page"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
        <span className="ml-1 text-sm font-medium">Précédent</span>
      </Button>

      <Button
        onClick={onNextClick}
        disabled={isNextDisabled}
        className="h-9 px-3 border hover:bg-neutral-100 transition-colors"
        variant="outline"
        aria-label="Next page"
      >
        <span className="mr-1 text-sm font-medium">Suivant</span>
        <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
      </Button>
    </div>
  );
}
